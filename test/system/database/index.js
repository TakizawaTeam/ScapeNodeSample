console.log(`run index`);

const fs = require('fs');
const {promisify} = require('util');

// install
const stat = async path=>await promisify(fs.stat)(path).catch(()=>null);
const status = async paths=>{
  if(!paths.length) return [];
  return await Promise.all(paths.map( async p=>await stat(p) ));
}
const install_check = async ()=>{
  const paths = ['db','db/meta','db/data'];
  return (await status(paths)).every(v=>v);
}

const mkdir = async path=>await promisify(fs.mkdir)(path).catch(()=>null);
const rmdir = async path=>await promisify(fs.rm)(path,{recursive:true,force:true}).catch(()=>null);
const mkfile = async (path,content='')=>await promisify(fs.writeFile)(path,content).catch(()=>null);
const catfile = async path=>await promisify(fs.readFile)(path).catch(()=>null);
const install = async ()=>{
  if( !(await stat('db')) ) await rmdir('db');
  complete_flags = [];
  complete_flags.push(await mkdir('db'));
  complete_flags.push(await mkdir('db/meta'));
  complete_flags.push(await mkdir('db/data'));
  complete_flags.push(await mkfile('db/meta/config.json', JSON.stringify({
    workspace:{
      hash: '',
      name: '',
      garden: '',
      tree: '',
    },
    branch:{
      hash: '',
      key: '',
      value: '',
      parent: '',
    },
  }) );
  complete_flags.push(await mkfile('db/meta/workspace.json'));
  complete_flags.push(await mkfile('db/meta/tree.json'));
  const complete = complete_flags.every(v=>(typeof v === "undefined"));
  return console.log(`install ${complete ? 'complete' : 'error'}`);
}

// main
(async ()=>{
  if(!await install_check()){
    await install();
    console.log(`repair database core complete!`);
  }
  console.log(`end index`);
})();
