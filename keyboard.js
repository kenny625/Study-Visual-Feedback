var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
var mousePos;
var IFimg, IF, IFmotion;
IFimg = new Object();
IF = new Object();
IF.startX = 470;
IF.startY = 140;
IF.endX = 870;
IF.endY = 140;
IFmotion = new Object();
var keys = new Array();
var currentKey = 0;
var img = document.getElementsByTagName('img')[0];


canvas.addEventListener('mousemove', function (event) {
    mousePos = getMousePos(canvas, event);
    var message = 'Mouse position: ' + mousePos.x + ',' + mousePos.y;
    //        writeMessage(canvas, message);

    //    console.log(mousePos.x);
}, false);

canvas.addEventListener('click', function (event) {
    if (currentKey == 49) {
        drawPoint(mousePos.x, mousePos.y);
        IFimg.startX = mousePos.x;
        IFimg.startY = mousePos.y;
        currentKey = 0;
    } else if (currentKey == 50) {
        drawPoint(mousePos.x, mousePos.y);
        IFimg.endX = mousePos.x;
        IFimg.endY = mousePos.y;
        currentKey = 0;
    } 


}, false);


function getMousePos(canvas, evt) {
    var rect = canvas.getBoundingClientRect();
    return {
        x: evt.clientX - rect.left,
        y: evt.clientY - rect.top
    };
}

function writeMessage(canvas, message) {
    var context = canvas.getContext('2d');
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.font = '18pt Calibri';
    context.fillStyle = 'black';
    context.fillText(message, 10, 25);
}

document.onkeydown = function () {
    //       alert('onkeydown:'+window.event.keyCode);
    currentKey = window.event.keyCode;
    if (currentKey == 51) {
        var deltaX = IFimg.endX - IFimg.startX;
        var deltaY = IFimg.endY - IFimg.startY;
        var degree = Math.atan2(deltaY, deltaX) / Math.PI * 180;
        var scaleRatio = lineDistance(IF.startX, IF.startY, IF.endX, IF.endY)/lineDistance(IFimg.startX, IFimg.startY, IFimg.endX, IFimg.endY);
        scale(img, scaleRatio);
        rotate(img, IFimg.startX * scaleRatio, IFimg.startY * scaleRatio, (-1) * degree);
        move(img, (-1) * (IFimg.startX * scaleRatio  - IF.startX) , (-1) * (IFimg.startY * scaleRatio - IF.startY));
        
        currentKey = 0;
//        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = "#00FF00";
    ctx.fillRect(470, 140, 8, 8);
    ctx.fillRect(870, 140, 8, 8);
    }else if (currentKey == 52){
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            var VoronoiCanvas = document.createElement("canvas");
            VoronoiCanvas.setAttribute("id", "voronoiCanvas");
            VoronoiCanvas.setAttribute("style", "cursor:crosshair");
            VoronoiCanvas.setAttribute("width", "980");
            VoronoiCanvas.setAttribute("height", "551");
            insertAfter(document.getElementById("myCanvas"), VoronoiCanvas);
            Voronoi.init();
    }else if(currentKey == 53) {
        Voronoi.highlight();
    }
}

function drawPoint(x, y) {
    ctx.fillStyle = "#FF0000";
    ctx.fillRect(x - 4, y - 4, 8, 8);
}

function rotate(img, transformOriginX, transformOriginY, degree) {
    img.style['WebkitTransformOrigin'] = transformOriginX + 'px ' + transformOriginY + 'px';
    img.style['webkitTransform'] = 'rotate(' + degree + 'deg)';
}

function move(img, left, top) {
    img.style['left'] = left + 'px';
    img.style['top'] = top + 'px';
}

function scale(img, ratio){
    img.style['width'] = img.offsetWidth * ratio + 'px';
}

function lineDistance(x1, y1, x2, y2) {
    var xs = 0;
    var ys = 0;

    xs = x2 - x1;
    xs = xs * xs;

    ys = y2 - y1;
    ys = ys * ys;

    return Math.sqrt(xs + ys);
}

function insertAfter(referenceNode, newNode) {
    referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
}




