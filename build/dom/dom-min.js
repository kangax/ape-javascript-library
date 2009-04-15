APE.namespace("APE.dom");(function(){var C=APE.dom,D=document.documentElement,B="textContent",A=document.defaultView;C.IS_COMPUTED_STYLE=(typeof A!="undefined"&&"getComputedStyle" in A);C.textContent=B in D?B:"innerText"})();(function(){APE.mixin(APE.dom,{getScrollOffsets:A,getViewportDimensions:C});var B="documentElement",E=document[B],D=E&&E.clientWidth===0;E=null;function A(H){H=H||window;var G,I=H.document,F=I[B];if("pageXOffset" in H){G=function(){return{left:H.pageXOffset,top:H.pageYOffset}}}else{if(D){F=I.body}G=function(){return{left:F.scrollLeft,top:F.scrollTop}}}I=null;this.getScrollOffsets=G;return G()}function C(J){J=J||window;var G=J.document,K=G,I="client",L,H;if(typeof K.clientWidth=="number"){}else{if(D||F(J)){G=K.body}else{if(K[B].clientHeight>0){G=K[B]}else{if(typeof innerHeight=="number"){G=J;I="inner"}}}}L=I+"Width";H=I+"Height";return(this.getViewportDimensions=function(){return{width:G[L],height:G[H]}})();function F(N){var O=N.document,P=O.createElement("div");P.style.height="2500px";O.body.insertBefore(P,O.body.firstChild);var M=O[B].clientHeight>2400;O.body.removeChild(P);return M}}})();(function(){APE.mixin(APE.dom,{getOffsetCoords:Z,isAboveElement:D,isBelowElement:U,isInsideElement:J});var f=this.document,Y,e=f.documentElement,b=Math.round,W=Math.max,O=e&&e.clientWidth===0,P="clientTop" in e,N=/^h/.test(e.tagName)?"table":"TABLE",K="currentStyle" in e,R,C,c,T,Q,M,E,H,A,L,d,F=f.defaultView&&typeof f.defaultView.getComputedStyle!="undefined",G="getBoundingClientRect",a="relative",X="borderTopWidth",B="borderLeftWidth",I=/^(?:r|a)/,S=/^(?:a|f)/;function Z(h,z,AF){var AL=h.ownerDocument,AJ=AL.documentElement,u=AL.body;if(!z){z=AL}if(!AF){AF={x:0,y:0}}if(h===z){AF.x=AF.y=0;return AF}if(G in h){var AH=O?u:AJ,s=h[G](),r=s.left+W(AJ.scrollLeft,u.scrollLeft),p=s.top+W(AJ.scrollTop,u.scrollTop),AE,AB=AH.clientTop,i=AH.clientLeft;if(P){r-=i;p-=AB}if(z!==AL){s=Z(z,null);r-=s.x;p-=s.y;if(O&&z===u&&P){r-=i;p-=AB}}if(O&&K&&z!=AL&&z!==u){AE=u.currentStyle;r+=parseFloat(AE.marginLeft)||0+parseFloat(AE.left)||0;p+=parseFloat(AE.marginTop)||0+parseFloat(AE.top)||0}AF.x=r;AF.y=p;return AF}else{if(F){if(!Y){V()}var n=h.offsetLeft,AG=h.offsetTop,AC=AL.defaultView,m=AC.getComputedStyle(h,"");if(m.position=="fixed"){AF.x=n+AJ.scrollLeft;AF.y=AG+AJ.scrollTop;return AF}var t=AC.getComputedStyle(u,""),v=!I.test(t.position),l=h,o=h.parentNode,g=h.offsetParent;for(;o&&o!==z;o=o.parentNode){if(o!==u&&o!==AJ){n-=o.scrollLeft;AG-=o.scrollTop}if(o===g){if(o===u&&v){}else{if(!R&&!(o.tagName===N&&Q)){var k=AC.getComputedStyle(o,"");n+=parseFloat(k[B])||0;AG+=parseFloat(k[X])||0}if(o!==u){n+=g.offsetLeft;AG+=g.offsetTop;l=g;g=o.offsetParent}}}}var q=0,AD=0,AK,w,AI=z===AL||z===AJ,AA,j;if(l!=AL){j=AC.getComputedStyle(l,"").position;AK=S.test(j);w=AK||I.test(j)}if((l===h&&h.offsetParent===u&&!C&&z!==u&&!(v&&T))||(C&&l===h&&!w)||!v&&w&&E&&AI){AD+=parseFloat(t.marginTop)||0;q+=parseFloat(t.marginLeft)||0}if(z===u){AA=AC.getComputedStyle(AJ,"");if((!v&&((A&&!AK)||(L&&AK)))||v&&H){AD-=parseFloat(AA.paddingTop)||0;q-=parseFloat(AA.paddingLeft)||0}if(d){if(!w||w&&!v){AD-=parseFloat(AA.marginTop)||0}q-=parseFloat(AA.marginLeft)||0}}if(v){if(M||(!AK&&!R&&AI)){AD+=parseFloat(t[X]);q+=parseFloat(t[B])}}else{if(T){if(AI){if(!c){AD+=parseFloat(t.top)||0;q+=parseFloat(t.left)||0;if(AK&&R){AD+=parseFloat(t[X]);q+=parseFloat(t[B])}}if(z===AL&&!v&&!A){if(!AA){AA=AC.getComputedStyle(AJ,"")}AD+=parseFloat(AA.paddingTop)||0;q+=parseFloat(AA.paddingLeft)||0}}else{if(c){AD-=parseFloat(t.top);q-=parseFloat(t.left)}}if(C&&(!w||z===u)){AD-=parseFloat(t.marginTop)||0;q-=parseFloat(t.marginLeft)||0}}}AF.x=b(n+q);AF.y=b(AG+AD);return AF}}}function V(){Y=true;var p=f.body;if(!p){return}var g="marginTop",o="position",u="padding",m="static",l="border",y=p.style,j=y.cssText,t="1px solid transparent",q="0",n="1px",h="offsetTop",i=e.style,w=i.cssText,r=f.createElement("div"),k=r.style,v=f.createElement(N);y[u]=y[g]=y.top=q;i.position=m;y[l]=t;k.margin=q;k[o]=m;r=p.insertBefore(r,p.firstChild);R=(r[h]===1);y[l]=q;v.innerHTML="<tbody><tr><td>x</td></tr></tbody>";v.style[l]="7px solid";v.cellSpacing=v.cellPadding=q;p.insertBefore(v,p.firstChild);Q=v.getElementsByTagName("td")[0].offsetLeft===7;p.removeChild(v);y[g]=n;y[o]=a;C=(r[h]===1);T=p[h]===0;y[g]=q;y.top=n;c=r[h]===1;y.top=q;y[g]=n;y[o]=k[o]=a;E=r[h]===0;k[o]="absolute";y[o]=m;if(r.offsetParent===p){y[l]=t;k.top="2px";M=r[h]===1;y[l]=q;k[o]=a;i[u]=n;y[g]=q;H=r[h]===3;y[o]=a;A=r[h]===3;k[o]="absolute";L=r[h]===3;i[u]=q;i[g]=n;d=r[h]===3}p.removeChild(r);y.cssText=j||"";i.cssText=w||""}function J(h,g){var j=Z(h).y,i=Z(g).y;return j+h.offsetHeight<=i+g.offsetHeight&&j>=i}function D(h,g){return(Z(h).y<=Z(g).y)}function U(h,g){return(Z(h).y+h.offsetHeight>=Z(g).y+g.offsetHeight)}J=D=U=null})();(function(){APE.mixin(APE.dom,{hasToken:F,removeClass:K,addClass:G,hasClass:E,getElementsByClassName:L,findAncestorWithClass:I});var H="className";function F(N,M){return B(M,"").test(N)}function K(N,M){var O=N[H];if(!O){return}if(O===M){N[H]="";return}N[H]=C(O.replace(B(M,"g")," "))}function G(N,M){if(!N[H]){N[H]=M}if(!B(M).test(N[H])){N[H]+=" "+M}}function E(N,M){if(!N[H]){return false}return F(N[H],M)}var A={};function B(N,M){var O=N+"$"+M;return(A[O]||(A[O]=RegExp("(?:^|\\s)"+N+"(?:$|\\s)",M)))}function L(N,O,U){if(!U){return[]}O=O||"*";if(N.getElementsByClassName&&(O==="*")){return N.getElementsByClassName(U)}var P=B(U,""),R=N.getElementsByTagName(O),S=R.length,M=0,Q,T=Array(S);for(Q=0;Q<S;Q++){if(P.test(R[Q][H])){T[M++]=R[Q]}}T.length=M;return T}function I(P,M,N){if(P==null||P===N){return null}var Q=B(M,""),O;for(O=P.parentNode;O!=N;){if(Q.test(O[H])){return O}O=O.parentNode}return null}var D=/^\s+|\s+$/g,J=/\s\s+/g;function C(M){return M.replace(D,"").replace(J," ")}})();(function(){var D=document.documentElement,F="nodeType",E="tagName",H="parentNode",B="compareDocumentPosition",I=/^H/.test(D[E])?"toUpperCase":"toLowerCase",K=/^[A-Z]/;APE.mixin(APE.dom,{contains:M(),findAncestorWithAttribute:A,findAncestorWithTagName:N,findNextSiblingElement:C,findPreviousSiblingElement:G,getChildElements:J,isTagName:L});function M(){if(B in D){return function(P,O){return(P[B](O)&16)!==0}}else{if("contains" in D){return function(P,O){return P!==O&&P.contains(O)}}}return function(P,O){if(P===O){return false}while(P!=O&&(O=O[H])!==null){}return P===O}}function A(Q,T,R){for(var S,P=Q[H];P!==null;){S=P.attributes;if(!S){return null}var O=S[T];if(O&&O.specified){if(O.value===R||(R===undefined)){return P}}P=P[H]}return null}function N(Q,O){O=O[I]();for(var P=Q[H];P!==null;){if(P[E]===O){return P}P=P[H]}return null}function C(P){for(var O=P.nextSibling;O!==null;O=O.nextSibling){if(O[F]===1){return O}}return null}function G(O){for(var P=O.previousSibling;P!==null;P=P.previousSibling){if(P[F]===1){return P}}return null}function J(S){var R=0,Q=[],P,O,U=S.children||S.childNodes,T;for(P=U.length;R<P;R++){T=U[R];if(T[F]!==1){continue}Q[Q.length]=T}return Q}function L(P,O){return P.tagName==O[I]()}})();(function(){var A="addEventListener" in this,G=A?"target":"srcElement";APE.mixin(APE.dom.Event={},{eventTarget:G,getTarget:E,addCallback:F,removeCallback:H,preventDefault:C,stopPropagation:B});function B(J){J=J||window.event;var I;if(typeof J.stopPropagation=="function"){I=function(K){K.stopPropagation()}}else{if("cancelBubble" in J){I=function(K){K=K||window.event;K.cancelBubble=true}}}(APE.dom.Event.stopPropagation=I)(J)}function E(I){return(I||event)[G]}function D(J,I){return A?I:function(K){I.call(J,K)}}function F(L,K,I){if(A){L.addEventListener(K,I,false)}else{var J=D(L,I);L.attachEvent("on"+K,J)}return J||I}function H(K,J,I){if(A){K.removeEventListener(J,I,false)}else{K.detachEvent("on"+J,I)}return I}function C(I){I=I||event;if(typeof I.preventDefault=="function"){I.preventDefault()}else{if("returnValue" in I){I.returnValue=false}}}})();APE.namespace("APE.dom.Event");(function(){var C=APE.dom,A=C.Event;A.getCoords=B;function B(E){var D;if("pageX" in E){D=function(F){return{x:F.pageX,y:F.pageY}}}else{D=function(G){var F=C.getScrollOffsets();G=G||window.event;return{x:G.clientX+F.left,y:G.clientY+F.top}}}return(A.getCoords=D)(E)}})();(function(){var P=/^(?:margin|(border)(Width)|padding)$/,D=/^[a-zA-Z]*[bB]orderRadius$/,R=APE.dom;APE.mixin(R,{getStyle:E,setOpacity:U,getFilterOpacity:J,multiLengthPropExp:/^(?:margin|(border)(Width)|padding)$/,borderRadiusExp:/^[a-zA-Z]*[bB]orderRadius$/,tryGetShorthandValues:V,getCurrentStyleValueFromAuto:A,getCurrentStyleClipValues:F,convertNonPixelToPixel:B});var I=document.defaultView,T="getComputedStyle",G=R.IS_COMPUTED_STYLE,L="currentStyle",S="style";I=null;function J(W){var X=W.filters;if(!X){return""}try{return X["DXImageTransform.Microsoft.Alpha"].opacity/100}catch(Y){try{return X("alpha").opacity/100}catch(Y){return 1}}}function U(Z,W){var Y=Z[S],X;if("opacity" in Y){Y.opacity=W}else{if("filter" in Y){X=Z[L];Y.filter="alpha(opacity="+(W*100)+")";if(X&&("hasLayout" in X)&&!X.hasLayout){S.zoom=1}}}}function E(X,W){var f="",c,a,Y,Z,d,e=X.ownerDocument,b=e.defaultView;if(G){c=b[T](X,"");if(W=="borderRadius"&&!("borderRadius" in c)){W="MozBorderRadius" in c?"MozBorderRadius":"WebkitBorderRadius" in c?"WebkitBorderRadius":""}if(!(W in c)){return""}f=c[W];if(f===""){f=(V(c,W)).join(" ")}}else{c=X[L];if(W=="opacity"&&!("opacity" in X[L])){f=J(X)}else{if(W=="cssFloat"){W="styleFloat"}f=c[W];if(W=="clip"&&!f&&("clipTop" in c)){f=F(X,c)}else{if(f=="auto"){f=A(X,W)}else{if(!(W in c)){return""}}}}a=H.exec(f);if(a){Y=f.split(" ");Y[0]=B(X,a);for(Z=1,d=Y.length;Z<d;Z++){a=H.exec(Y[Z]);Y[Z]=B(X,a)}f=Y.join(" ")}}return f}function F(Z,Y){var W=[],X=0,a;for(;X<4;X++){a=C[X];clipValue=Y["clip"+a];if(clipValue=="auto"){clipValue=(a=="Left"||a=="Top"?"0px":a=="Right"?Z.offsetWidth+M:Z.offsetHeight+M)}W.push(clipValue)}return{top:W[0],right:W[1],bottom:W[2],left:W[3],toString:function(){return"rect("+W.join(" ")+")"}}}var K=document.documentElement[S],N="cssFloat" in K?"cssFloat":"styleFloat",C=["Top","Right","Bottom","Left"],O=["Topright","Bottomright","Bottomleft","Topleft"];K=null;function A(a,c){var Z=a[S],Y,X,b=a.ownerDocument;if("pixelWidth" in Z&&Q.test(c)){var W="pixel"+(c.charAt(0).toUpperCase())+c.substring(1);Y=Z[W];if(Y===0){if(c=="width"){X=parseFloat(E(a,"borderRightWidth"))||0;paddingWidth=parseFloat(E(a,"paddingLeft"))||0+parseFloat(E(a,"paddingRight"))||0;return a.offsetWidth-a.clientLeft-X-paddingWidth+M}else{if(c=="height"){X=parseFloat(E(a,"borderBottomWidth"))||0;paddingWidth=parseFloat(E(a,"paddingTop"))||0+parseFloat(E(a,"paddingBottom"))||0;return a.offsetHeight-a.clientTop-X+M}}}return Z[W]+M}if(c=="margin"&&a[L].position!="absolute"&&b.compatMode!="BackCompat"){Y=parseFloat(E(a.parentNode,"width"))-a.offsetWidth;if(Y==0){return"0px"}Y="0px "+Y;return Y+" "+Y}}function V(c,X){var Y=P.exec(X),a,g,b,e,f,d=true,W,Z=1;if(Y&&Y[0]){W=C;a=Y[1]||Y[0];g=Y[2]||""}else{if(D.test(X)){W=O;a=D.exec(X)[0];g=""}else{return[""]}}b=c[a+W[0]+g];f=[b];while(Z<4){e=c[a+W[Z]+g];d=d&&e==b;b=e;f[Z++]=e}if(d){return[b]}return f}var H=/(-?\d+|(?:-?\d*\.\d+))(?:em|ex|pt|pc|in|cm|mm\s*)/,Q=/width|height|top|left/,M="px";function B(a,b){if(a.runtimeStyle){var c=b[0];if(parseFloat(c)==0){return"0px"}var Z=a[S],Y=Z.left,X=a.runtimeStyle,W=X.left;X.left=a[L].left;Z.left=(c||0);c=Z.pixelLeft+M;Z.left=Y;X.left=W;return c}}})();(function(){var D=document,A=D.body,F,C="getElementById",E=document[C];if(!A){return setTimeout(arguments.callee,50)}try{F=D.createElement("<A NAME=0>");A.insertBefore(F,A.firstChild);if(D[C]("0")){A.removeChild(F);D[C]=B}}catch(A){}function B(J){var I=Function.prototype.call.call(E,this,J),H,G;if(I.id==J){return I}H=this.getElementsByName(J);for(G=0;G<H.length;G++){if(H[G].id===J){return H[G]}}return null}})();