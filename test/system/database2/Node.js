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
    list: async _path=>{
      list = await fs.readdir(_path).catch(()=>[]);
      return list.filter(name=>!/^\./.test(name)); //隠しファイルは非表示
    },
    path: node=>path.resolve(node.parent, node.key),
    create: async node=>{
      _path = this.one.path(node);
      await fs.mkdir(_path,{recursive:true});
      await fs.writeFile(path.resolve(_path, ".value"),node.value);
    },
    read: async node=>{
      _path = this.one.path(node);
      stat = await fs.stat(_path).catch(()=>null);
      if(!!stat){
        value = await fs.readFile(path.join(_path, ".value"), "utf-8").catch(()=>"");
        node = Object.assign(this.one.model, {
          parent: node.parent,
          key: node.key,
          value: value,
          created_at: APP.system_date(stat["ctime"]),
          updated_at: APP.system_date(stat["mtime"])
        });
      }
      return node;
    },
    update: async node=>{},
    delete: async node=>{}
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
  this.childs = async function(node=null){
    if(!node) node = this.current;
    _path = this.one.path(node);
    return this.one.list(_path);
  };

  // commands
  this.ls = async _path=>(await this.childs()).join(" ");
  this.mk = async _path=>{};
  this.cd = async _path=>{
    console.log("run Node.cd");
  };
  return this;
})();
