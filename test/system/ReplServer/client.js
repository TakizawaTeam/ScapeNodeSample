var net = require('net');
client = net.connect(5001, 'localhost', function() {
  console.log('connected to server');
});

process.stdin.resume();
process.stdin.on('data', function (data) {
  client.write(data);
});

client.on('data', function (data) {
  console.log('' + data);
});

client.on('close', function () {
  console.log('connection is closed');
});

client.on('error', function () {
  console.log('made error');
});
