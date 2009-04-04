APE.namespace("APE.dom");(function(){var C=APE.dom,D=document.documentElement,B="textContent",A=document.defaultView;C.IS_COMPUTED_STYLE=(typeof A!="undefined"&&"getComputedStyle" in A);C.textContent=B in D?B:"innerText"})();(function(){APE.mixin(APE.dom,{getScrollOffsets:A,getViewportDimensions:B});var D=document.documentElement,C=D&&D.clientWidth===0;D=null;function A(G){G=G||window;var F,H=G.document,E=H.documentElement;if("pageXOffset" in G){F=function(){return{left:G.pageXOffset,top:G.pageYOffset}}}else{if(C){E=H.body}F=function(){return{left:E.scrollLeft,top:E.scrollTop}}}H=null;this.getScrollOffsets=F;return F()}function B(I){I=I||window;var F=I.document,J=F,H="client",K,G;if(typeof J.clientWidth=="number"){}else{if(C||E(I)){F=J.body}else{if(J.documentElement.clientHeight>0){F=J.documentElement}else{if(typeof innerHeight=="number"){F=I;H="inner"}}}}K=H+"Width";G=H+"Height";return(this.getViewportDimensions=function(){return{width:F[K],height:F[G]}})();function E(M){var N=M.document,O=N.createElement("div");O.style.height="2500px";N.body.insertBefore(O,N.body.firstChild);var L=N.documentElement.clientHeight>2400;N.body.removeChild(O);return L}}})();(function(){APE.mixin(APE.dom,{getOffsetCoords:Z,isAboveElement:D,isBelowElement:U,isInsideElement:J});var f=this.document,Y,e=f.documentElement,b=Math.round,W=Math.max,O=e&&e.clientWidth===0,P="clientTop" in e,N=/^h/.test(e.tagName)?"table":"TABLE",K="currentStyle" in e,R,C,c,T,Q,M,E,H,A,L,d,F=f.defaultView&&typeof f.defaultView.getComputedStyle!="undefined",G="getBoundingClientRect",a="relative",X="borderTopWidth",B="borderLeftWidth",I=/^(?:r|a)/,S=/^(?:a|f)/;function Z(h,z,AF){var AL=h.ownerDocument,AJ=AL.documentElement,u=AL.body;if(!z){z=AL}if(!AF){AF={x:0,y:0}}if(h===z){AF.x=AF.y=0;return AF}if(G in h){var AH=O?u:AJ,s=h[G](),r=s.left+W(AJ.scrollLeft,u.scrollLeft),p=s.top+W(AJ.scrollTop,u.scrollTop),AE,AB=AH.clientTop,i=AH.clientLeft;if(P){r-=i;p-=AB}if(z!==AL){s=Z(z,null);r-=s.x;p-=s.y;if(O&&z===u&&P){r-=i;p-=AB}}if(O&&K&&z!=AL&&z!==u){AE=u.currentStyle;r+=parseFloat(AE.marginLeft)||0+parseFloat(AE.left)||0;p+=parseFloat(AE.marginTop)||0+parseFloat(AE.top)||0}AF.x=r;AF.y=p;return AF}else{if(F){if(!Y){V()}var n=h.offsetLeft,AG=h.offsetTop,AC=AL.defaultView,m=AC.getComputedStyle(h,"");if(m.position=="fixed"){AF.x=n+AJ.scrollLeft;AF.y=AG+AJ.scrollTop;return AF}var t=AC.getComputedStyle(u,""),v=!I.test(t.position),l=h,o=h.parentNode,g=h.offsetParent;for(;o&&o!==z;o=o.parentNode){if(o!==u&&o!==AJ){n-=o.scrollLeft;AG-=o.scrollTop}if(o===g){if(o===u&&v){}else{if(!R&&!(o.tagName===N&&Q)){var k=AC.getComputedStyle(o,"");n+=parseFloat(k[B])||0;AG+=parseFloat(k[X])||0}if(o!==u){n+=g.offsetLeft;AG+=g.offsetTop;l=g;g=o.offsetParent}}}}var q=0,AD=0,AK,w,AI=z===AL||z===AJ,AA,j;if(l!=AL){j=AC.getComputedStyle(l,"").position;AK=S.test(j);w=AK||I.test(j)}if((l===h&&h.offsetParent===u&&!C&&z!==u&&!(v&&T))||(C&&l===h&&!w)||!v&&w&&E&&AI){AD+=parseFloat(t.marginTop)||0;q+=parseFloat(t.marginLeft)||0}if(z===u){AA=AC.getComputedStyle(AJ,"");if((!v&&((A&&!AK)||(L&&AK)))||v&&H){AD-=parseFloat(AA.paddingTop)||0;q-=parseFloat(AA.paddingLeft)||0}if(d){if(!w||w&&!v){AD-=parseFloat(AA.marginTop)||0}q-=parseFloat(AA.marginLeft)||0}}if(v){if(M||(!AK&&!R&&AI)){AD+=parseFloat(t[X]);q+=parseFloat(t[B])}}else{if(T){if(AI){if(!c){AD+=parseFloat(t.top)||0;q+=parseFloat(t.left)||0;if(AK&&R){AD+=parseFloat(t[X]);q+=parseFloat(t[B])}}if(z===AL&&!v&&!A){if(!AA){AA=AC.getComputedStyle(AJ,"")}AD+=parseFloat(AA.paddingTop)||0;q+=parseFloat(AA.paddingLeft)||0}}else{if(c){AD-=parseFloat(t.top);q-=parseFloat(t.left)}}if(C&&(!w||z===u)){AD-=parseFloat(t.marginTop)||0;q-=parseFloat(t.marginLeft)||0}}}AF.x=b(n+q);AF.y=b(AG+AD);return AF}}}function V(){Y=true;var p=f.body;if(!p){return}var g="marginTop",o="position",u="padding",m="static",l="border",y=p.style,j=y.cssText,t="1px solid transparent",q="0",n="1px",h="offsetTop",i=e.style,w=i.cssText,r=f.createElement("div"),k=r.style,v=f.createElement(N);y[u]=y[g]=y.top=q;i.position=m;y[l]=t;k.margin=q;k[o]=m;r=p.insertBefore(r,p.firstChild);R=(r[h]===1);y[l]=q;v.innerHTML="<tbody><tr><td>x</td></tr></tbody>";v.style[l]="7px solid";v.cellSpacing=v.cellPadding=q;p.insertBefore(v,p.firstChild);Q=v.getElementsByTagName("td")[0].offsetLeft===7;p.removeChild(v);y[g]=n;y[o]=a;C=(r[h]===1);T=p[h]===0;y[g]=q;y.top=n;c=r[h]===1;y.top=q;y[g]=n;y[o]=k[o]=a;E=r[h]===0;k[o]="absolute";y[o]=m;if(r.offsetParent===p){y[l]=t;k.top="2px";M=r[h]===1;y[l]=q;k[o]=a;i[u]=n;y[g]=q;H=r[h]===3;y[o]=a;A=r[h]===3;k[o]="absolute";L=r[h]===3;i[u]=q;i[g]=n;d=r[h]===3}p.removeChild(r);y.cssText=j||"";i.cssText=w||""}function J(h,g){var j=Z(h).y,i=Z(g).y;return j+h.offsetHeight<=i+g.offsetHeight&&j>=i}function D(h,g){return(Z(h).y<=Z(g).y)}function U(h,g){return(Z(h).y+h.offsetHeight>=Z(g).y+g.offsetHeight)}J=D=U=null})();(function(){APE.mixin(APE.dom,{hasToken:E,removeClass:I,addClass:F,getElementsByClassName:J,findAncestorWithClass:G});function E(L,K){return B(K,"").test(L)}function I(L,K){var M=L.className;if(!M){return}if(M===K){L.className="";return}L.className=C(M.replace(B(K,"g")," "))}function F(L,K){if(!L.className){L.className=K}if(!B(K).test(L.className)){L.className+=" "+K}}var A={};function B(L,K){var M=L+"$"+K;return(A[M]||(A[M]=RegExp("(?:^|\\s)"+L+"(?:$|\\s)",K)))}function J(L,M,S){if(!S){return[]}M=M||"*";if(L.getElementsByClassName&&(M==="*")){return Array.prototype.slice.call(L.getElementsByClassName(S))}var N=B(S,""),P=L.getElementsByTagName(M),Q=P.length,K=0,O,R=Array(Q);for(O=0;O<Q;O++){if(N.test(P[O].className)){R[K++]=P[O]}}R.length=K;return R}function G(N,K,L){if(N==null||N===L){return null}var O=B(K,""),M;for(M=N.parentNode;M!=L;){if(O.test(M.className)){return M}M=M.parentNode}return null}var D=/^\s+|\s+$/g,H=/\s\s+/g;function C(K){return K.replace(D,"").replace(H," ")}})();(function(){var B=document.documentElement,D="tagName",F=/^H/.test(B[D])?"toUpperCase":"toLowerCase",H=/^[A-Z]/;APE.mixin(APE.dom,{contains:I(),findAncestorWithAttribute:A,findAncestorWithTagName:J,findNextSiblingElement:C,findPreviousSiblingElement:E,getChildElements:G});function I(){if("compareDocumentPosition" in B){return function(L,K){return(L.compareDocumentPosition(K)&16)!==0}}else{if("contains" in B){return function(L,K){return L!==K&&L.contains(K)}}}return function(L,K){if(L===K){return false}while(L!=K&&(K=K.parentNode)!==null){}return L===K}}function A(M,P,N){for(var O,L=M.parentNode;L!=null;){O=L.attributes;if(!O){return null}var K=O[P];if(K&&K.specified){if(K.value===N||(N===undefined)){return L}}L=L.parentNode}return null}function J(M,K){K=K[F]();for(var L=M.parentNode;L!==null;){if(L[D]===K){return L}L=L.parentNode}return null}function C(L){for(var K=L.nextSibling;K!==null;K=K.nextSibling){if(D in K&&H.test(K[D])){return K}}return null}function E(K){for(var L=K.previousSibling;L!==null;L=L.previousSibling){if(D in L&&H.test(L[D])){return L}}return null}function G(O){var N=0,M=[],L,K,Q=O.children||O.childNodes,P;for(L=Q.length;N<L;N++){P=Q[N];K=P[D];if(typeof K!=="string"||K==="!"){continue}M[M.length]=P}return M}})();(function(){var A="addEventListener" in this,F=A?"target":"srcElement";APE.mixin(APE.dom.Event={},{eventTarget:F,getTarget:D,addCallback:E,removeCallback:G,preventDefault:B});function D(H){return(H||event)[F]}function C(I,H){return A?H:function(J){H.call(I,J)}}function E(K,J,H){if(A){K.addEventListener(J,H,false)}else{var I=C(K,H);K.attachEvent("on"+J,I)}return I||H}function G(J,I,H){if(A){J.removeEventListener(I,H,false)}else{J.detachEvent("on"+I,H)}return H}function B(H){H=H||event;if(typeof H.preventDefault=="function"){H.preventDefault()}else{if("returnValue" in H){H.returnValue=false}}}})();APE.namespace("APE.dom.Event");(function(){var C=APE.dom,A=C.Event;A.getCoords=B;function B(E){var D;if("pageX" in E){D=function(F){return{x:F.pageX,y:F.pageY}}}else{D=function(G){var F=C.getScrollOffsets();G=G||window.event;return{x:G.clientX+F.left,y:G.clientY+F.top}}}return(A.getCoords=D)(E)}})();(function(){var P=/^(?:margin|(border)(Width)|padding)$/,D=/^[a-zA-Z]*[bB]orderRadius$/,R=APE.dom;APE.mixin(R,{getStyle:E,setOpacity:U,getFilterOpacity:J,multiLengthPropExp:/^(?:margin|(border)(Width)|padding)$/,borderRadiusExp:/^[a-zA-Z]*[bB]orderRadius$/,tryGetShorthandValues:V,getCurrentStyleValueFromAuto:A,getCurrentStyleClipValues:F,convertNonPixelToPixel:B});var I=document.defaultView,T="getComputedStyle",G=R.IS_COMPUTED_STYLE,L="currentStyle",S="style";I=null;function J(W){var X=W.filters;if(!X){return""}try{return X["DXImageTransform.Microsoft.Alpha"].opacity/100}catch(Y){try{return X("alpha").opacity/100}catch(Y){return 1}}}function U(Z,W){var Y=Z[S],X;if("opacity" in Y){Y.opacity=W}else{if("filter" in Y){X=Z[L];Y.filter="alpha(opacity="+(W*100)+")";if(X&&("hasLayout" in X)&&!X.hasLayout){S.zoom=1}}}}function E(X,W){var f="",c,a,Y,Z,d,e=X.ownerDocument,b=e.defaultView;if(G){c=b[T](X,"");if(W=="borderRadius"&&!("borderRadius" in c)){W="MozBorderRadius" in c?"MozBorderRadius":"WebkitBorderRadius" in c?"WebkitBorderRadius":""}if(!(W in c)){return""}f=c[W];if(f===""){f=(V(c,W)).join(" ")}}else{c=X[L];if(W=="opacity"&&!("opacity" in X[L])){f=J(X)}else{if(W=="cssFloat"){W="styleFloat"}f=c[W];if(W=="clip"&&!f&&("clipTop" in c)){f=F(X,c)}else{if(f=="auto"){f=A(X,W)}else{if(!(W in c)){return""}}}}a=H.exec(f);if(a){Y=f.split(" ");Y[0]=B(X,a);for(Z=1,d=Y.length;Z<d;Z++){a=H.exec(Y[Z]);Y[Z]=B(X,a)}f=Y.join(" ")}}return f}function F(Z,Y){var W=[],X=0,a;for(;X<4;X++){a=C[X];clipValue=Y["clip"+a];if(clipValue=="auto"){clipValue=(a=="Left"||a=="Top"?"0px":a=="Right"?Z.offsetWidth+M:Z.offsetHeight+M)}W.push(clipValue)}return{top:W[0],right:W[1],bottom:W[2],left:W[3],toString:function(){return"rect("+W.join(" ")+")"}}}var K=document.documentElement[S],N="cssFloat" in K?"cssFloat":"styleFloat",C=["Top","Right","Bottom","Left"],O=["Topright","Bottomright","Bottomleft","Topleft"];K=null;function A(a,c){var Z=a[S],Y,X,b=a.ownerDocument;if("pixelWidth" in Z&&Q.test(c)){var W="pixel"+(c.charAt(0).toUpperCase())+c.substring(1);Y=Z[W];if(Y===0){if(c=="width"){X=parseFloat(E(a,"borderRightWidth"))||0;paddingWidth=parseFloat(E(a,"paddingLeft"))||0+parseFloat(E(a,"paddingRight"))||0;return a.offsetWidth-a.clientLeft-X-paddingWidth+M}else{if(c=="height"){X=parseFloat(E(a,"borderBottomWidth"))||0;paddingWidth=parseFloat(E(a,"paddingTop"))||0+parseFloat(E(a,"paddingBottom"))||0;return a.offsetHeight-a.clientTop-X+M}}}return Z[W]+M}if(c=="margin"&&a[L].position!="absolute"&&b.compatMode!="BackCompat"){Y=parseFloat(E(a.parentNode,"width"))-a.offsetWidth;if(Y==0){return"0px"}Y="0px "+Y;return Y+" "+Y}}function V(c,X){var Y=P.exec(X),a,g,b,e,f,d=true,W,Z=1;if(Y&&Y[0]){W=C;a=Y[1]||Y[0];g=Y[2]||""}else{if(D.test(X)){W=O;a=D.exec(X)[0];g=""}else{return[""]}}b=c[a+W[0]+g];f=[b];while(Z<4){e=c[a+W[Z]+g];d=d&&e==b;b=e;f[Z++]=e}if(d){return[b]}return f}var H=/(-?\d+|(?:-?\d*\.\d+))(?:em|ex|pt|pc|in|cm|mm\s*)/,Q=/width|height|top|left/,M="px";function B(a,b){if(a.runtimeStyle){var c=b[0];if(parseFloat(c)==0){return"0px"}var Z=a[S],Y=Z.left,X=a.runtimeStyle,W=X.left;X.left=a[L].left;Z.left=(c||0);c=Z.pixelLeft+M;Z.left=Y;X.left=W;return c}}})();(function(){var D=document,A=D.body,F,C="getElementById",E=document[C];if(!A){return setTimeout(arguments.callee,50)}try{F=D.createElement("<A NAME=0>");A.insertBefore(F,A.firstChild);if(D[C]("0")){A.removeChild(F);D[C]=B}}catch(A){}function B(J){var I=Function.prototype.call.call(E,this,J),H,G;if(I.id==J){return I}H=this.getElementsByName(J);for(G=0;G<H.length;G++){if(H[G].id===J){return H[G]}}return null}})();