APE.namespace("APE.dom");(function(){var D=document.documentElement,F="nodeType",E="tagName",H="parentNode",B="compareDocumentPosition",I=/^H/.test(D[E])?"toUpperCase":"toLowerCase",L=/^[A-Z]/;APE.mixin(APE.dom,{contains:N(),findAncestorWithAttribute:A,findAncestorWithTagName:O,findNextSiblingElement:C,findPreviousSiblingElement:G,getChildElements:K,isTagName:M,selectOptionByValue:J});function N(){if(B in D){return function(Q,P){return(Q[B](P)&16)!==0}}else{if("contains" in D){return function(Q,P){return Q!==P&&Q.contains(P)}}}return function(Q,P){if(Q===P){return false}while(Q!=P&&(P=P[H])!==null){}return Q===P}}function A(R,U,S){for(var T,Q=R[H];Q!==null;){T=Q.attributes;if(!T){return null}var P=T[U];if(P&&P.specified){if(P.value===S||(S===undefined)){return Q}}Q=Q[H]}return null}function O(R,P){P=P[I]();for(var Q=R[H];Q!==null;){if(Q[E]===P){return Q}Q=Q[H]}return null}function C(Q){for(var P=Q.nextSibling;P!==null;P=P.nextSibling){if(P[F]===1){return P}}return null}function G(P){for(var Q=P.previousSibling;Q!==null;Q=Q.previousSibling){if(Q[F]===1){return Q}}return null}function K(T){var S=0,R=[],Q,P,V=T.children||T.childNodes,U;for(Q=V.length;S<Q;S++){U=V[S];if(U[F]!==1){continue}R[R.length]=U}return R}function M(Q,P){return Q.tagName==P[I]()}function J(R,S){for(var Q=0,T=R.options,P=T.length;Q<P;Q++){if(T[Q].value===S){R.selectedIndex=Q;return}}}})();