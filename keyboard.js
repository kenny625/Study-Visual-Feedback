var canvas = document.getElementById("myCanvas");
var ctx1 = canvas.getContext("2d");
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
var characterPosition = new Array();
var lastMousePos = new Object();
var mode = 0; //0 add new site, 1 rearrange site  
var ws;

if ("WebSocket" in window) {
    ws = new WebSocket("ws://localhost:8080");
    ws.onopen = function () {
        // Web Socket is connected, send data using send()
    };
    ws.onmessage = function (evt) {
        var received_msg = evt.data;
        console.log(evt);
        console.log(received_msg);
        var received_msg_obj = JSON.parse(received_msg);
        switch(received_msg_obj.action){
           case "loadLayout":
                Voronoi.sites = received_msg_obj.layout;
                Voronoi.diagram = Voronoi.voronoi.compute(Voronoi.sites, Voronoi.bbox);
                console.log(Voronoi.sites);
                Voronoi.render();
                for(var i=0;i<Voronoi.sites.length;i++){
                    Voronoi.writeKeyName(Voronoi.sites[i].key, Voronoi.sites[i].x, Voronoi.sites[i].y);
                }
                break;
            default:
        }
        
    };
    ws.onclose = function () {
        // websocket is closed.
    };
} else {
    // The browser doesn't support WebSocket
    console.log("WebSocket NOT supported by your Browser!");
}


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

document.getElementById('setKey').addEventListener('click', function (event) {
    Voronoi.writeKeyName(document.getElementById('keyName').value, lastMousePos.x, lastMousePos.y);
    
});

document.getElementById('setMode').addEventListener('click', function (event) {
    if (document.getElementById('modeSelect').value == 'add') {
        mode = 0;
    } else {
        mode = 1;
    }
});

document.getElementById('save').addEventListener('click', function (event) {
    var layoutObj = new Object();
    layoutObj.layout = Voronoi.sites;
    layoutObj.action = "saveLayout";
    ws.send(JSON.stringify(layoutObj));
});

document.getElementById('load').addEventListener('click', function (event) {
    var loadObj = new Object();
    loadObj.action = "loadLayout";
    ws.send(JSON.stringify(loadObj));
});

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
        var scaleRatio = lineDistance(IF.startX, IF.startY, IF.endX, IF.endY) / lineDistance(IFimg.startX, IFimg.startY, IFimg.endX, IFimg.endY);
        scale(img, scaleRatio);
        rotate(img, IFimg.startX * scaleRatio, IFimg.startY * scaleRatio, (-1) * degree);
        move(img, (-1) * (IFimg.startX * scaleRatio - IF.startX), (-1) * (IFimg.startY * scaleRatio - IF.startY));

        currentKey = 0;
        //        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx1.fillStyle = "#00FF00";
        ctx1.fillRect(470, 140, 8, 8);
        ctx1.fillRect(870, 140, 8, 8);
    } else if (currentKey == 52) {
        ctx1.clearRect(0, 0, canvas.width, canvas.height);
        var VoronoiCanvas = document.createElement("canvas");
        VoronoiCanvas.setAttribute("id", "voronoiCanvas");
        VoronoiCanvas.setAttribute("style", "cursor:crosshair");
        VoronoiCanvas.setAttribute("width", "980");
        VoronoiCanvas.setAttribute("height", "551");
        insertAfter(document.getElementById("myCanvas"), VoronoiCanvas);
        Voronoi.init();
    } else if (currentKey == 53) {
        Voronoi.highlight(Voronoi.getWhichCell(500, 500));

    }
}

function drawPoint(x, y) {
    ctx1.fillStyle = "#FF0000";
    ctx1.fillRect(x - 4, y - 4, 8, 8);
}

function rotate(img, transformOriginX, transformOriginY, degree) {
    img.style['WebkitTransformOrigin'] = transformOriginX + 'px ' + transformOriginY + 'px';
    img.style['webkitTransform'] = 'rotate(' + degree + 'deg)';
}

function move(img, left, top) {
    img.style['left'] = left + 'px';
    img.style['top'] = top + 'px';
}

