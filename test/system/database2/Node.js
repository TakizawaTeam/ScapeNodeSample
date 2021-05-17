const path = require("path");
const fs = require('fs').promises;
const Git = require('simple-git/promise');

module.exports = (async function(){
  this.APP = await require("./Application.js");
  this.repo = null;
  this.root = null;
  this.current = null;

  // 絶対パスへの変換とノード操作
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
      root_path = this.one.path(this.root);
      _path = path.join(root_path, `${node.parent}/${node.key}`);
      await fs.mkdir(_path,{recursive:true});
      await fs.writeFile(path.resolve(_path, ".value"),node.value);
      return this.one.read(node);
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

  // ノード変換(相対パス)
  this.create = async function(_path=null){ // mk
    if(!_path) return null;
    nodes = _path.split("/");
    key = nodes.pop();
    node = this.one.model({parent: nodes.join("/"), key: key});
    return this.one.create(node);
  };
  this.childs = async function(_path=null){ // ls
    if(!_path) _path = this.one.path(this.current);
    return this.one.list(_path);
  };
  this.change_node = async function(_path=null){ // cn
    if(!_path) return null;
    nodes = _path.split("/");
    key = nodes.pop();
    node = this.one.model({parent: nodes.join("/"), key: key});
    if(!node) return null;
    return this.current = node;
  };

  // commands 相対パス引き渡し
  this.ls = async _path=>(await this.childs(_path)).join(" ");
  this.mk = async _path=>await this.create(_path);
  this.cn = async _path=>await this.change_node(_path);
  return this;
})();

/* TODO バグをコードに直接リストアップ
* rootのnode直下にmkすると、currentが何故か書き換わる
*/
