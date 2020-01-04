var net = require('net');
var repl = require('repl');

console.log('tcp socket[localhost:5001] waiting for...');

net.createServer(function (socket) {
  repl.start("node via TCP socket> ", socket);
}).listen(5001, "localhost");
