APE.namespace("APE.dom");(function(){APE.mixin(APE.dom,{hasToken:E,removeClass:I,addClass:F,getElementsByClassName:J,findAncestorWithClass:G});function E(L,K){return B(K,"").test(L)}function I(L,K){var M=L.className;if(!M){return}if(M===K){L.className="";return}L.className=C(M.replace(B(K,"g")," "))}function F(L,K){if(!L.className){L.className=K}if(!B(K).test(L.className)){L.className+=" "+K}}var A={};function B(L,K){var M=L+"$"+K;return(A[M]||(A[M]=RegExp("(?:^|\\s)"+L+"(?:$|\\s)",K)))}function J(L,M,S){if(!S){return[]}M=M||"*";if(L.getElementsByClassName&&(M==="*")){return Array.prototype.slice.call(L.getElementsByClassName(S))}var N=B(S,""),P=L.getElementsByTagName(M),Q=P.length,K=0,O,R=Array(Q);for(O=0;O<Q;O++){if(N.test(P[O].className)){R[K++]=P[O]}}R.length=K;return R}function G(N,K,L){if(N==null||N===L){return null}var O=B(K,""),M;for(M=N.parentNode;M!=L;){if(O.test(M.className)){return M}M=M.parentNode}return null}var D=/^\s+|\s+$/g,H=/\s\s+/g;function C(K){return K.replace(D,"").replace(H," ")}})();