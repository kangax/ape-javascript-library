/** @fileoverview
 * Getting computed styles, opacity functions.
 *
 * @author Garrett Smith
 */

/**@name APE.dom 
 * @namespace*/
APE.namespace("APE.dom");
(function(){

    var multiLengthPropExp = /^(?:margin|(border)(Width)|padding)$/,
        borderRadiusExp = /^[a-zA-Z]*[bB]orderRadius$/,
        dom = APE.dom;
    
    APE.mixin(dom, /** @scope APE.dom */{
        /** @function */ getStyle : getStyle,
        setOpacity : setOpacity,
        getFilterOpacity : getFilterOpacity,
        
        // Capture (border)(Width) because we need to put "Top" in the middle.
        multiLengthPropExp : /^(?:margin|(border)(Width)|padding)$/,
        borderRadiusExp : /^[a-zA-Z]*[bB]orderRadius$/,
        tryGetShorthandValues : tryGetShorthandValues,
        getCurrentStyleValueFromAuto : getCurrentStyleValueFromAuto,
        getCurrentStyleClipValues : getCurrentStyleClipValues,
        convertNonPixelToPixel : convertNonPixelToPixel
    });

    var view = document.defaultView,
        getCS = "getComputedStyle",
        IS_COMPUTED_STYLE = dom.IS_COMPUTED_STYLE,
        currentStyle = "currentStyle",
        style = "style";
    view = null;
    
    /** 
     * Special method for a browser that supports el.filters and not style.opacity.
     * @memberOf APE.dom
     * @param {HTMLElement} el the element to find opacity on.
     * @return {ufloat} [0-1] amount of opacity.
     * calling this method on a browser that does not support filters
     * results in 1 being returned.  Use dom.getStyle or dom.getCascadedStyle instead
     */
     function getFilterOpacity(el) {
        var filters = el.filters;
        if(!filters) return"";
        try { // Will throw error if no DXImageTransform.
            return filters['DXImageTransform.Microsoft.Alpha'].opacity/100;

        } catch(e) {
            try { 
                return filters('alpha').opacity/100;
            } catch(e) {
                return 1;
            }
        }
    }

    /** 
     * Cross-browser adapter method for style.filters vs style.opacity.
     * @memberOf APE.dom
     * @param {HTMLElement} el the element to set opacity on.
     * @param {ufloat} i [0-1] the amount of opacity.
     * @return {ufloat} [0-1] amount of opacity.
     */
     function setOpacity(el, i) {
        var s = el[style], cs;
        if("opacity"in s) {
            s.opacity = i;
        }
        else if("filter"in s) {
            cs = el[currentStyle];
            s.filter = 'alpha(opacity=' + (i * 100) + ')';
            if(cs && ("hasLayout"in cs) && !cs.hasLayout) {
                style.zoom = 1;
            }
        }
    }

    /** 
     * @memberOf APE.dom
     * @name getStyle
     * 
     * @function
     * @description returns the computed style of property <code>p</code> of <code>el</code>.
     * Returns different results in IE, so user beware! If your 
     * styleSheet has units like "em" or "in", this method does 
     * not attempt to convert those to px.
     *
     * Use "cssFloat" for getting an element's float and special 
     * "filters" treatment for "opacity".
     * 
     * @param {HTMLElement} el the element to set opacity on.
     * @param {String} p the property to retrieve.
     * @return {String} the computed style value or the empty string if no value was found.
     */
    function getStyle(el, p) {
        var value = "", cs, matches, splitVal, i, len, doc = el.ownerDocument, 
            defaultView = doc.defaultView;
        if(IS_COMPUTED_STYLE) {
            cs = defaultView[getCS](el, "");
            if(p == "borderRadius" && !("borderRadius"in cs)) {
                p = "MozBorderRadius"in cs ? "MozBorderRadius" : 
                    "WebkitBorderRadius"in cs ? "WebkitBorderRadius" : "";
            }

            if(!(p in cs)) return "";
            value = cs[p];
            if(value === "") {
                // would try to get a rect, but Webkit doesn't support that.
                value = (tryGetShorthandValues(cs, p)).join(" ");
            }
        }
        else {
            cs = el[currentStyle];
            if(p == "opacity" && !("opacity"in el[currentStyle]))
                value = getFilterOpacity(el);
            else {
                if(p == "cssFloat")
                    p = "styleFloat";
                value = cs[p];

                if(p == "clip" && !value && ("clipTop"in cs)) {
                    value = getCurrentStyleClipValues(el, cs);
                }
                else if(value == "auto") 
                    value = getCurrentStyleValueFromAuto(el, p);
                else if(!(p in cs)) return "";
            }
            matches = nonPixelExp.exec(value);
            if(matches) {
                splitVal = value.split(" ");
                splitVal[0] = convertNonPixelToPixel( el, matches);
                for(i = 1, len = splitVal.length; i < len; i++) {
                    matches = nonPixelExp.exec(splitVal[i]);
                    splitVal[i] = convertNonPixelToPixel( el, matches);
                }
                value = splitVal.join(" ");
            }
        }
        return value;
    }

    function getCurrentStyleClipValues(el, cs) {
        var values = [], i = 0, prop;
        for( ;i < 4; i++){
            prop = props[i];
            clipValue = cs['clip'+prop];
            if(clipValue == "auto") {
                clipValue = (prop == "Left" || prop == "Top" ? "0px" : prop == "Right" ? 
                    el.offsetWidth + px : el.offsetHeight + px);
            }
            values.push(clipValue);
        }
        return {
            top:values[0], right:values[1], bottom:values[2], left:values[3],
            toString : function() {return 'rect(' + values.join(' ')+')';}
        };
    }

    var sty = document.documentElement[style],
        floatProp = 'cssFloat'in sty ? 'cssFloat': 'styleFloat',
        props = ["Top", "Right", "Bottom", "Left"],
        isShorthandNonstandard = ('WebkitBorderTopLeftRadius' in sty),
        cornerProps = isShorthandNonstandard
          ? ["TopRight", "BottomRight", "BottomLeft", "TopLeft"]
          : ["Topright", "Bottomright", "Bottomleft", "Topleft"];
        sty = null;

    function getCurrentStyleValueFromAuto(el, p) {
        
        var s = el[style], v, borderWidth, doc = el.ownerDocument;
        if("pixelWidth"in s && pixelDimensionExp.test(p)) {
            var pp = "pixel" + (p.charAt(0).toUpperCase()) + p.substring(1);
            v = s[pp];
            if(v === 0) {
                if(p == "width") {
                    borderWidth = parseFloat(getStyle(el, "borderRightWidth"))||0;
                    paddingWidth = parseFloat(getStyle(el, "paddingLeft"))||0
                        + parseFloat(getStyle(el, "paddingRight"))||0;

                    return el.offsetWidth - el.clientLeft - borderWidth - paddingWidth + px;
                } 
                else if(p == "height") {
                    borderWidth = parseFloat(getStyle(el, "borderBottomWidth"))||0;
                    paddingWidth = parseFloat(getStyle(el, "paddingTop"))||0
                        + parseFloat(getStyle(el, "paddingBottom"))||0;
                    return el.offsetHeight - el.clientTop - borderWidth + px;
                }
            }
            return s[pp] + px;
        }
        if(p == "margin" && el[currentStyle].position != "absolute" && 
          doc.compatMode != "BackCompat") {
            v = parseFloat(getStyle(el.parentNode, 'width')) - el.offsetWidth;
            if(v == 0) return "0px";
            v = "0px " + v;
            return v + " " + v;
        }
        
        // Can't get borderWidth because we only have clientTop and clientLeft.
    }

    // TODO: Consider removing this; "don't do that."
    /** 
     * Tries to get a shorthand value for margin|padding|borderWidth. 
     * @return  {[string]} Either 4 values or, if all four values are equal,
     * then one collapsed value (in an array).
     */
    function tryGetShorthandValues(cs, p) {
        var multiMatch = multiLengthPropExp.exec(p),
            prefix, suffix, 
            prevValue, nextValue, 
            values,
            allEqual = true, 
            propertyList,
            i = 1,
            isBorderRadius;
        
        if(multiMatch && multiMatch[0]) {
            propertyList = props;
            prefix = multiMatch[1]||multiMatch[0];
            suffix = multiMatch[2] || ""; // ["borderWidth", "border", "Width"]
        }
        else if(borderRadiusExp.test(p)) {
           propertyList = cornerProps;
           prefix = borderRadiusExp.exec(p)[0];
           suffix = ""; 
           isBorderRadius = true;
        }
        else return [""];
        
        prevValue = (isBorderRadius && isShorthandNonstandard) 
          ? cs['WebkitBorder' + propertyList[0] + 'Radius']
          : cs[prefix + propertyList[0] + suffix ];
        values = [prevValue];

        while(i < 4) {
            nextValue = (isBorderRadius && isShorthandNonstandard) 
              ? cs['WebkitBorder' + propertyList[i] + 'Radius']
              : cs[prefix + propertyList[i] + suffix ];
            allEqual = allEqual && nextValue == prevValue;
            prevValue = nextValue;
            values[i++] = nextValue;
        }
        if(allEqual)
            return [prevValue];
        return values;
    }

    var nonPixelExp = /(-?\d+|(?:-?\d*\.\d+))(?:em|ex|pt|pc|in|cm|mm\s*)/,
        pixelDimensionExp = /width|height|top|left/,
        px = "px"; 

    /**
     * @requires nonPixelExp
     * @param {HTMLElement} el
     * @param {Array} String[] of matches from nonPixelExp.exec( val ).
     */
    function convertNonPixelToPixel(el, matches) {

        if(el.runtimeStyle) {

            // http://erik.eae.net/archives/2007/07/27/18.54.15/#comment-102291
            // If we're not dealing with a regular pixel number
            // but a number that has a weird ending, we need to convert it to pixels.

            var val = matches[0]; // grab the -1.2em or whatever.
            if(parseFloat(val) == 0) {
                return "0px";
            }

            var s = el[style],
                sLeft = s.left,
                rs = el.runtimeStyle,
                rsLeft = rs.left;

            rs.left = el[currentStyle].left;
            s.left = (val || 0);

            // The element does not need to have position: to get values.
            // IE's math is a little off with converting em to px; IE rounds to 
            // the nearest pixel.
            val = s.pixelLeft + px;
            // put it back.
            s.left = sLeft;
            rs.left = rsLeft;
            return val;
        }
    }
})();