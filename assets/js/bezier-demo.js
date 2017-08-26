define(['js/twgl','js/2d-boilerplate','js/sylvester','js/bezier','js/style','js/util'],function(a,b,c,d,e){'use strict';const f={BezierDemo(a,b){this.Program(this.render,{container:a,idPrefix:b,width:640,height:480}),this.points=[],this.curvePoints=[],this.isDragging=!1,this.isMouseJustPressed=!0,this.draggedPoint=null},getClickedPoint(a){for(let b=0;b<this.points.length;++b)if(10>=this.points[b].distanceFrom(a))return this.points[b];return null},onMouseDown(a){this.isMouseJustPressed&&(this.draggedPoint=this.getClickedPoint(a),this.draggedPoint?this.isDragging=!0:this.points.push(a),this.isMouseJustPressed=!1)},onMouseUp(){this.isDragging=!1,this.draggedPoint=null,this.isMouseJustPressed=!0},onMouseMove(a){this.isDragging&&this.draggedPoint&&(this.draggedPoint.elements=a.elements)},calculateCurve(){this.curvePoints=d.calculateCurve(this.points)},render(){this.renderPoints(),this.calculateCurve(),this.renderCurve()},renderCurve(){const b={color:e.colors.curve},c={position:{numComponents:2,data:this.curvePoints}},d=a.createBufferInfoFromArrays(this.gl,c);a.setBuffersAndAttributes(this.gl,this.programInfo,d),a.setUniforms(this.programInfo,b),a.drawBufferInfo(this.gl,d,this.gl.LINE_STRIP)},renderPoints(){const b={color:e.colors.controlPolygon},c={position:{numComponents:2,data:[].concat.apply([],this.points.map((a)=>a.elements))}},d=a.createBufferInfoFromArrays(this.gl,c);a.setBuffersAndAttributes(this.gl,this.programInfo,d),a.setUniforms(this.programInfo,b),a.drawBufferInfo(this.gl,d,this.gl.LINE_STRIP),b.color=e.colors.controlPoint,a.setUniforms(this.programInfo,b),a.drawBufferInfo(this.gl,d,this.gl.POINTS)}};return Object.setPrototypeOf(f,b),function(a,b){const c=Object.create(f);c.BezierDemo(a,b),c.start(!1)}});