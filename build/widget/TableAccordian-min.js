function TableAccordian(B,A){this.id=B;this.duration=(A||300)/1000;this.rows=[];this.sheet=new APE.dom.StyleSheetAdapter(this.id+"Sheet")}TableAccordian.getById=APE.getById;TableAccordian.prototype={getRow:function(A){var B,C=this.rows[A];if(!C){B=document.getElementById(this.id);C=TableAccordian.Row.getByNode(B.rows[A],this);this.rows[A]=C}return C},toggleRow:function(A){this.getRow(A).toggle()},openRow:function(A){this.getRow(A).open()},closeRow:function(A){this.getRow(A).close()}};TableAccordian.Row=function(D,A){APE.anim.Animation.call(this,A.duration);this.transition=APE.anim.Transitions.accel;this.id=D.id;var B="#"+A.id+" #"+D.id+" .tableAccordian";var C=A.sheet.getRule(B);if(!C){C=A.sheet.addRule(B)}this.style=C.style;this.isExpanded=D.offsetHeight!=0;this.maxHeight=this.getRowHeight(D);this.isReversed=this.isExpanded;C.style.height="0";D.style.display=""};TableAccordian.Row.name="TableAccordianRow";TableAccordian.Row.getByNode=APE.getByNode;APE.extend(TableAccordian.Row,APE.anim.Animation,{run:function(A){var B=1-A;if("opacity" in this.style){this.style.opacity=String(B)}else{this.style.filter="alpha(opacity="+(0|B*100)+")"}this.style.height=B*this.maxHeight+"px"},onstart:function(){this.isExpanded=!this.isExpanded},toggle:function(){if(this.isExpanded){this.seekTo(1)}else{this.seekTo(0)}},open:function(){if(this.isExpanded){this.seekTo(0)}},close:function(){if(this.isExpanded){this.seekTo(1)}},getRowHeight:function(){var K=document.getElementById(this.id),J=K.cells[0],C=J.style,H=K.style,B=K.parentNode.style,A=C.cssText,D=H.cssText,I=B.cssText,G=J.currentStyle?"display: block;":"",E;C.cssText=G+"display: table-cell";H.cssText=G+"display: table-row;";B.cssText=G+"display: table-row-group";C.height=H.height=B.height="auto";E=J.clientHeight;C.height=E+"px";var F=J.clientHeight-E;C.cssText=A;H.cssText=D;B.cssText=I;return E-F}});