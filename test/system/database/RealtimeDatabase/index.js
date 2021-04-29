const http = require('http');
const ws = require('ws');

let dictionary = '';
// const 分解 = ()=>{};
// const 構築 = ()=>{};

const server = http.createServer(function(req, res){});
server.listen(5002, function(){});
new ws.Server({server: server}).on('connection', function(wso, req){
  wso.on('message', async function(m){
    keys = dictionary.split("\n");
    if(m.length!=0){
      m.split("").reduce((pre,curr)=>{
        key = `${pre} ${curr}`;
        if(keys.indexOf(key) == -1) dictionary += `${key}\n`;
        return curr;
      });
    }
    console.log(dictionary);
    wso.send(`再送信：${m}`);
  });
  wso.on('open', async function(){
    console.log('open ws!');
  });
  wso.on('close', async function(){
    console.log('close ws!');
  });
});
