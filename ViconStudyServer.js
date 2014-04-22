var fs = require('fs');
var filepath = '\/Volumes\/RamDisk\/';
var WebSocketServer = require('ws').Server,
    wss = new WebSocketServer({
        port: 8080
    });
var savedLayout;
var userName;
var calibrateOrder = ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P', 'A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', 'space', 'delete'];
//var io = require('socket.io-client');
//var socket = io.connect('http://192.168.1.91:1338');
//socket.on('connect', function(){
//  socket.emit('broadcast', "test");
//    console.log("test");
//});
//socket.on('broadcast', function (data) {
//		         console.log(data);
//			    // socket.emit('my other event', { my: 'data' });
//			      });

wss.on('connection', function (ws) {
    ws.on('message', function (message) {
        console.log('received: %s', message);
        try {
            var message_obj = JSON.parse(message);
            switch (message_obj.action) {
            case "saveLayout":
                savedLayout = message_obj.layout;
                writeToFile(message, filepath + userName + ".txt");
                break;
            case "setHand":
                var layoutObj = new Object();
                try {
                    layoutObj = JSON.parse(fs.readFileSync(filepath + userName + ".txt").toString());
                } catch (e) {
                    console.log(e);
                }
                layoutObj.action = "setHand";
                wss.broadcast(JSON.stringify(layoutObj));
                //                ws.send(JSON.stringify(layoutObj));
                break;
            case "loadLayout":
                var layoutObj = new Object();
                try {
                    layoutObj = JSON.parse(fs.readFileSync(filepath + userName + ".txt").toString());
                } catch (e) {
                    console.log(e);
                }
                layoutObj.action = "loadLayout";
                wss.broadcast(JSON.stringify(layoutObj));
                //                ws.send(JSON.stringify(layoutObj));
                break;
            case "setName":
                userName = message_obj.userName;
                wss.broadcast(message);
                console.log(userName);
                break;
            case "ViconData":
                wss.broadcast(message);
                break;
            case "dumpVertices":
                wss.broadcast(message);
                break;
            case "dumpQWERTY":
                wss.broadcast(message);
                    writeToFile('', '\/Volumes\/RamDisk\/calibrateOrder.txt');
                for (var i = 0; i < calibrateOrder.length; i++) {
                    var line = message_obj.center[calibrateOrder[i]].x + ',' + message_obj.center[calibrateOrder[i]].y + '\n';
                    appendToFile(line, '\/Volumes\/RamDisk\/calibrateOrder.txt');
                }
                break;
            case "sentence":
                wss.broadcast(message);
                break;
            case "whichLayout":
                wss.broadcast(message);
                break;
            case "TouchPadData":
                wss.broadcast(message);
                break;
            case "loadQWERTY":
                wss.broadcast(message);
                break;
            default:
            }
        } catch (err) {
            // handle the error safely
            console.log(err);
        }

    });

});

wss.broadcast = function (data) {
    for (var i in this.clients) {
        this.clients[i].send(data);
    }
};


function writeToFile(data, filepath) {
    fs.writeFileSync(filepath, data);
}

function appendToFile(data, filepath) {
    fs.appendFileSync(filepath, data);
}