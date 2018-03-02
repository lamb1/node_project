var net = require('net');

var chatServer = net.createServer(),
    clientList = [];

chatServer.on('connection', function (client) {
    client.name = client.remoteAddress + ':' + client.remotePort;
    client.write('Hi' + client.name + '!\n');

    clientList.push(client);

    client.on('data', function (data) {
        broadcast(data, client);
    });

});

function broadcast(message, client) {
    for(var i = 0; i < clientList.length; i++){
        if(client !== clientList[i]){
            clientList[i].write(client.name + " says" + message);
        }
    }
}

chatServer.listen(8101, function () {
    console.log('服务器开启成功');
});