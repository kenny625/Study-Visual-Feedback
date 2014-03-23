var fs = require('fs');
var filepath = '\/Volumes\/RamDisk\/';
var WebSocketServer = require('ws').Server
  , wss = new WebSocketServer({port: 8080});
var savedLayout;
var userName;

wss.on('connection', function(ws) {
    ws.on('message', function(message) {
        console.log('received: %s', message);
        var message_obj = JSON.parse(message);
        switch(message_obj.action){
           case "saveLayout":
                savedLayout = message_obj.layout;
                writeToFile(message);
                break;
            case "loadLayout":
                layoutObj = new Object();
                layoutObj = JSON.parse(fs.readFileSync(filepath + userName + ".txt").toString());
                layoutObj.action = "loadLayout";
                ws.send(JSON.stringify(layoutObj));
                break;
            case "setName":
                userName = message_obj.userName;
                console.log(userName);
                break;
            default:
        }
    });
//    ws.send('something');
    
});


function writeToFile(data) {
    fs.writeFileSync(filepath + userName + ".txt", data);
}

//fs.readFileSync("/Volumes/RamDisk/libsvm-3.17/test2").toString();