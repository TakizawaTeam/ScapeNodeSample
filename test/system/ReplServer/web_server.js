/* repl(tcp) server connect */
const net = require('net');
client = net.connect(5001, 'localhost', function(){});

/* http(websocket) server create */
const http = require('http');
const fs = require('fs');
const ws = require('ws');
const server = http.createServer(function(req, res){});
server.listen(5002, function(){});
new ws.Server({server: server}).on('connection', function(wso, req){

  /* websocket events */
  wso.on('message', async function(m){
    client.write(m+"\n");
  });
  wso.on('close', async function(){
    console.log('I lost a client');
  });

  /* repl(tcp) events */
  client.on('data', function (data) {
    wso.send(''+data);
  });

  client.on('close', function () {
    console.log('connection is closed');
  });

  client.on('error', function () {
    console.log('made error');
  });
});
