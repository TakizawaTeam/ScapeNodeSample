const fs = require('fs');
const http = require('http');
const ws = require('ws');
const net = require('net');
const repl = require('repl');

(async function(conf){
  const APP = await require("./Application.js");
  const Node = await require('./Node.js');

  /*
  * REPL Server
  */
  const repl_config = APP.configs.repl_server;
  net.createServer(function (socket) {
    const repl_server = repl.start(repl_config['prefix'], socket);
    repl_server.context.node = Node;
  }).listen(repl_config['port'], repl_config['server']);



  /* `http://localhost:${http_config['port']}/`
  * HTTP Server
  */
  const http_config = APP.configs.http_server;
  const server = http.createServer(async function(req, res) {

    const base_result = async function(m){
      res.writeHead(200, http_config['page404']['content-type']);
      res.write(`${m} ${http_config['page404']['message']}`);
      res.end();
    };

    let set_result = base_result;
    if(req.url=='/'){}
    else if(req.url=='/test'){}
    else if(req.url=='/workbench'){
      set_result = async function(){
        fs.readFile(http_config['pageWorkbench']['index'], 'utf-8', function(err, data) {
          res.writeHead(200, {'content-type': 'text/html'});
          res.write(data);
          res.end();
        });
      };
    }

    await set_result();
  });
  server.listen(http_config['port'], function(){});

  /* `ws://localhost:${http_config['port']}/`
  * WebSocket server
  */
  const ws_config = APP.configs.ws_server;
  const ws_server = new ws.Server({server: server});
  ws_server.on('connection', function(wso, req){

    let set_result = async function(m){ wso.send(`${m} 404not found!`); };
    let set_close = async function(m){ wso.send(`${m} connection closed!`); };
    if(req.url=='/'){}
    else if(req.url=='/test'){}
    else if(req.url=='/repl'){
      const client = net.connect(repl_config['port'], repl_config['server'], function(){});
      client.on('data', function (data) {
        let res = (''+data).split("\n");
        let output_prefix = res.pop(); // '>'を渡した時prefixがおかしいので一時修正
        output_prefix=='> > ' ? res.push(prefix) : res.push(output_prefix);
        wso.send(res.join("\n"));
      });
      set_result = async function(m){ client.write(m+"\n"); };
      set_close = async function(){};
    }

    wso.on('message', async function(m){ await set_result(m); });
    wso.on('close', async function(){ await set_close(); });
  });
})({

});
