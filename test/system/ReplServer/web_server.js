const net = require('net');
const repl = require('repl');
const http = require('http');
const ws = require('ws');


const prefix = "> ";

/* repl(tcp) server create */
net.createServer(function (socket) {
  repl.start(prefix, socket);
}).listen(5001, "localhost");

/* http(websocket) server create */
const server = http.createServer(function(req, res){});
server.listen(5002, function(){});
new ws.Server({server: server}).on('connection', function(wso, req){

  /* repl(tcp) server connect */
  client = net.connect(5001, 'localhost', function(){});

  /* websocket events */
  wso.on('message', async function(m){
    client.write(m+"\n");
  });
  wso.on('close', async function(){
    console.log('I lost a client');
  });

  /* repl(tcp) events */
  client.on('data', function (data) {
    let res = (''+data).split("\n");
    let output_prefix = res.pop(); // prefixがおかしいので一時修正
    console.log(output_prefix, output_prefix=='> > ');
    output_prefix=='> > ' ? res.push(prefix) : res.push(output_prefix);
    wso.send(res.join("\n"));
  });

  // client.on('close', function () {
  //   console.log('connection is closed');
  // });
  //
  // client.on('error', function () {
  //   console.log('made error');
  // });
});
