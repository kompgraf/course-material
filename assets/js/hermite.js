define(['js/sylvester'],function(a){'use strict';const b={},c=a.$M([[2,-3,0,1],[-2,3,0,0],[1,-2,1,0],[1,-1,0,0]]);return b.calculateCurve=function(b=[],d=c,e=[0,1]){const f=a.$M(b),g=a.$M(d),h=[];for(let c=e[0];c<e[1];c+=0.01){const b=a.$V([c*c*c,c*c,c,1]),d=f.multiply(g.multiply(b));h.push(d.elements[0],d.elements[1])}return h},b});