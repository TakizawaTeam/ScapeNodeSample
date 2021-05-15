const path = require("path");
const fs = require('fs').promises;
const Git = require('simple-git/promise');

module.exports = (async function(){
  this.APP = await require("./Application.js");
  this.repo = null;
  this.root = null;
  this.current = null;
  this.one = {
    format: {parent:"",key:"",value:"",created_at:"",updated_at:""},
    model: params=>{
      node = Object.assign(this.one.format, params);
      node.created_at = APP.system_date();
      node.updated_at = APP.system_date();
      return node;
    },
    exist: async _path=>await fs.stat(_path).catch(()=>null),
    create: async obj=>{
      _path = path.resolve(obj.parent, obj.key);
      await fs.mkdir(_path,{recursive:true});
      await fs.writeFile(path.resolve(_path, ".value"),obj.value);
    },
    read: async obj=>{
      node = null;
      _path = path.resolve(obj.parent, obj.key);
      stat = await fs.stat(_path).catch(()=>null);
      if(!!stat){
        value = await fs.readFile(path.join(_path, ".value"), "utf-8").catch(()=>"");
        node = Object.assign(this.one.model, {
          parent: obj.parent,
          key: obj.key,
          value: value,
          created_at: APP.system_date(stat["ctime"]),
          updated_at: APP.system_date(stat["mtime"])
        });
      }
      return node;
    },
    update: async obj=>{},
    delete: async obj=>{}
  };
  this.initialize =  async (_path="Database")=>{
    if(await this.one.exist(_path)) return null;
    await this.one.create(this.one.model({key:_path}));
    this.repo = Git(_path);
    await this.repo.init();
    await this.repo.add('.value');
    await this.repo.addConfig("user.name", "dummy")
    await this.repo.addConfig("user.email", "dummy")
    await this.repo.commit("first commit!");
    this.repo = null;
    return `initialize completed: ${_path}`;
  };
  this.checkout = async (_path="Database")=>{
    if(!await this.one.exist(_path)) return null;
    this.repo = Git(_path);
    this.root = await this.one.read(this.one.model({key:_path}));
    this.current = this.root;
    return this.current;
  };
  this.connect = async callback=>{
    if(!!this.repo) return null;
    try{
      await this.repo.clean("dfx");
      result = await callback();
      await this.repo.add("./*");
      await this.repo.commit("Database commit!");
      return result;
    }catch(e){ await this.repo.clean("dfx"); }
  };
  this.change_node = async function(_path=null){};
  this.stat = async function(_path=null){
    return this.one.format;
  };
  this.childs = async function(_path=null){
    if(!_path) _path = this.current;
    return await fs.readdir(_path);
  };

  // commands
  this.ls = async path=>(await this.childs(path)).join(' ');
  const mk = ()=>{};
  const cn = ()=>{};
  const set = ()=>{};
  const cat = ()=>{};
  const rm = ()=>{};
  const cp = ()=>{};
  const mv = ()=>{};
  const pwd = ()=>{};
  const find = ()=>{};
  const parent = ()=>{};
  const branch = ()=>{};
  const explor = ()=>{};
  const survey = ()=>{};
  return this;
})();
