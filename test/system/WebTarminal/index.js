const http = require('http');
const ws = require('ws');
const fs = require('fs');

const app_path = process.cwd();

const server = http.createServer(function(req, res){});
server.listen(5002, function(){});
new ws.Server({server: server}).on('connection', function(wso, req){
  wso.send(`> `);

  wso.on('message', async function(m){
    if(m.length!=0) wso.send(`run ${m} command\n`);
    wso.send(`> `);
  });
  wso.on('close', async function(){
    console.log('close ws!');
  });
});
