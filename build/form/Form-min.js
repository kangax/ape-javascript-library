APE.namespace("APE.form");APE.form.Form=function(A){this.form=A};APE.form.Form.prototype={toObject:function(G){var A=this.form,I=A.elements,O,P,B,D,R,M=/^(?:rad|che)/,Q={},C,H,N,J,K,F,L=/^(?:submit|image)$/;if(!I&&A.form&&A.form.elements){A=A.form;I=A.elements}for(O=0,P=I.length;O<P;O++){B=I[O];D=B.type;R=B.name;if(!R||B.disabled||D=="reset"||D=="button"||L.test(D)||(M.test(D)&&!B.checked)||(B.tagName=="OBJECT"&&B.declare)||B.type=="select-multiple"&&!B.value){continue}K=Q[R];if(!K){Q[R]=K=[]}F=K.length;C=B.options;if(C){if(B.type=="select-multiple"){for(N=0,J=C.length;N<J;N++){H=C[N];if(H.selected){K[F]=H.value||H.text}}}else{H=C[B.selectedIndex];if(!H.disabled){K[F]=H.value||H.text}}}else{if(B.type=="file"){var E=B.files;if(E&&E[0]){K[F]=E[0]}}else{K[F]=B.value}}}if(G&&G.name){if(!Q[G.name]){K=Q[G.name]=[]}K[K.length]=G.value}return Q},getMultipartFormData:function(E){var H=this.toObject(E),A,F,B,C,D,I=[],G="\r\n\r\n";for(A in H){F=H[A];for(C=0,D=F.length;C<D;C++){B=F[C];if(!B){continue}I[I.length]='Content-Disposition: form-data; name="'+A+'";'+(B.fileName&&B.getAsBinary?' filename="'+B.fileName+'"'+G+B.getAsBinary():G+B)}}return I},getQueryString:function(G){var D=this.toObject(G),H,C,F,E,A=[],B=/%20/g;for(H in D){F=D[H];E=encodeURIComponent(H);for(C=0,len=F.length;C<len;C++){A[A.length]=E+"="+encodeURIComponent(F[C]).replace(B,"+")}}return A.join("&")},serialize:function(A){var B=this.form.method.toLowerCase();if(B=="get"){return this.form.action+"?"+this.getQueryString(A)}if(B=="post"){if(this.form.enctype=="multipart/form-data"){return this.getMultipartFormData(A)}return this.getQueryString(A)}}};