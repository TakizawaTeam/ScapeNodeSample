const http = require('http');
const ws = require('ws');

let obj = {};
let 辞書 = '';
const rnd = n=>Math.floor(Math.random() * n);
const 分解 = m=>{
  if(m.length!=0){
    lines = 辞書.split("\n");
    m.split("").reduce((pre,curr)=>{
      line = `${pre} ${curr}`;
      if(lines.indexOf(line) == -1){
        辞書 += `${line}\n`;
        obj[pre] = curr;
      }
      return curr;
    });
  }
};
const 結合 = ()=>{
  res = '';
  keys = Object.keys(obj);
  if(keys.length!=0){
    key = keys[rnd(keys.length)];
    obj_copy = { ...obj }
    while(true){
      if(!key){break;}else{res += key;}
      _key = obj_copy[key];
      delete obj_copy[key];
      key = _key;
    }
    return res;
  }else{return '';}
};

const server = http.createServer(function(req, res){});
server.listen(5002, function(){});
new ws.Server({server: server}).on('connection', function(wso, req){
  wso.on('message', async function(m){
    console.log(辞書);
    分解(m);
    wso.send(`返事：${結合()}`);
  });
  wso.on('open', async function(){
    console.log('open ws!');
  });
  wso.on('close', async function(){
    console.log('close ws!');
  });
});
