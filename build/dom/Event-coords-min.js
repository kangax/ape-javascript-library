APE.namespace("APE.dom.Event");(function(){APE.dom.Event.getCoords=A;function A(C){var B;if("pageX" in C){B=function(D){return{x:D.pageX,y:D.pageY}}}else{B=function(E){var D=dom.getScrollOffsets(),E=E||event;return{x:E.clientX+D.left,y:E.clientY+D.top}}}return(dom.Event.getCoords=B)(C)}})();