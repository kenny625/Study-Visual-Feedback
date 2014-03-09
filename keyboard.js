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
    //        writeMessa1ge(canvas, message);

    //    console.log(mousePos.x);
}, false);

canvas.addEventListener('click', function (event) {
    if (currentKey == 49) {
        drawPoint(mousePos.x, mousePos.y);
        IFimg.startX = mousePos.x;
        IFimg.startY = mousePos.y;
        console.log("start  " + IFimg.startX + " " + IFimg.startY);
        currentKey = 0;
    } else if (currentKey == 50) {
        drawPoint(mousePos.x, mousePos.y);
        IFimg.endX = mousePos.x;
        IFimg.endY = mousePos.y;
        currentKey = 0;
    } else if (currentKey == 52) {

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