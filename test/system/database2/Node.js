const path = require("path");
const fs = require('fs').promises;
const Git = require('simple-git/promise');

module.exports = (()=>{
  this.root = "";
  this.current = "";

  // database
  this.initialize = async (_path="Database")=>{
    _path = this.path(_path);
    if(!await this.exist(_path)) this.make(_path);
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
    this.repo = null; this.root = ""; this.current = "";
    if(!await this.exist(this.path(_path))) return null;
    this.repo = Git(_path);
    this.root = _path;
    this.current = "";
    return `checkout: ${_path}`;
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

  // node
  this.path = (_path="")=>path.resolve(path.join(this.root, this.current), _path);
  this.exist = async _path=>await fs.stat(this.path(_path)).catch(()=>null);
  this.child = async _path=>{
    list = await fs.readdir(this.path(_path)).catch(()=>[]);
    return list.filter(name=>!/^\./.test(name)); //隠しファイルは非表示
  };
  this.make = async _path=>{
    if(await this.exist(_path)) return null;
    await fs.mkdir(this.path(_path), {recursive:true}).catch(()=>null);
    _path = path.join(this.path(_path), ".value");
    await fs.writeFile(_path, "");
    return `create: ${_path}`;
  };
  this.set = async (value="",_path)=>{
    _path = path.join(this.path(_path), ".value");
    await fs.writeFile(_path, value).catch(()=>null);
    return `write: ${value} ${_path}`;
  };
  this.catenate = async _path=>{
    _path = path.join(this.path(_path), ".value");
    return await fs.readFile(_path, "utf-8").catch(()=>"");
  };
  this.statistics = async _path=>{
    return await fs.stat(this.path(_path)).catch(()=>null);
  };
  this.change = async _path=>{
    if(!await this.exist(this.path(_path))) return null;
    return this.current = path.join(this.current, _path);
  };

  // Commnds
  this.pwd = ()=>this.current;
  return this;
})();
