var canvas = document.getElementById("myCanvas");
var ctx1 = canvas.getContext("2d");
var highlightCanvas;
var highlightCtx;
var mousePos;
var IFimg, IF, IFmotion;
IFimg = new Object();
IF = new Object();
IF.startX = 45;
IF.startY = 170;
IF.endX = 45;
IF.endY = 410;
var leftUp = new Object();
leftUp.x = 0;
leftUp.y = 80;
var leftDown = new Object();
leftDown.x = 0;
leftDown.y = 390;
var rightUp = new Object();
rightUp.x = 800;
rightUp.y = 80;
var rightDown = new Object();
rightDown.x = 800;
rightDown.y = 390;
IFmotion = new Object();
var keys = new Array();
var currentKey = 0;
var img = document.getElementsByTagName('img')[0];
var characterPosition = new Array();
var lastMousePos = new Object();
var mode = 1; //0 add new site, 1 rearrange site  
var ws;
var scaleRatio, degree;
var imgAdjust = false;
var textOutput = "";
var textOutputUpper = document.getElementById('textOutputUpper');
var start = false;
var keyIndex = new Array();
var inQWERTY = false;
var defaultLayoutObj = {
    "layout": [{
        "x": 65,
        "y": 184,
        "voronoiId": 9,
        "key": "Q"
    }, {
        "x": 153,
        "y": 117,
        "voronoiId": 0,
        "key": "W"
    }, {
        "x": 242,
        "y": 169,
        "voronoiId": 7,
        "key": "E"
    }, {
        "x": 345,
        "y": 177,
        "voronoiId": 8,
        "key": "R"
    }, {
        "x": 456,
        "y": 149,
        "voronoiId": 6,
        "key": "T"
    }, {
        "x": 545,
        "y": 138,
        "voronoiId": 5,
        "key": "Y"
    }, {
        "x": 616,
        "y": 129,
        "voronoiId": 3,
        "key": "U"
    }, {
        "x": 678,
        "y": 132,
        "voronoiId": 4,
        "key": "I"
    }, {
        "x": 730,
        "y": 125,
        "voronoiId": 1,
        "key": "O"
    }, {
        "x": 801,
        "y": 126,
        "voronoiId": 2,
        "key": "P"
    }, {
        "x": 106,
        "y": 326,
        "voronoiId": 19,
        "key": "A"
    }, {
        "x": 240,
        "y": 317,
        "voronoiId": 17,
        "key": "S"
    }, {
        "x": 345,
        "y": 310,
        "voronoiId": 16,
        "key": "D"
    }, {
        "x": 473,
        "y": 257,
        "voronoiId": 15,
        "key": "F"
    }, {
        "x": 592,
        "y": 241,
        "voronoiId": 14,
        "key": "G"
    }, {
        "x": 678,
        "y": 229,
        "voronoiId": 13,
        "key": "H"
    }, {
        "x": 746,
        "y": 226,
        "voronoiId": 12,
        "key": "J"
    }, {
        "x": 806,
        "y": 218,
        "voronoiId": 11,
        "key": "K"
    }, {
        "x": 885,
        "y": 216,
        "voronoiId": 10,
        "key": "L"
    }, {
        "x": 104,
        "y": 468,
        "voronoiId": 27,
        "key": "Z"
    }, {
        "x": 474,
        "y": 353,
        "voronoiId": 23,
        "key": "X"
    }, {
        "x": 576,
        "y": 356,
        "voronoiId": 24,
        "key": "C"
    }, {
        "x": 645,
        "y": 348,
        "voronoiId": 22,
        "key": "V"
    }, {
        "x": 704,
        "y": 338,
        "voronoiId": 21,
        "key": "B"
    }, {
        "x": 761,
        "y": 333,
        "voronoiId": 20,
        "key": "N"
    }, {
        "x": 846,
        "y": 317,
        "voronoiId": 18,
        "key": "M"
    }, {
        "x": 240,
        "y": 464,
        "voronoiId": 26,
        "key": "space"
    }, {
        "x": 402,
        "y": 458,
        "voronoiId": 25,
        "key": "delete"
    }]
};

