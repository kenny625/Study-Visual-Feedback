var fs = require('fs');
var filepath = '\/Volumes\/RamDisk\/';
var WebSocketServer = require('ws').Server
  , wss = new WebSocketServer({port: 8080});
var savedLayout;

wss.on('connection', function(ws) {
    ws.on('message', function(message) {
        console.log('received: %s', message);
        var message_obj = JSON.parse(message);
        switch(message_obj.action){
           case "saveLayout":
                savedLayout = message_obj.layout;
                break;
            case "loadLayout":
                layoutObj = new Object();
                layoutObj.layout = savedLayout;
                layoutObj.action = "loadLayout";
                ws.send(JSON.stringify(layoutObj));
                break;
            default:
        }
    });
//    ws.send('something');
    
});


//function writeToFile(data) {
//    fs.writeFileSync("/Volumes/RamDisk/libsvm-3.17/test2", data);
//}
//
//fs.readFileSync("/Volumes/RamDisk/libsvm-3.17/test2").toString();