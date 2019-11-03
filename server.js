const http = require('http');
const ws = require('ws');

const script = `
var ws = new WebSocket("ws:localhost:2222");
ws.onmessage = function(e) { console.log(e.data); }
ws.onopen = function(conn){ console.log("open websocket!"); }
`;
const html = `<script>${script}</script>`;
const html_option = {'content-type': 'text/html', 'content-length': Buffer.byteLength(html)};
const server = http.createServer(function(req, res) { res.writeHead(200, html_option); res.end(html); });
server.listen(2222, function() { console.log("Listening on 2222"); });

new ws.Server({server: server}).on('connection', function(wso, req){
  console.log((new Date()) + ' Peer ' + req.connection.remoteAddress + ' connected.');

  wso.on('message', function(m){ console.log(m); });
  wso.on('close', function(){ console.log('I lost a client'); });
});