var QWERTYlayout = {
    Q: {
        "leftUp": {
            "x": null,
            "y": null
        },
        "rightUp": {
            "x": null,
            "y": null
        },
        "leftDown": {
            "x": null,
            "y": null
        },
        "rightDown": {
            "x": null,
            "y": null
        }
    },
    W: {
        "leftUp": {
            "x": null,
            "y": null
        },
        "rightUp": {
            "x": null,
            "y": null
        },
        "leftDown": {
            "x": null,
            "y": null
        },
        "rightDown": {
            "x": null,
            "y": null
        }
    },
    E: {
        "leftUp": {
            "x": null,
            "y": null
        },
        "rightUp": {
            "x": null,
            "y": null
        },
        "leftDown": {
            "x": null,
            "y": null
        },
        "rightDown": {
            "x": null,
            "y": null
        }
    },
    R: {
        "leftUp": {
            "x": null,
            "y": null
        },
        "rightUp": {
            "x": null,
            "y": null
        },
        "leftDown": {
            "x": null,
            "y": null
        },
        "rightDown": {
            "x": null,
            "y": null
        }
    },
    T: {
        "leftUp": {
            "x": null,
            "y": null
        },
        "rightUp": {
            "x": null,
            "y": null
        },
        "leftDown": {
            "x": null,
            "y": null
        },
        "rightDown": {
            "x": null,
            "y": null
        }
    },
    Y: {
        "leftUp": {
            "x": null,
            "y": null
        },
        "rightUp": {
            "x": null,
            "y": null
        },
        "leftDown": {
            "x": null,
            "y": null
        },
        "rightDown": {
            "x": null,
            "y": null
        }
    },
    U: {
        "leftUp": {
            "x": null,
            "y": null
        },
        "rightUp": {
            "x": null,
            "y": null
        },
        "leftDown": {
            "x": null,
            "y": null
        },
        "rightDown": {
            "x": null,
            "y": null
        }
    },
    I: {
        "leftUp": {
            "x": null,
            "y": null
        },
        "rightUp": {
            "x": null,
            "y": null
        },
        "leftDown": {
            "x": null,
            "y": null
        },
        "rightDown": {
            "x": null,
            "y": null
        }
    },
    O: {
        "leftUp": {
            "x": null,
            "y": null
        },
        "rightUp": {
            "x": null,
            "y": null
        },
        "leftDown": {
            "x": null,
            "y": null
        },
        "rightDown": {
            "x": null,
            "y": null
        }
    },
    P: {
        "leftUp": {
            "x": null,
            "y": null
        },
        "rightUp": {
            "x": null,
            "y": null
        },
        "leftDown": {
            "x": null,
            "y": null
        },
        "rightDown": {
            "x": null,
            "y": null
        }
    },
    A: {
        "leftUp": {
            "x": null,
            "y": null
        },
        "rightUp": {
            "x": null,
            "y": null
        },
        "leftDown": {
            "x": null,
            "y": null
        },
        "rightDown": {
            "x": null,
            "y": null
        }
    },
    S: {
        "leftUp": {
            "x": null,
            "y": null
        },
        "rightUp": {
            "x": null,
            "y": null
        },
        "leftDown": {
            "x": null,
            "y": null
        },
        "rightDown": {
            "x": null,
            "y": null
        }
    },
    D: {
        "leftUp": {
            "x": null,
            "y": null
        },
        "rightUp": {
            "x": null,
            "y": null
        },
        "leftDown": {
            "x": null,
            "y": null
        },
        "rightDown": {
            "x": null,
            "y": null
        }
    },
    F: {
        "leftUp": {
            "x": null,
            "y": null
        },
        "rightUp": {
            "x": null,
            "y": null
        },
        "leftDown": {
            "x": null,
            "y": null
        },
        "rightDown": {
            "x": null,
            "y": null
        }
    },
    G: {
        "leftUp": {
            "x": null,
            "y": null
        },
        "rightUp": {
            "x": null,
            "y": null
        },
        "leftDown": {
            "x": null,
            "y": null
        },
        "rightDown": {
            "x": null,
            "y": null
        }
    },
    H: {
        "leftUp": {
            "x": null,
            "y": null
        },
        "rightUp": {
            "x": null,
            "y": null
        },
        "leftDown": {
            "x": null,
            "y": null
        },
        "rightDown": {
            "x": null,
            "y": null
        }
    },
    J: {
        "leftUp": {
            "x": null,
            "y": null
        },
        "rightUp": {
            "x": null,
            "y": null
        },
        "leftDown": {
            "x": null,
            "y": null
        },
        "rightDown": {
            "x": null,
            "y": null
        }
    },
    K: {
        "leftUp": {
            "x": null,
            "y": null
        },
        "rightUp": {
            "x": null,
            "y": null
        },
        "leftDown": {
            "x": null,
            "y": null
        },
        "rightDown": {
            "x": null,
            "y": null
        }
    },
    L: {
        "leftUp": {
            "x": null,
            "y": null
        },
        "rightUp": {
            "x": null,
            "y": null
        },
        "leftDown": {
            "x": null,
            "y": null
        },
        "rightDown": {
            "x": null,
            "y": null
        }
    },
    Z: {
        "leftUp": {
            "x": null,
            "y": null
        },
        "rightUp": {
            "x": null,
            "y": null
        },
        "leftDown": {
            "x": null,
            "y": null
        },
        "rightDown": {
            "x": null,
            "y": null
        }
    },
    X: {
        "leftUp": {
            "x": null,
            "y": null
        },
        "rightUp": {
            "x": null,
            "y": null
        },
        "leftDown": {
            "x": null,
            "y": null
        },
        "rightDown": {
            "x": null,
            "y": null
        }
    },
    C: {
        "leftUp": {
            "x": null,
            "y": null
        },
        "rightUp": {
            "x": null,
            "y": null
        },
        "leftDown": {
            "x": null,
            "y": null
        },
        "rightDown": {
            "x": null,
            "y": null
        }
    },
    V: {
        "leftUp": {
            "x": null,
            "y": null
        },
        "rightUp": {
            "x": null,
            "y": null
        },
        "leftDown": {
            "x": null,
            "y": null
        },
        "rightDown": {
            "x": null,
            "y": null
        }
    },
    B: {
        "leftUp": {
            "x": null,
            "y": null
        },
        "rightUp": {
            "x": null,
            "y": null
        },
        "leftDown": {
            "x": null,
            "y": null
        },
        "rightDown": {
            "x": null,
            "y": null
        }
    },
    N: {
        "leftUp": {
            "x": null,
            "y": null
        },
        "rightUp": {
            "x": null,
            "y": null
        },
        "leftDown": {
            "x": null,
            "y": null
        },
        "rightDown": {
            "x": null,
            "y": null
        }
    },
    M: {
        "leftUp": {
            "x": null,
            "y": null
        },
        "rightUp": {
            "x": null,
            "y": null
        },
        "leftDown": {
            "x": null,
            "y": null
        },
        "rightDown": {
            "x": null,
            "y": null
        }
    },
    space: {
        "leftUp": {
            "x": null,
            "y": null
        },
        "rightUp": {
            "x": null,
            "y": null
        },
        "leftDown": {
            "x": null,
            "y": null
        },
        "rightDown": {
            "x": null,
            "y": null
        }
    },
    delete: {
        "leftUp": {
            "x": null,
            "y": null
        },
        "rightUp": {
            "x": null,
            "y": null
        },
        "leftDown": {
            "x": null,
            "y": null
        },
        "rightDown": {
            "x": null,
            "y": null
        }
    }
};
//
//var socket = io.connect('http://192.168.1.91:1338');
//
//socket.on('broadcast', function (data) {
//		console.log(data);
//	});

