console.log(`run index`);

const fs = require('fs');
const {promisify} = require('util');
const http = require('http');

// install
const stat = async path=>await promisify(fs.stat)(path).catch(()=>null);
const status = async paths=>{
  if(!paths.length) return [];
  return await Promise.all(paths.map( async p=>await stat(p) ));
}
const install_check = async ()=>{
  const paths = [
    `${ROOT_FOLDER}/db`,
    `${ROOT_FOLDER}/db/meta`,
    `${ROOT_FOLDER}/db/data`,
  ];
  return (await status(paths)).every(v=>v);
}

const ROOT_FOLDER = __dirname;
const mkdir = async path=>await promisify(fs.mkdir)(path).catch(()=>null);
const rmdir = async path=>await promisify(fs.rm)(path,{recursive:true,force:true}).catch(()=>null);
const mkfile = async (path,content='')=>await promisify(fs.writeFile)(path,content).catch(()=>null);
const catfile = async path=>await promisify(fs.readFile)(path,"utf8").catch(()=>null);
const install = async ()=>{
  if( !(await stat('db')) ) await rmdir('db');
  complete_flags = [];
  complete_flags.push(await mkdir(`${ROOT_FOLDER}/db`));
  complete_flags.push(await mkdir(`${ROOT_FOLDER}/db/meta`));
  complete_flags.push(await mkdir(`${ROOT_FOLDER}/db/data`));
  complete_flags.push(await mkfile(`${ROOT_FOLDER}/db/meta/config.json`, JSON.stringify({
    workspace:{
      garden:{
        hash: '',
        key: '',
        tree: '',
      },
    },
    tree:{
      node:{
        hash: '',
        key: '',
        value: '',
        parent: '',
      },
    },
  }) ));
  complete_flags.push(await mkfile(`${ROOT_FOLDER}/db/meta/workspace.json`));
  complete_flags.push(await mkfile(`${ROOT_FOLDER}/db/meta/tree.json`));

  // TODO: どこで失敗したかログ上でわかるようにしたい...
  const complete = complete_flags.every(v=>(typeof v === "undefined"));
  return console.log(`  install ${complete ? 'complete' : 'error'}`);
}


// command
const Command = process.argv[2];
const CreateHash = (prefix, num)=>{
  var h = '';
  while( h.length<num ) h+="1234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"[parseInt(Math.random()*62)];
  return `${prefix}${h}`;
};

let current = null;
const checkout = async ()=>{
  const str_config = await catfile(`${ROOT_FOLDER}/db/meta/config.json`);
  const config = JSON.parse(str_config);

  let node = config.tree.node;
  node.hash = CreateHash('NodeHash_', 30);
  node.key = 'LocalNode';

  let garden = config.workspace.garden;
  garden.hash = CreateHash('GardenHash_', 30);
  garden.key = 'LocalGarden';
  garden.tree = node.hash;

  current = garden;
};
const create_workspace = async ()=>{ console.log('create_workspace'); };
const read_workspace = async ()=>{ console.log('read_workspace'); };
const update_workspace = async ()=>{ console.log('update_workspace'); };
const delete_workspace = async ()=>{ console.log('delete_workspace'); };

// server
let server = http.createServer();
server.on('request', function(req, res){
    res.write(JSON.stringify(current));
    res.end();
});

// main
(async ()=>{
  if(!await install_check() || Command == 'install'){
    await install();
    await checkout();
    console.log(`  create files! → ${ROOT_FOLDER}/db`);
  }else{
    await checkout();
    if(Command == 'server'){
      console.log(`  listen to http://127.0.0.1:1337`);
      server.listen(1337, '127.0.0.1');
    }
  }
  console.log(`end index`);
})();
