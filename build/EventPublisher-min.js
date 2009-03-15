APE.EventPublisher=function(B,A){this.src=B;this._callStack=[];this.type=A};APE.EventPublisher.prototype={add:function(B,A){this._callStack.push([B,A||this.src]);return this},addBefore:function(B,A){return APE.EventPublisher.add(this,"beforeFire",B,A)},addAfter:function(B,A){return APE.EventPublisher.add(this,"afterFire",B,A)},getEvent:function(A){return APE.EventPublisher.get(this,A)},remove:function(C,B){var F=this._callStack,D=0,A,E;if(!B){B=this.src}for(A=F.length;D<A;D++){E=F[D];if(E[0]===C&&E[1]===B){return F.splice(D,1)}}return null},removeBefore:function(B,A){return this.getEvent("beforeFire").remove(B,A)},removeAfter:function(B,A){return this.getEvent("afterFire").remove(B,A)},fire:function(A){return APE.EventPublisher.fire(this)(A)},toString:function(){return"APE.EventPublisher: {src="+this.src+", type="+this.type+", length="+this._callStack.length+"}"}};APE.EventPublisher.add=function(D,C,B,A){return APE.EventPublisher.get(D,C).add(B,A)};APE.EventPublisher.fire=function(B){return A;function A(I){var E=false,G=0,C,H=B._callStack,D;if(typeof B.beforeFire=="function"){try{if(B.beforeFire(I)==false){E=true}}catch(F){APE.deferError(F)}}for(C=H.length;G<C;G++){D=H[G];try{if(D[0].call(D[1],I)==false){E=true}}catch(F){APE.deferError(F)}}if(typeof B.afterFire=="function"){if(B.afterFire(I)==false){E=true}}return !E}};APE.EventPublisher.get=function(F,E){var D=this.Registry.hasOwnProperty(E)&&this.Registry[E]||(this.Registry[E]=[]),B=0,A=D.length,C;for(;B<A;B++){if(D[B].src===F){return D[B]}}C=new APE.EventPublisher(F,E);if(F[E]){C.add(F[E],F)}F[E]=this.fire(C);D[D.length]=C;return C};APE.EventPublisher.Registry={};APE.EventPublisher.cleanUp=function(){var C,E,D,B,A;for(C in this.Registry){E=this.Registry[C];for(B=0,A=E.length;B<A;B++){D=E[B];D.src[D.type]=null}}};if(window.CollectGarbage){APE.EventPublisher.get(window,"onunload").addAfter(APE.EventPublisher.cleanUp,APE.EventPublisher)};