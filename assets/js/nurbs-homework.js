define(['js/twgl','js/2d-boilerplate','js/sylvester','js/style','js/util','js/nurbs'],function(a,b,c,d,e,f){'use strict';var g=Number.parseInt;const h={NurbsHomework(a,b){this.Program(this.render,{container:a,idPrefix:b,width:640,height:480}),this.points=[],this.knots=[],this.knotBars=[],this.degree=2,this.curvePoints=[],this.isDragging=!1,this.isMouseJustPressed=!0,this.draggedPoint=null,this.minPoints=3,this.curveCalculator=Object.create(f),this.curveCalculator.Nurbs(this.points,this.knots)},initDOM(){const a=this.settings.container;a.css('display','flex');const b=$('<span></span>');b.css('flex','1'),this.controllerContainer=$('<div></div>'),this.controllerContainer.addClass('canvas-controller'),b.append(this.controllerContainer);const c=$('<span></span>');c.css('flex','2'),c.append(this.canvasMarkup()),a.append(b),a.append(c)},addKnot(){if(0==this.knots.length){let a=this.createKnotInput(0,0,1e3,0.1,(a)=>this.onKnotChanged(0,a));this.knotBars.push(a),this.knots.push(0),this.controllerContainer.append(a.container)}else{const a=this.knotBars[this.knotBars.length-1].input,b=this.knots[this.knots.length-1]+1;a.max=b;const c=this.knotBars.length;let d=this.createKnotInput(b,a.value,1e3,0.1,(a)=>this.onKnotChanged(c,a));this.knotBars.push(d),this.knots.push(b),this.controllerContainer.append(d.container)}},removeKnot(){const a=this.knotBars.pop();a.container.remove(),this.knots.pop(),0<this.knotBars.length&&(this.knotBars[this.knotBars.length-1].input.max=1e3)},onKnotChanged(a,b){const c=a-1,d=a+1;0<=c&&(this.knotBars[c].input.max=b.target.value),d<this.knotBars.length&&(this.knotBars[d].input.min=b.target.value),this.knots[a]=Number.parseFloat(b.target.value)},createKnotInput(a,b,c,d,e){const f=$(`<input type="number" value="${a}" min="${b}" max="${c}" step="${d}"/>`);f.on('input',e);const g=$('<div></div>');return g.addClass('knot-container'),g.append(f),{container:g[0],input:f[0]}},createNumberInput(a,b,c,d,e,f){const g=this.withPrefix(name),h=$('<span></span>');h.addClass('slider-container');const i=$(`<input type="number" value="${b}" min="${c}" max="${d}" step="${e}"/>`);i.on('input',f),h.append(i);const j=$('<div></div>');return j.addClass('controller-input-container'),j.append(`<label>${a}</label>`),j.append(h),{container:j[0],input:i[0]}},setupControllers(){const{container:a,input:b}=this.createNumberInput('Foksz\xE1m',this.degree,1,2,1,(a)=>this.changeDegree(a));this.controllerContainer.append(a),this.degreeInput=b,this.controllerContainer.append('<div class="knot-container-heading">Csom\xF3\xE9rt\xE9kek</div>'),[1,2,3,4,5,6].map(this.addKnot.bind(this))},changeDegree(a){const b=g(a.target.value);b>this.degree?this.addKnot():b<this.degree&&this.removeKnot(),this.degree=b},getClickedPoint(a){for(let b=0;b<this.points.length;++b)if(10>=this.points[b].distanceFrom(a))return this.points[b];return null},onMouseDown(a){if(this.isMouseJustPressed){if(this.draggedPoint=this.getClickedPoint(a),this.draggedPoint)this.isDragging=!0;else{const b=a.dup();b.weight=1,this.points.push(b),this.points.length==this.minPoints&&this.setupControllers(),this.points.length>this.minPoints&&(this.degreeInput.max=g(this.degreeInput.max)+1,this.addKnot())}this.isMouseJustPressed=!1}},onMouseUp(){this.isDragging=!1,this.draggedPoint=null,this.isMouseJustPressed=!0},onMouseMove(a){this.isDragging&&this.draggedPoint&&(this.draggedPoint.elements=a.elements)},onWheel(a,b){b.preventDefault();const c=this.getClickedPoint(a);if(c){const a=-b.deltaY/1e3;0<c.weight+a&&(c.weight+=a)}return!1},calculateCurve(){if(this.curvePoints=[],this.points.length>=this.minPoints)for(let a=this.knots[this.degree];a<=this.knots[this.points.length];a+=0.01)this.curvePoints.push(this.curveCalculator.evaluate(a))},calculatePiece(a){const b=this.points.slice(a,a+4);return this.curveCalculator(b)},render(){this.calculateCurve(),this.renderControlPolygon(),this.renderPoints(),this.renderCurve()},renderCurve(){const b={color:d.colors.curve},c={position:{numComponents:2,data:e.toPositionArray(this.curvePoints)}},f=a.createBufferInfoFromArrays(this.gl,c);a.setBuffersAndAttributes(this.gl,this.programInfo,f),a.setUniforms(this.programInfo,b),a.drawBufferInfo(this.gl,f,this.gl.LINE_STRIP)},renderPoints(){const b={color:d.colors.controlPoint};for(let c of this.points){const d=e.circle(c,3*c.weight),f={position:{numComponents:2,data:e.toPositionArray(d)}},g=a.createBufferInfoFromArrays(this.gl,f);a.setBuffersAndAttributes(this.gl,this.programInfo,g),a.setUniforms(this.programInfo,b),a.drawBufferInfo(this.gl,g,this.gl.TRIANGLE_FAN)}},renderControlPolygon(){const b={color:d.colors.controlPolygon},c={position:{numComponents:2,data:e.toPositionArray(this.points)}},f=a.createBufferInfoFromArrays(this.gl,c);a.setBuffersAndAttributes(this.gl,this.programInfo,f),a.setUniforms(this.programInfo,b),a.drawBufferInfo(this.gl,f,this.gl.LINE_STRIP)}};return Object.setPrototypeOf(h,b),function(a,b){const c=Object.create(h);c.NurbsHomework(a,b),c.start(!1)}});