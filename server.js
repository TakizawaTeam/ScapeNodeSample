const http = require('http');
const fs = require('fs');
const ws = require('ws');
const exec = require('child_process').exec;

const config = {
  server: {
    ip: '',
    port: 2222,
    index: 'server.html',
  },
};

// return: string for stdout or stderr
const exec_func = async function(_command){
  return new Promise((res, rej) => {
    try{
      const result = exec(_command, (err, stdout, stderr) => {
        if(err){ res(stderr); }
        else{ res(stdout); }
      });
    }catch(err){
      //res(`${err.name}: ${err.message}${"\n"}`);
      res("");
    }
  });
};
// return: string for result
const eval_func = async function(_code){
  return new Promise((res, rej) => {
    try{ res( eval(_code) ); }
    catch(err){ res(`${err.name}: ${err.message}`); }
  });
};

// create http server
const sc = config.server;
const server = http.createServer(function(req, res) {
  fs.readFile(`./${sc.index}`, 'utf-8', function(err, data) {
    res.writeHead(200, {'content-type': 'text/html'});
    res.write(data);
    res.end();
  });
});
server.listen(sc.port, function() {
  console.log(`Listening on ${sc.port}`);
});

// create websocket server
new ws.Server({server: server}).on('connection', function(wso, req){
  console.log((new Date()) + ' Peer ' + req.connection.remoteAddress + ' connected.');

  let get_result = async function(m){return "404not found!"};
  if(req.url == "/echo"){
    get_result = async m=>m;
  }else if(req.url == "/exec"){
    get_result = async function(m){
      return await exec_func(m);
    };
  }else if(req.url == "/eval"){
    get_result = async function(m){
      const result = await eval_func(m);
      return result;
    };
  }else{}

  wso.on('message', async function(m){
    wso.send(await get_result(m));
  });
  wso.on('close', async function(){
    console.log('I lost a client');
  });
});
