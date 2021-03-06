const vm = require('vm');
const fs = require('fs');
const http = require('http');
const ws = require('ws');
const net = require('net');
const repl = require('repl');
const { processTopLevelAwait } = require("node-repl-await");

process.title = 'ScapeNode-0';

(async function(conf){
  const APP = await require("./Application.js");
  const Node = await require('./Node.js');

  /*
  * REPL Server
  */
  const repl_config = APP.configs.repl_server;
  const isRecoverableError = function(error) {
    if (error.name === 'SyntaxError') {
        return /^(Unexpected end of input|Unexpected token)/.test(error.message);
    }
    return false;
  }
  const repl_eval = async function(cmd, context, filename, callback){
    cmd = processTopLevelAwait(cmd) || cmd;

    try {
        let result = await vm.runInNewContext(cmd, context);
        callback(null, result);
    } catch (e) {
        if (isRecoverableError(e)) {
            callback(new repl.Recoverable(e));
        } else {
            console.log(e);
        }
    }
  };
  let repl_server = null;
  net.createServer(function (socket) {
    repl_server = repl.start({
      prompt: repl_config['prefix'],
      input: socket,
      output: socket,
      eval: repl_eval,
    });
    repl_server.context.Node = Node;
  }).listen(repl_config['port'], repl_config['server']);



  /* `http://localhost:${http_config['port']}/`
  * HTTP Server
  */
  const http_config = APP.configs.http_server;
  const http_static = http_config['static'];
  const server = http.createServer(async function(req, res) {

    const base_result = async (m='')=>await APP.html_static(res, `${m} ${http_static['page404']['message']}`);
    let set_result = base_result;

    if(req.url=='/'){}
    else if(req.url=='/test'){}
    else if(req.url=='/workspace'){
      set_result = async function(){
        const data = await APP.read_file( http_static['workspace']['index'] );
        await APP.html_static(res, data);
      };
    }else if(req.url=='/client'){
      set_result = async function(){
        const data = await APP.read_file( http_static['client'] );
        await APP.html_static(res, data, {'content-type': 'text/javascript'});
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
    else if(req.url=='/echo'){ set_result = async function(m){ wso.send(m); }; }
    else if(req.url=='/repl'){
      const client = net.connect(repl_config['port'], repl_config['server'], function(){});
      client.on('data', function (data) {
        let res = (''+data).split("\n");
        let output_prefix = res.pop(); // '>'を渡した時prefixがおかしいので一時修正
        output_prefix=='> > ' ? res.push(repl_config['prefix']) : res.push(output_prefix);
        wso.send(res.join("\n"));
      });
      set_result = async function(m){ client.write(m+"\n"); };
      set_close = async function(){};
    }

    wso.on('message', async function(m){ await set_result(m); });
    wso.on('close', async function(){ await set_close(); });
  });

  console.log(`[start Server http://localhost:${http_config['port']}/workspace]`);
})({

});
