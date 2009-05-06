APE.namespace("APE.dom");(function(){var P=/^(?:margin|(border)(Width)|padding)$/,D=/^[a-zA-Z]*[bB]orderRadius$/,R=APE.dom;APE.mixin(R,{getStyle:E,setOpacity:V,getFilterOpacity:J,multiLengthPropExp:/^(?:margin|(border)(Width)|padding)$/,borderRadiusExp:/^[a-zA-Z]*[bB]orderRadius$/,tryGetShorthandValues:W,getCurrentStyleValueFromAuto:A,getCurrentStyleClipValues:F,convertNonPixelToPixel:B});var I=document.defaultView,T="getComputedStyle",G=R.IS_COMPUTED_STYLE,L="currentStyle",S="style";I=null;function J(X){var Y=X.filters;if(!Y){return""}try{return Y["DXImageTransform.Microsoft.Alpha"].opacity/100}catch(Z){try{return Y("alpha").opacity/100}catch(Z){return 1}}}function V(a,X){var Z=a[S],Y;if("opacity" in Z){Z.opacity=X}else{if("filter" in Z){Y=a[L];Z.filter="alpha(opacity="+(X*100)+")";if(Y&&("hasLayout" in Y)&&!Y.hasLayout){S.zoom=1}}}}function E(Y,X){var g="",d,b,Z,a,e,f=Y.ownerDocument,c=f.defaultView;if(G){d=c[T](Y,"");if(X=="borderRadius"&&!("borderRadius" in d)){X="MozBorderRadius" in d?"MozBorderRadius":"WebkitBorderRadius" in d?"WebkitBorderRadius":""}if(!(X in d)){return""}g=d[X];if(g===""){g=(W(d,X)).join(" ")}}else{d=Y[L];if(X=="opacity"&&!("opacity" in Y[L])){g=J(Y)}else{if(X=="cssFloat"){X="styleFloat"}g=d[X];if(X=="clip"&&!g&&("clipTop" in d)){g=F(Y,d)}else{if(g=="auto"){g=A(Y,X)}else{if(!(X in d)){return""}}}}b=H.exec(g);if(b){Z=g.split(" ");Z[0]=B(Y,b);for(a=1,e=Z.length;a<e;a++){b=H.exec(Z[a]);Z[a]=B(Y,b)}g=Z.join(" ")}}return g}function F(a,Z){var X=[],Y=0,b;for(;Y<4;Y++){b=C[Y];clipValue=Z["clip"+b];if(clipValue=="auto"){clipValue=(b=="Left"||b=="Top"?"0px":b=="Right"?a.offsetWidth+M:a.offsetHeight+M)}X.push(clipValue)}return{top:X[0],right:X[1],bottom:X[2],left:X[3],toString:function(){return"rect("+X.join(" ")+")"}}}var K=document.documentElement[S],N="cssFloat" in K?"cssFloat":"styleFloat",C=["Top","Right","Bottom","Left"],U=("WebkitBorderTopLeftRadius" in K),O=U?["TopRight","BottomRight","BottomLeft","TopLeft"]:["Topright","Bottomright","Bottomleft","Topleft"];K=null;function A(b,d){var a=b[S],Z,Y,c=b.ownerDocument;if("pixelWidth" in a&&Q.test(d)){var X="pixel"+(d.charAt(0).toUpperCase())+d.substring(1);Z=a[X];if(Z===0){if(d=="width"){Y=parseFloat(E(b,"borderRightWidth"))||0;paddingWidth=parseFloat(E(b,"paddingLeft"))||0+parseFloat(E(b,"paddingRight"))||0;return b.offsetWidth-b.clientLeft-Y-paddingWidth+M}else{if(d=="height"){Y=parseFloat(E(b,"borderBottomWidth"))||0;paddingWidth=parseFloat(E(b,"paddingTop"))||0+parseFloat(E(b,"paddingBottom"))||0;return b.offsetHeight-b.clientTop-Y+M}}}return a[X]+M}if(d=="margin"&&b[L].position!="absolute"&&c.compatMode!="BackCompat"){Z=parseFloat(E(b.parentNode,"width"))-b.offsetWidth;if(Z==0){return"0px"}Z="0px "+Z;return Z+" "+Z}}function W(d,Y){var Z=P.exec(Y),b,j,c,g,h,f=true,X,a=1,e;if(Z&&Z[0]){X=C;b=Z[1]||Z[0];j=Z[2]||""}else{if(D.test(Y)){X=O;b=D.exec(Y)[0];j="";e=true}else{return[""]}}c=(e&&U)?d["WebkitBorder"+X[0]+"Radius"]:d[b+X[0]+j];h=[c];while(a<4){g=(e&&U)?d["WebkitBorder"+X[a]+"Radius"]:d[b+X[a]+j];f=f&&g==c;c=g;h[a++]=g}if(f){return[c]}return h}var H=/(-?\d+|(?:-?\d*\.\d+))(?:em|ex|pt|pc|in|cm|mm\s*)/,Q=/width|height|top|left/,M="px";function B(b,c){if(b.runtimeStyle){var d=c[0];if(parseFloat(d)==0){return"0px"}var a=b[S],Z=a.left,Y=b.runtimeStyle,X=Y.left;Y.left=b[L].left;a.left=(d||0);d=a.pixelLeft+M;a.left=Z;Y.left=X;return d}}})();