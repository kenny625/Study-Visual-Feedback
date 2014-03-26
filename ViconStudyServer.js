var fs = require('fs');
var filepath = '\/Volumes\/RamDisk\/';
var WebSocketServer = require('ws').Server,
    wss = new WebSocketServer({
        port: 8080
    });
var savedLayout;
var userName;
var io = require('socket.io-client');
var socket = io.connect('http://192.168.1.91:1338');
socket.on('connect', function(){
  socket.emit('broadcast', "test");
    console.log("test");
});
socket.on('broadcast', function (data) {
		         console.log(data);
			    // socket.emit('my other event', { my: 'data' });
			      });

wss.on('connection', function (ws) {
    ws.on('message', function (message) {
        console.log('received: %s', message);
        var message_obj = JSON.parse(message);
        switch (message_obj.action) {
        case "saveLayout":
            savedLayout = message_obj.layout;
            writeToFile(message);
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
            console.log(userName);
            break;
        case "ViconData":
                wss.broadcast(message);
                break;
        default:
        }
    });

});

wss.broadcast = function (data) {
    for (var i in this.clients) {
        this.clients[i].send(data);
    }
};


function writeToFile(data) {
    fs.writeFileSync(filepath + userName + ".txt", data);
}