if ("WebSocket" in window) {
    ws = new WebSocket("ws://localhost:8080");
    ws.onopen = function () {
        // Web Socket is connected, send data using send()
    };
    ws.onmessage = function (evt) {
        var received_msg = evt.data;
        console.log(received_msg);
        var received_msg_obj = JSON.parse(received_msg);
        switch (received_msg_obj.action) {
        case "loadLayout":
            ctx1.clearRect(0, 0, canvas.width, canvas.height);
            if (imgAdjust == false) {
                scale(img, received_msg_obj.scaleRatio);
                rotate(img, received_msg_obj.startX * received_msg_obj.scaleRatio, received_msg_obj.startY * received_msg_obj.scaleRatio, (-1) * (received_msg_obj.degree - 90));
                move(img, (-1) * (received_msg_obj.startX * received_msg_obj.scaleRatio - IF.startX), (-1) * (received_msg_obj.startY * received_msg_obj.scaleRatio - IF.startY));
                imgAdjust = true;
            }
            if (document.getElementById('voronoiCanvas') == null) {
                insertCanvas('voronoiCanvas');
                Voronoi.init();
            }
            Voronoi.sites = received_msg_obj.layout;
            Voronoi.diagram = Voronoi.voronoi.compute(Voronoi.sites, Voronoi.bbox);
            console.log(Voronoi.sites);
            Voronoi.render();
            for (var i = 0; i < Voronoi.sites.length; i++) {
                Voronoi.writeKeyName(Voronoi.sites[i].key, Voronoi.sites[i].x, Voronoi.sites[i].y);
            }
            break;
        case "ViconData":
            //                textOutput += received_msg_obj.key;
            //                received_msg_obj.x;
            //                received_msg_obj.y;
            //                received_msg_obj.lift;
            //                
            //                textOutputElement.innerHTML = textOutput;
            if (start) {
                setCursor(received_msg_obj.x, received_msg_obj.y);
                Voronoi.highlight(keyIndex[received_msg_obj.key]);
                if (received_msg_obj.lift == true) {
                    textOutput = textOutput.replace("|", '');
                    if (received_msg_obj.key == "space") {
                        textOutput += " ";
                    } else if (received_msg_obj.key == "delete") {
                        textOutput = textOutput.substring(0, textOutput.length - 1);
                    } else {
                        textOutput += received_msg_obj.key;
                    }
                    textOutput += "|";
                    textOutputUpper.innerHTML = textOutput;
                }
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


document.getElementById('myCanvas').addEventListener('mousemove', function (event) {
    mousePos = getMousePos(canvas, event);
    var message = 'Mouse position: ' + mousePos.x + ',' + mousePos.y;
    //        writeMessage(canvas, message);

    console.log(message);
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

document.getElementById('loadDefault').addEventListener('click', function (event) {
    inQWERTY = false;
    ctx1.clearRect(0, 0, canvas.width, canvas.height);
    Voronoi.sites = defaultLayoutObj.layout;
    Voronoi.diagram = Voronoi.voronoi.compute(Voronoi.sites, Voronoi.bbox);
    Voronoi.render();
    for (var i = 0; i < Voronoi.sites.length; i++) {
        Voronoi.writeKeyName(Voronoi.sites[i].key, Voronoi.sites[i].x, Voronoi.sites[i].y);
    }
});

document.getElementById('setName').addEventListener('click', function (event) {
    var nameObj = new Object();
    nameObj.action = "setName";
    nameObj.userName = document.getElementById('userName').value;
    ws.send(JSON.stringify(nameObj));
});

document.getElementById('setKey').addEventListener('click', function (event) {
    Voronoi.writeKeyName(document.getElementById('keyName').value, lastMousePos.x, lastMousePos.y);

});

document.getElementById('setMode').addEventListener('click', function (event) {
    if (document.getElementById('modeSelect').value == 'add') {
        mode = 0;
    } else if (document.getElementById('modeSelect').value == 'rearrange') {
        mode = 1;
    } else if (document.getElementById('modeSelect').value == 'test') {
        document.getElementById('voronoiCanvas').onmousemove = function () {
            var ViconDataObj = new Object();
            ViconDataObj.action = "ViconData";
            ViconDataObj.x = window.event.clientX;
            ViconDataObj.y = window.event.clientY;
            ViconDataObj.key = Voronoi.sites[Voronoi.getWhichCell(window.event.clientX, window.event.clientY)].key;
            ViconDataObj.lift = false;
            ws.send(JSON.stringify(ViconDataObj));
        };
        document.getElementById('voronoiCanvas').onclick = function () {
            var ViconDataObj = new Object();
            ViconDataObj.action = "ViconData";
            ViconDataObj.x = window.event.clientX;
            ViconDataObj.y = window.event.clientY;
            if(inQWERTY == false){
                ViconDataObj.key = Voronoi.sites[Voronoi.getWhichCell(window.event.clientX, window.event.clientY)].key;
            }else{
                
            }
            ViconDataObj.lift = true;
            ws.send(JSON.stringify(ViconDataObj));
        }
    }

});


document.getElementById('save').addEventListener('click', function (event) {
    var layoutObj = new Object();
    layoutObj.layout = Voronoi.sites;
    layoutObj.action = "saveLayout";
    layoutObj.startX = IFimg.startX;
    layoutObj.startY = IFimg.startY;
    layoutObj.endX = IFimg.endX;
    layoutObj.endY = IFimg.endY;
    layoutObj.scaleRatio = scaleRatio;
    layoutObj.degree = degree;
    ws.send(JSON.stringify(layoutObj));
});

document.getElementById('load').addEventListener('click', function (event) {
    inQWERTY = false;
    var loadObj = new Object();
    loadObj.action = "loadLayout";
    ws.send(JSON.stringify(loadObj));
});

document.getElementById('startBtn').addEventListener('click', function (event) {
    start = !start;
    if (start == true) {
        buildKeyIndex();
        if (document.getElementById('highlightCanvas') == null) {
            insertCanvas('highlightCanvas');
        }
        highlightCanvas = document.getElementById("highlightCanvas");
        highlightCtx = highlightCanvas.getContext("2d");
        this.innerHTML = "stop";
    } else {
        this.innerHTML = "start";
    }
});

document.getElementById('setSentence').addEventListener('click', function (event) {
    document.getElementById('textOutputUpper').innerHTML = "";
    textOutput = "";
    var sentence = document.getElementById('sentence').value;
    document.getElementById('textOutputLower').innerHTML = sentence;
    var sentenceObj = new Object();
    sentenceObj.action = "sentence"
    sentenceObj.sentence = sentence;
    ws.send(sentenceObj);
});

document.getElementById('QWERTY').addEventListener('click', function (event) {
    inQWERTY = true;
    ctx1.clearRect(0, 0, canvas.width, canvas.height);
    if (Voronoi.canvas != null) {
        Voronoi.ctx.clearRect(0, 0, Voronoi.canvas.width, Voronoi.canvas.height);
    }
    var QWERTYcanvas = document.getElementById('QWERTYcanvas');
    if (QWERTYcanvas == null) {
        insertCanvas('QWERTYcanvas');
        QWERTYcanvas = document.getElementById('QWERTYcanvas');
    } else {
        QWERTYctx = QWERTYcanvas.getContext("2d");
        QWERTYctx.clearRect(0, 0, QWERTYcanvas.width, QWERTYcanvas.height);
    }

    var QWERTYctx = QWERTYcanvas.getContext("2d");
    QWERTYctx.globalAlpha = 0.5;
    QWERTYctx.strokeStyle = '#000';

    generateQWERTYlayout();
    for(var key in QWERTYlayout){
        QWERTYctx.moveTo(QWERTYlayout[key].leftUp.x, QWERTYlayout[key].leftUp.y);
        console.log('leftupx '+QWERTYlayout[key].leftUp.x+' leftupy '+QWERTYlayout[key].leftUp.y);
        QWERTYctx.lineTo(QWERTYlayout[key].rightUp.x, QWERTYlayout[key].rightUp.y);
        console.log('rightupx '+QWERTYlayout[key].rightUp.x+' rightupy '+QWERTYlayout[key].rightUp.y);
        QWERTYctx.moveTo(QWERTYlayout[key].rightUp.x, QWERTYlayout[key].rightUp.y);
        QWERTYctx.lineTo(QWERTYlayout[key].rightDown.x, QWERTYlayout[key].rightDown.y);
        QWERTYctx.moveTo(QWERTYlayout[key].rightDown.x, QWERTYlayout[key].rightDown.y);
        QWERTYctx.lineTo(QWERTYlayout[key].leftDown.x, QWERTYlayout[key].leftDown.y);
        QWERTYctx.moveTo(QWERTYlayout[key].leftDown.x, QWERTYlayout[key].leftDown.y);
        QWERTYctx.lineTo(QWERTYlayout[key].leftUp.x, QWERTYlayout[key].leftUp.y);
        QWERTYctx.stroke();
        QWERTYctx.globalAlpha = 1;
        QWERTYctx.clearRect(QWERTYlayout[key].center.x - 5, QWERTYlayout[key].center.y - 5, 10, 10);
        QWERTYctx.font = '30pt Calibri';
        if(key == "space" || key == "delete"){
            QWERTYctx.font = '15pt Calibri';
        }
        QWERTYctx.fillStyle = '#00FF00';
        QWERTYctx.fillText(key, QWERTYlayout[key].center.x - 10, QWERTYlayout[key].center.y + 10);
    }
    
    
});

document.getElementById('dumpQWERTY').addEventListener('click', function (event) {
    var dumpQWERTYObj = new Object();
    dumpQWERTYObj.action = "dumpQWERTY";
    dumpQWERTYObj.QWERTY = new Object();
    dumpQWERTYObj.center = new Object();
    
    for(var key in QWERTYlayout){
        var vertices = new Array();
        var pointObj = new Object();
        pointObj.x = QWERTYlayout[key].leftUp.x;
        pointObj.y = QWERTYlayout[key].leftUp.y;
        vertices.push(pointObj);
        pointObj = new Object();
        pointObj.x = QWERTYlayout[key].leftDown.x;
        pointObj.y = QWERTYlayout[key].leftDown.y;
        vertices.push(pointObj);
        pointObj = new Object();
        pointObj.x = QWERTYlayout[key].rightUp.x;
        pointObj.y = QWERTYlayout[key].rightUp.y;
        vertices.push(pointObj);
        pointObj = new Object();
        pointObj.x = QWERTYlayout[key].rightDown.x;
        pointObj.y = QWERTYlayout[key].rightDown.y;
        vertices.push(pointObj);
        var centerObj = new Object();
        centerObj.x = QWERTYlayout[key].center.x;
        centerObj.y = QWERTYlayout[key].center.y;
        dumpQWERTYObj.QWERTY[key] = vertices;
        dumpQWERTYObj.center[key] = centerObj;
    }
    console.log(dumpQWERTYObj);
});

document.getElementById('dumpVertices').addEventListener('click', function (event) {
    var dumpVerticesObj = new Object();
    dumpVerticesObj.action = "dumpVertices";
    dumpVerticesObj.voronoi = new Object();
    dumpVerticesObj.center = new Object();
    
    for(var i=0; i<Voronoi.diagram.cells.length; i++){
        var vertices = new Array();
        for(var j=0; j<Voronoi.diagram.cells[i].halfedges.length; j++){
            vertices.push(Voronoi.diagram.cells[i].halfedges[j].getEndpoint());
        }
        dumpVerticesObj.voronoi[Voronoi.diagram.cells[i].site.key] = vertices;
        var centerObj = new Object();
        centerObj.x = Voronoi.diagram.cells[i].site.x;
        centerObj.y = Voronoi.diagram.cells[i].site.y;
        dumpVerticesObj.center[Voronoi.diagram.cells[i].site.key] = centerObj;
    }
    console.log(dumpVerticesObj);
    ws.send(JSON.stringify(dumpVerticesObj));
});

function generateQWERTYlayout() {
    var count = 0;
    for (var key in QWERTYlayout) {
        if (count < 10) {
            QWERTYlayout[key].leftUp.x = leftUp.x + (rightUp.x - leftUp.x) / 10 * count;
            QWERTYlayout[key].leftUp.y = leftUp.y;
            QWERTYlayout[key].rightUp.x = leftUp.x + (rightUp.x - leftUp.x) / 10 * (count + 1);
            QWERTYlayout[key].rightUp.y = rightUp.y;
            QWERTYlayout[key].leftDown.x = QWERTYlayout[key].leftUp.x;
            QWERTYlayout[key].leftDown.y = leftUp.y + (leftDown.y - leftUp.y) / 3;
            QWERTYlayout[key].rightDown.x = QWERTYlayout[key].rightUp.x;
            QWERTYlayout[key].rightDown.y = leftUp.y + (leftDown.y - leftUp.y) / 3;
        }else if(count >= 10 && count < 19){
            QWERTYlayout[key].leftUp.x = leftUp.x + (rightUp.x - leftUp.x) / 9 * (count - 10);
            QWERTYlayout[key].leftUp.y = leftUp.y + (leftDown.y - leftUp.y) / 3;
            QWERTYlayout[key].rightUp.x = leftUp.x + (rightUp.x - leftUp.x) / 9 * (count - 10 + 1);
            QWERTYlayout[key].rightUp.y = leftUp.y + (leftDown.y - leftUp.y) / 3;
            QWERTYlayout[key].leftDown.x = QWERTYlayout[key].leftUp.x;
            QWERTYlayout[key].leftDown.y = leftUp.y + (leftDown.y - leftUp.y) * 2 / 3;
            QWERTYlayout[key].rightDown.x = QWERTYlayout[key].rightUp.x;
            QWERTYlayout[key].rightDown.y = leftUp.y + (leftDown.y - leftUp.y) * 2 / 3;
        }else{
            QWERTYlayout[key].leftUp.x = leftUp.x + (rightUp.x - leftUp.x) / 9 * (count - 19);
            QWERTYlayout[key].leftUp.y = leftUp.y + (leftDown.y - leftUp.y) * 2 / 3;
            QWERTYlayout[key].rightUp.x = leftUp.x + (rightUp.x - leftUp.x) / 9 * (count - 19 + 1);
            QWERTYlayout[key].rightUp.y = leftUp.y + (leftDown.y - leftUp.y) * 2 / 3;
            QWERTYlayout[key].leftDown.x = QWERTYlayout[key].leftUp.x;
            QWERTYlayout[key].leftDown.y = leftDown.y;
            QWERTYlayout[key].rightDown.x = QWERTYlayout[key].rightUp.x;
            QWERTYlayout[key].rightDown.y = leftDown.y;
        }
        var center = new Object();
        center.x = (QWERTYlayout[key].leftUp.x + QWERTYlayout[key].rightUp.x) / 2;
        center.y = (QWERTYlayout[key].leftUp.y + QWERTYlayout[key].leftDown.y) / 2;
        QWERTYlayout[key].center = center;
        count++;
    }
    console.log(QWERTYlayout);
}

function buildKeyIndex() {
    keyIndex = new Array();
    for (var i = 0; i < Voronoi.sites.length; i++) {
        keyIndex[Voronoi.sites[i].key] = i;
    }
}

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
        degree = Math.atan2(deltaY, deltaX) / Math.PI * 180;
        scaleRatio = lineDistance(IF.startX, IF.startY, IF.endX, IF.endY) / lineDistance(IFimg.startX, IFimg.startY, IFimg.endX, IFimg.endY);
        scale(img, scaleRatio);
        rotate(img, IFimg.startX * scaleRatio, IFimg.startY * scaleRatio, (-1) * (degree - 90));
        move(img, (-1) * (IFimg.startX * scaleRatio - IF.startX), (-1) * (IFimg.startY * scaleRatio - IF.startY));
        imgAdjust = true;
        currentKey = 0;
        //        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx1.fillStyle = "#00FF00";
        ctx1.fillRect(IF.startX, IF.startY, 8, 8);
        ctx1.fillRect(IF.endX, IF.endY, 8, 8);
    } else if (currentKey == 52) {
        ctx1.clearRect(0, 0, canvas.width, canvas.height);
        insertCanvas('voronoiCanvas');
        Voronoi.init();
        currentKey = 0;
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

function insertCanvas(id) {
    var newCanvas = document.createElement("canvas");
    newCanvas.setAttribute("id", id);
    newCanvas.setAttribute("style", "cursor:crosshair");
    newCanvas.setAttribute("width", "980");
    newCanvas.setAttribute("height", "551");
    insertAfter(document.getElementById("myCanvas"), newCanvas);
}

function setCursor(x, y) {
    var cursor = document.getElementById('cursor');
    cursor.style['top'] = y + 'px';
    cursor.style['left'] = x + 'px';
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
                var oldX = me.sites[cellIndex].x,
                    oldY = me.sites[cellIndex].y;
                me.sites.splice(cellIndex, 1);
                me.addSite(mouse.x, mouse.y);
                me.sites[me.sites.length - 1].key = key;
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

    clearKeyName: function (x, y) {
        ctx1.clearRect(x - 20, y - 20, 45, 45);
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
        //        var sites = this.sites,
        //            nSites = sites.length;
        //        if (!nSites) {
        //            return;
        //        }
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
        //        var site;
        //        ctx.beginPath();
        //        ctx.fillStyle = '#44f';
        //
        //        ctx.fill();
    },

    highlight: function (cellIndex) {
        ctx = highlightCtx;
        ctx.clearRect(0, 0, highlightCanvas.width, highlightCanvas.height);
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