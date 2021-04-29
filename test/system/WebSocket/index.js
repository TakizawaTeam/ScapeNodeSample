const http = require('http');
const ws = require('ws');

const server = http.createServer(function(req, res){});
server.listen(5002, function(){});
new ws.Server({server: server}).on('connection', function(wso, req){
  wso.on('message', async function(m){
    console.log(m);
    wso.send(`再送信：${m}`);
  });
  wso.on('open', async function(){
    console.log('open ws!');
  });
  wso.on('close', async function(){
    console.log('close ws!');
  });
});