var Voronoi = {
	voronoi: new Voronoi(),
	sites: [],
	diagram: null,
	margin: 100,
	canvas: null,
	bbox: {xl:0,xr:980,yt:0,yb:551},

	normalizeEventCoords: function(target,e) {
		// http://www.quirksmode.org/js/events_properties.html#position
		// =====
		if (!e) {e=self.event;}
		var x = 0;
		var y = 0;
		if (e.pageX || e.pageY) {
			x = e.pageX;
			y = e.pageY;
			}
		else if (e.clientX || e.clientY) {
			x = e.clientX+document.body.scrollLeft+document.documentElement.scrollLeft;
			y = e.clientY+document.body.scrollTop+document.documentElement.scrollTop;
			}
		// =====
		return {x:x-target.offsetLeft,y:y-target.offsetTop};
		},

	init: function() {
		var me = this;
		this.canvas = document.getElementById('voronoiCanvas');
//		this.canvas.onmousemove = function(e) {
//			if (!me.sites.length) {return;}
//			var site = me.sites[0];
//			var mouse = me.normalizeEventCoords(me.canvas,e);
//			site.x = mouse.x;
//			site.y = mouse.y;
//			me.diagram = me.voronoi.compute(me.sites,me.bbox);
//			me.render();
//			};
		this.canvas.onclick = function(e) {
			var mouse = me.normalizeEventCoords(me.canvas,e);
			me.addSite(mouse.x,mouse.y);
			me.render();
			};
//		this.randomSites(10,true);
//        me.addSite(100,100);
//        me.addSite(200,200);
//        me.addSite(300,300);
		this.render();
		},

	clearSites: function() {
		// we want at least one site, the one tracking the mouse
		this.sites = [{x:0,y:0}];
		this.diagram = this.voronoi.compute(this.sites, this.bbox);
		},

	randomSites: function(n,clear) {
		if (clear) {this.sites = [];}
		var xo = this.margin;
		var dx = this.canvas.width-this.margin*2;
		var yo = this.margin;
		var dy = this.canvas.height-this.margin*2;
		for (var i=0; i<n; i++) {
			this.sites.push({x:self.Math.round(xo+self.Math.random()*dx),y:self.Math.round(yo+self.Math.random()*dy)});
			}
		this.diagram = this.voronoi.compute(this.sites, this.bbox);
		},

	addSite: function(x,y) {
		this.sites.push({x:x,y:y});
		this.diagram = this.voronoi.compute(this.sites, this.bbox);
		},

	render: function() {
		var ctx = this.canvas.getContext('2d');
        ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
		// background
		ctx.globalAlpha = 0.5;
//		ctx.beginPath();
//		ctx.rect(0,0,this.canvas.width,this.canvas.height);
//		ctx.fillStyle = '#fff';
//		ctx.fill();
//		ctx.strokeStyle = '#888';
//		ctx.stroke();
		// voronoi
		if (!this.diagram) {return;}
		ctx.strokeStyle='#000';
		// edges
		var edges = this.diagram.edges,
			nEdges = edges.length,
			v;
		if (nEdges) {
			var edge;
			ctx.beginPath();
			while (nEdges--) {
				edge = edges[nEdges];
				v = edge.va;
				ctx.moveTo(v.x,v.y);
				v = edge.vb;
				ctx.lineTo(v.x,v.y);
				}
			ctx.stroke();
			}
		// how many sites do we have?
		var sites = this.sites,
			nSites = sites.length;
		if (!nSites) {return;}
		// highlight cell under mouse
		var cell = this.diagram.cells[this.sites[0].voronoiId];
		// there is no guarantee a Voronoi cell will exist for any
		// particular site
		if (cell) {
			var halfedges = cell.halfedges,
				nHalfedges = halfedges.length;
			if (nHalfedges > 2) {
				v = halfedges[0].getStartpoint();
				ctx.beginPath();
				ctx.moveTo(v.x,v.y);
				for (var iHalfedge=0; iHalfedge<nHalfedges; iHalfedge++) {
					v = halfedges[iHalfedge].getEndpoint();
					ctx.lineTo(v.x,v.y);
					}
				ctx.fillStyle = '#faa';
				ctx.fill();
				}
			}
		// draw sites
		var site;
		ctx.beginPath();
		ctx.fillStyle = '#44f';
		while (nSites--) {
			site = sites[nSites];
			ctx.rect(site.x-2/3,site.y-2/3,2,2);
            ctx.fillStyle = "#FF0000";
//            ctx.font = '30pt Calibri';
//            ctx.fillText('Q', site.x - 15, site.y + 15);
    ctx.fillRect(site.x - 4, site.y - 4, 8, 8);
			}
		ctx.fill();
		},
    highlight: function(){
        var cell = this.diagram.cells[this.sites[1].voronoiId];
		// there is no guarantee a Voronoi cell will exist for any
		// particular site
		if (cell) {
			var halfedges = cell.halfedges,
				nHalfedges = halfedges.length;
			if (nHalfedges > 2) {
				v = halfedges[0].getStartpoint();
				ctx.beginPath();
				ctx.moveTo(v.x,v.y);
				for (var iHalfedge=0; iHalfedge<nHalfedges; iHalfedge++) {
					v = halfedges[iHalfedge].getEndpoint();
					ctx.lineTo(v.x,v.y);
					}
                ctx.globalAlpha = 0.5;
				ctx.fillStyle = '#faa';
				ctx.fill();
				}
			}
    },
	};


