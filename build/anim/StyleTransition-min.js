APE.anim.StyleTransition=function(D,A,B,C){APE.anim.Animation.call(this,B);if(D.id){D=D.id}this.id=D;this.adapters=[];this.style=document.getElementById(this.id).style;if(C){this.transition=C}this.init(A)};APE.extend(APE.anim.StyleTransition,APE.anim.Animation,{inited:false,run:function run(E){var C=0,D=this.adapters,A=D.length,B;while(C<A){B=D[C++];this.style[B.prop]=B.blendTo(E)}},init:function(J){if(this.inited){return}var D=document.getElementById(this.id),M=[],K,E=window.APE,C,H,B,G,F=E.dom,I=E.anim.TransitionAdapterFactory,A=I.ThresholdTransitionAdapter,L=I.ImmediateThresholdTransitionAdapter;for(C in J){G=J[C];if(!G){continue}if(C=="opacity"&&!("opacity" in this.style)&&("filter" in this.style)){C="alpha";this.style.zoom="1";B=F.getFilterOpacity(D)}else{if(C=="clip"&&(!B||B.indexOf("auto")!=-1)){B="rect(0px "+D.offsetWidth+"px "+D.offsetHeight+"px 0px)"}else{H=F.getStyleUnit(G);B=F.findInheritedStyle(D,C,H)}}K=I.fromValues(C,B,G);M.push(K)}M.sort(function(O,N){return(O instanceof L?-1:1)});this.adapters=M},toString:function(){return"StyleTransitionAdapter : id=#"+this.id+"\n"+APE.anim.Animation.prototype.toString.call(this)+"\nAdapters:\n  "+this.adapters.join("\n  ")}});APE.anim.TransitionAdapterFactory={lengthExp:/(^-?\d+|(?:-?\d*\.\d+))(px|em|ex|pt|pc|in|cm|mm|%)/i,colorExp:/color/i,positiveLengthExp:/(?:width|height|padding|fontSize)$/ig,filterExp:/alpha/,opacityExp:/^opacity/,intExp:/^\d+$/,noVisibilityExp:/^(?:hidden|collapse)/,fromValues:function(C,B,A){if(this.positiveLengthExp.test(C)){return new this.PositiveLengthTransitionAdapter(C,B,A)}if(this.colorExp.test(C)){return new this.ColorTransitionAdapter(C,B,A)}if(C=="clip"){return new this.ClipTransitionAdapter(C,B,A)}if(this.lengthExp.test(B)){return new this.LengthTransitionAdapter(C,B,A)}if(this.filterExp.test(C)){return new this.FilterTransitionAdapter(C,B,A)}if(this.opacityExp.test(C)){return new this.OpacityTransitionAdapter(C,B,A)}if(C=="fontWeight"&&this.intExp.test(B)&&this.intExp.test(A)){return new this.FontWeightTransitionAdapter(C,B,A)}if(C=="visibility"&&this.noVisibilityExp.test(B)||C=="display"&&B=="none"){return new this.ImmediateThresholdTransitionAdapter(C,B,A)}return new this.ThresholdTransitionAdapter(C,B,A)}};(function(){var E=window.APE,C=E.color&&E.color.ColorRGB,J={PositiveLengthTransitionAdapter:H,ColorTransitionAdapter:F,LengthTransitionAdapter:N,FilterTransitionAdapter:K,OpacityTransitionAdapter:D,FontWeightTransitionAdapter:P,ThresholdTransitionAdapter:A,ImmediateThresholdTransitionAdapter:M,ClipTransitionAdapter:I};E.mixin(E.anim.TransitionAdapterFactory,J);function G(T,S,Q,R){this.prop=T;this.fromValue=S;this.toValue=Q;if(R){this.units=R}}G.prototype.toString=function(){var Q=(this.units||"");return E.getFunctionName(this.constructor)+": "+this.prop+", "+this.fromValue.toString()+Q+" \u2014 "+this.toValue.toString()+Q};function F(U,T,Q){if(!C){C=E.color.ColorRGB}var S=C.fromString(T),R=Q=C.fromString(Q);G.call(this,U,S,R);this.currentValue=new C()}E.extend(F,G,{blendTo:function(Q){var R=C.blend(this.fromValue,this.toValue,Q,this.currentValue);return R.toString()}});function N(V,U,Q){var R=E.anim.TransitionAdapterFactory.lengthExp,T=R.exec(U),S=R.exec(Q);G.call(this,V,parseFloat(T[0]),parseFloat(S[0]),T[2])}E.extend(N,G);N.prototype.blendTo=function(R){var Q=1-R;return((this.fromValue*Q)+(this.toValue*R))+this.units};function H(){N.apply(this,arguments)}E.extend(H,N);H.prototype.blendTo=function(S){var Q=1-S,R=Math.max((this.fromValue*Q)+(this.toValue*S),0)+this.units;return R};var B=/,?\s/,O=/rect\(([^\)]+)\)/,L=/0(\s|\))/g;function I(U,S,Q){this.prop="clip";var T=O.exec(S.replace(L,"0px$1"))[1],R=O.exec(Q.replace(L,"0px$1"))[1];this.fromValues=T.split(B);this.toValues=R.split(B);this.clips=[];this.values=[];this.init()}I.prototype={init:function(){for(var R=0,S,Q;R<4;R++){S=this.fromValues[R],Q=this.toValues[R];if(S=="0"){S="0px"}if(Q=="0"){Q="0px"}this.clips[R]=new N(this.prop,S,Q)}},blendTo:function(R){for(var Q=0;Q<4;Q++){this.values[Q]=this.clips[Q].blendTo(R)}return"rect("+this.values.join(" ")+")"},toString:function(){return"ClipTransitionAdapter:    \n"+this.clips.join("    \n")}};function D(S,R,Q){G.call(this,S,parseFloat(R),parseFloat(Q))}E.extend(D,G);D.prototype.blendTo=function(S){var Q=1-S,R=Math.max((this.fromValue*Q)+(this.toValue*S),0);return R};function K(S,R,Q){G.call(this,"filter",R,Q)}E.extend(K,G);K.prototype.blendTo=function(S){var Q=1-S,R=Math.abs((this.fromValue*Q)+(this.toValue*S),0);return"alpha(opacity="+Math.abs(R*100)+")"};function P(S,R,Q){G.call(this,S,parseInt(R),parseInt(Q))}E.extend(P,G);P.prototype.blendTo=function(S){var Q=1-S,R=(((this.fromValue*Q)+(this.toValue*S))/100<<0)*100;if(R<100){return 100}if(R>900){return 900}return R};function A(S,R,Q){G.call(this,S,R,Q)}E.extend(A,G);A.prototype.blendTo=function(Q){if(Q==1){return this.toValue}return this.fromValue};function M(S,R,Q){G.call(this,S,R,Q)}E.extend(M,G);M.prototype.blendTo=function(Q){if(Q==0){return this.fromValue}return this.toValue}})();