function scale(img, ratio) {
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

function setCharacterPosition() {
    var pos = new Object();
    //    pos.x = 
    //    characterPosition['q'] = 
}




var Voronoi = {
    voronoi: new Voronoi(),
    sites: [],
    diagram: null,
    margin: 100,
    canvas: null,
    bbox: {
        xl: 0,
        xr: 980,
        yt: 75,
        yb: 551
    },
    ctx: null,

    normalizeEventCoords: function (target, e) {
        // http://www.quirksmode.org/js/events_properties.html#position
        // =====
        if (!e) {
            e = self.event;
        }
        var x = 0;
        var y = 0;
        if (e.pageX || e.pageY) {
            x = e.pageX;
            y = e.pageY;
        } else if (e.clientX || e.clientY) {
            x = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
            y = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
        }
        // =====
        return {
            x: x - target.offsetLeft,
            y: y - target.offsetTop
        };
    },

    init: function () {
        var me = this;
        this.canvas = document.getElementById('voronoiCanvas');
        this.ctx = this.canvas.getContext('2d');
        //		this.canvas.onmousemove = function(e) {
        //			if (!me.sites.length) {return;}
        //			var site = me.sites[0];
        //			var mouse = me.normalizeEventCoords(me.canvas,e);
        //			site.x = mouse.x;
        //			site.y = mouse.y;
        //			me.diagram = me.voronoi.compute(me.sites,me.bbox);
        //			me.render();
        //			};
        this.canvas.onclick = function (e) {
            var mouse = me.normalizeEventCoords(me.canvas, e);
            if (mode == 0) {
                me.addSite(mouse.x, mouse.y);
                lastMousePos.x = mouse.x;
                lastMousePos.y = mouse.y;
                me.writeKeyPoint(mouse);
                me.render();
            } else if (mode == 1) {
                var cellIndex = me.getWhichCell(mouse.x, mouse.y);
                var key = me.sites[cellIndex].key;
                var oldX = me.sites[cellIndex].x, oldY = me.sites[cellIndex].y;
                me.sites.splice(cellIndex, 1);
                me.addSite(mouse.x, mouse.y);
                me.sites[me.sites.length-1].key = key; 
                me.clearKeyName(oldX, oldY);
                me.writeKeyName(key, mouse.x, mouse.y);
                me.render();
            }

        };
        //		this.randomSites(10,true);
        //        me.addSite(100,100);
        //        me.addSite(200,200);
        //        me.addSite(300,300);
        this.render();
    },

    clearSites: function () {
        // we want at least one site, the one tracking the mouse
        this.sites = [{
            x: 0,
            y: 0
        }];
        this.diagram = this.voronoi.compute(this.sites, this.bbox);
    },

    randomSites: function (n, clear) {
        if (clear) {
            this.sites = [];
        }
        var xo = this.margin;
        var dx = this.canvas.width - this.margin * 2;
        var yo = this.margin;
        var dy = this.canvas.height - this.margin * 2;
        for (var i = 0; i < n; i++) {
            this.sites.push({
                x: self.Math.round(xo + self.Math.random() * dx),
                y: self.Math.round(yo + self.Math.random() * dy)
            });
        }
        this.diagram = this.voronoi.compute(this.sites, this.bbox);
    },

    addSite: function (x, y) {
        this.sites.push({
            x: x,
            y: y
        });
        this.diagram = this.voronoi.compute(this.sites, this.bbox);
    },

    writeKeyName: function (key, x, y) {
        ctx1.clearRect(x - 5, y - 5, 10, 10);
        ctx1.font = '30pt Calibri';
        ctx1.fillStyle = '#00FF00';
        ctx1.fillText(key, x - 10, y + 10);
        this.sites[this.getWhichCell(x, y)].key = key;
    },
    
    clearKeyName: function (x, y){
        ctx1.clearRect(x - 15, y - 15, 40, 40);
    }, 

    writeKeyPoint: function (site) {
        //    while (nSites--) {
        //            site = sites[nSites];
        //            ctx1.rect(site.x - 2 / 3, site.y - 2 / 3, 2, 2);
        //            ctx1.fillStyle = "#FF0000";
        //            //            ctx.font = '30pt Calibri';
        //            //            ctx.fillText('Q', site.x - 15, site.y + 15);
        //            ctx1.fillRect(site.x - 4, site.y - 4, 8, 8);
        //        }
        ctx1.rect(site.x - 2 / 3, site.y - 2 / 3, 2, 2);
        ctx1.fillStyle = "#FF0000";
        ctx1.fillRect(site.x - 4, site.y - 4, 8, 8);
    },

    getWhichCell: function (x, y) {
        var cellIndex, minDistance = 99999,
            distance;
        for (var i = 0; i < this.sites.length; i++) {
            distance = lineDistance(x, y, this.sites[i].x, this.sites[i].y);
            if (distance < minDistance) {
                minDistance = distance;
                cellIndex = i;
            }
        }
        return cellIndex;
    },

    render: function () {
        var ctx = this.ctx;
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
        if (!this.diagram) {
            return;
        }
        ctx.strokeStyle = '#000';
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
                ctx.moveTo(v.x, v.y);
                v = edge.vb;
                ctx.lineTo(v.x, v.y);
            }
            ctx.stroke();
        }
        // how many sites do we have?
        var sites = this.sites,
            nSites = sites.length;
        if (!nSites) {
            return;
        }
        //        // highlight cell under mouse
        //        var cell = this.diagram.cells[this.sites[0].voronoiId];
        //        // there is no guarantee a Voronoi cell will exist for any
        //        // particular site
        //        if (cell) {
        //            var halfedges = cell.halfedges,
        //                nHalfedges = halfedges.length;
        //            if (nHalfedges > 2) {
        //                v = halfedges[0].getStartpoint();
        //                ctx.beginPath();
        //                ctx.moveTo(v.x, v.y);
        //                for (var iHalfedge = 0; iHalfedge < nHalfedges; iHalfedge++) {
        //                    v = halfedges[iHalfedge].getEndpoint();
        //                    ctx.lineTo(v.x, v.y);
        //                }
        //                ctx.fillStyle = '#faa';
        //                ctx.fill();
        //            }
        //        }
        // draw sites
        var site;
        ctx.beginPath();
        ctx.fillStyle = '#44f';

        ctx.fill();
    },

    highlight: function (cellIndex) {
        ctx = this.ctx;
        var cell = this.diagram.cells[this.sites[cellIndex].voronoiId];
        // there is no guarantee a Voronoi cell will exist for any
        // particular site
        if (cell) {
            var halfedges = cell.halfedges,
                nHalfedges = halfedges.length;
            if (nHalfedges > 2) {
                v = halfedges[0].getStartpoint();
                ctx.beginPath();
                ctx.moveTo(v.x, v.y);
                for (var iHalfedge = 0; iHalfedge < nHalfedges; iHalfedge++) {
                    v = halfedges[iHalfedge].getEndpoint();
                    ctx.lineTo(v.x, v.y);
                }
                ctx.globalAlpha = 0.5;
                ctx.fillStyle = '#faa';
                ctx.fill();
            }
        }
    },
};