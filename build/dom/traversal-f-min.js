APE.namespace("APE.dom");(function(){var B=document.documentElement,D="tagName",F=/^H/.test(B[D])?"toUpperCase":"toLowerCase",H=/^[A-Z]/;APE.mixin(APE.dom,{contains:I(),findAncestorWithAttribute:A,findAncestorWithTagName:J,findNextSiblingElement:C,findPreviousSiblingElement:E,getChildElements:G});function I(){if("compareDocumentPosition" in B){return function(L,K){return(L.compareDocumentPosition(K)&16)!==0}}else{if("contains" in B){return function(L,K){return L!==K&&L.contains(K)}}}return function(L,K){if(L===K){return false}while(L!=K&&(K=K.parentNode)!==null){}return L===K}}function A(M,P,N){for(var O,L=M.parentNode;L!=null;){O=L.attributes;if(!O){return null}var K=O[P];if(K&&K.specified){if(K.value===N||(N===undefined)){return L}}L=L.parentNode}return null}function J(M,K){K=K[F]();for(var L=M.parentNode;L!==null;){if(L[D]===K){return L}L=L.parentNode}return null}function C(L){for(var K=L.nextSibling;K!==null;K=K.nextSibling){if(D in K&&H.test(K[D])){return K}}return null}function E(K){for(var L=K.previousSibling;L!==null;L=L.previousSibling){if(D in L&&H.test(L[D])){return L}}return null}function G(O){var N=0,M=[],L,K,Q=O.children||O.childNodes,P;for(L=Q.length;N<L;N++){P=Q[N];K=P[D];if(typeof K!=="string"||K==="!"){continue}M[M.length]=P}return M}})();