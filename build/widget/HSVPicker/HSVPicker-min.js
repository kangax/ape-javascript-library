APE.namespace("APE.widget");APE.widget.HsvPicker=function(E){var A=APE.drag.Draggable;this.id=E;var D=document.getElementById(this.id+"-hue-slider");var B=document.getElementById(this.id+"-saturation-value-selector");this.hueSlider=A.getByNode(D,APE.drag.Draggable.constraints.VERT);this.hueSlider.keepInContainer=true;this.bgSelector=A.getByNode(B);var C=B.parentNode.parentNode;C.onselectstart=function(){return false};this.bg=C;this.bgSelector.container=C;this.bgSelector.keepInContainer=true;this.textInput=document.getElementById(this.id+"-color-input");this.displayStyle=document.getElementById(this.id+"-color-preview").style;this.bgClipTop=12/2;this.bgClipLeft=12/2;this.enabled=true;this.prevValue=this.textInput.value};APE.widget.HsvPicker.getById=APE.getById;(function(){var B=APE.widget.HsvPicker;APE.mixin(B,{hueSlid:C,grabHueSlider:D,bgSelectorDrag:F,textInputBlur:J,checkEnabled:G,textInputKeyDown:I,backgroundMousedown:H,saveValue:A,transparentClicked:E});function C(L){var K=B.getById(this.id.split("-")[0]);if(!K.enabled){return}K.onbeforechange();K.h=360*K.hueSlider.el.offsetTop/128;K.bg.style.background=K.rgbForHue(K.h);K.updateDisplay();K.onchange(L)}function D(L){var K=B.getById(this.id.split("-")[0]);if(!K.enabled){return}K.hueSlider.grab(L);K.updateDisplay();K.onchange(L);K.onchangecomplete(L)}function J(L){var K=B.getById(this.id.split("-")[0]);if(!K.enabled){return}return K.trySetValue(this.value,L||event)}function G(){return B.getById(this.id.split("-")[0]).enabled}function I(M){M=M||window.event;var L=M.keyCode==9;var K=M.keyCode==13;if(L||K){B.getById(this.id.split("-")[0]).trySetValue(this.value,M||event)}if(K){this.focus()}}function H(L){var K=B.getById(this.id.split("-")[0]);if(!K.enabled){return}K.onbeforechange();K.bgSelector.grab(L);K.bg.style.background=K.rgbForHue(K.h);K.updateDisplay();K.onchange(L);K.onchangecomplete(L)}function F(L){var K=B.getById(this.id.split("-")[0]);if(!K.enabled){return}K.v=(127-(this.el.offsetTop+K.bgClipTop))/127;K.s=(this.el.offsetLeft+K.bgClipLeft)/127;K.updateDisplay();K.onchange(L)}function A(){if(this.textInput.value){this.prevValue=this.textInput.value}}function E(L){var K=B.getById(this.id.split("-")[0]);K.onbeforechange();if(this.checked){K.prevValue=K.textInput.value;K.setEnabled(false);K.setValue("transparent")}else{K.setValue(K.prevValue||new APE.color.ColorRGB(255,255,255).toString());K.prevValue="";K.setEnabled(true);K.hueSlider.ondrag(L);K.bgSelector.ondrag(L)}K.onchange(L);K.onchangecomplete(L)}})();APE.widget.HsvPicker.prototype={rgbForHue:APE.color.ColorHSV.rgbForHue,rgbFromString:APE.color.ColorRGB.fromString,init:function(){if(this.textInput.value){this.setValue(this.textInput.value)}else{this.setValue("#ff0000")}var A=APE.widget.HsvPicker;this.bgSelector.onbeforedragstart=A.bgSelectorDrag;this.bgSelector.ondrag=A.bgSelectorDrag;this.bgSelector.onglide=A.bgSelectorDrag;this.hueSlider.onbeforedragstart=A.hueSlid;this.hueSlider.ondrag=A.hueSlid;this.hueSlider.onglide=A.hueSlid;this.hueSlider.container.onmousedown=A.grabHueSlider;this.bgSelector.onglide=A.bgSelectorDrag;this.bgSelector.onfocus=A.checkEnabled;this.hueSlider.onfocus=A.checkEnabled;var C=APE.EventPublisher;C.add(this.textInput,"onblur",A.textInputBlur);C.add(this,"onbeforechange",A.saveValue);C.add(this.bgSelector.el.parentNode,"onmousedown",A.backgroundMousedown);C.add(this.bgSelector,"ondragend",function(D){this.onchangecomplete(D)},this);C.add(this.hueSlider,"ondragend",function(D){this.onchangecomplete(D)},this);var B=document.getElementById(this.id+"-transparent-checkbox");C.add(B,"onclick",A.transparentClicked);if(B.checked){A.transparentClicked.call(document.getElementById(this.id+"-transparent-checkbox"))}},getHexValue:function(){if(this.textInput.value==""){return""}return new APE.color.ColorHSV(this.h,this.s,this.v).toRGB().toHexString()},onbeforechange:function(){},onchange:function(A){},onchangecomplete:function(A){},setEnabled:function(A){this.enabled=A},setValue:function(D){if(D=="transparent"){this.displayStyle.background="transparent";this.hueSlider.el.parentNode.style.background="transparent";this.bgSelector.el.parentNode.style.visibility="hidden";this.bgSelector.el.parentNode.previousSibling.style.visibility="inherit";this.setEnabled(false);this.bg.style.backgroundColor="transparent";this.textInput.value="";document.getElementById(this.id+"-transparent-checkbox").checked=true;return}else{this.displayStyle.background="transparent";this.bgSelector.el.parentNode.style.visibility="inherit";this.bgSelector.el.parentNode.previousSibling.style.visibility="hidden";this.setEnabled(true);document.getElementById(this.id+"-transparent-checkbox").checked=false}var B=this.rgbFromString(D);var C=B.isValid();if(!C){B=this.rgbForHue(this.h=0,this.s=1,this.v=1)}var A=B.toHSV();this.h=A.h;this.s=A.s;this.v=A.v;this.hueSlider.el.style.top=(A.h/360*128)+"px";this.bgSelector.moveToX((A.s*127)-this.bgClipLeft);this.bgSelector.moveToY(127-(A.v*127)-this.bgClipTop);this.bg.style.backgroundColor=this.rgbForHue(A.h,1,1).toHexString();this.updateDisplay(B,C)},updateDisplay:function(B,C){var A=B||new APE.color.ColorHSV(this.h,this.s,this.v).toRGB();if(A.isValid()&&!(C==false)){this.displayStyle.backgroundColor=this.textInput.value=A.toHexString()}else{this.textInput.value=""}},trySetValue:function(A,B){if(this.rgbFromString(A).isValid()){this.setValue(A);this.onchange(B);this.onchangecomplete(B);return true}else{alert("Please enter a valid color value.");return false}}};