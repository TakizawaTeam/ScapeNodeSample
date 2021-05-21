const path = require("path");
const fs = require('fs').promises;
const Git = require('simple-git/promise');

module.exports = (()=>{
  repo = null;
  root = "";
  current = "";

  // database
  initialize = async (_path="Database")=>{
    _path = ex_path(_path);
    if(!await exist(_path)) this.make(_path);
    repo = Git(_path);
    await repo.init();
    await repo.add('.value');
    await repo.addConfig("user.name", "dummy")
    await repo.addConfig("user.email", "dummy")
    await repo.commit("first commit!");
    repo = null;
    return `initialize completed: ${_path}`;
  };
  checkout = async (_path="Database")=>{
    repo = null; root = ""; current = "";
    if(!await exist(ex_path(_path))) return null;
    repo = Git(_path);
    root = _path;
    current = "";
    return `checkout: ${_path}`;
  };
  connect = async callback=>{
    if(!!repo) return null;
    try{
      await repo.clean("dfx");
      result = await callback();
      await repo.add("./*");
      await repo.commit("Database commit!");
      return result;
    }catch(e){ await repo.clean("dfx"); }
  };

  // node
  ex_path = (_path="")=>path.resolve(path.join(root, current), _path);
  exist = async _path=>await fs.stat(ex_path(_path)).catch(()=>null);
  child = async _path=>{
    list = await fs.readdir(ex_path(_path)).catch(()=>[]);
    return list.filter(name=>!/^\./.test(name)); //隠しファイルは非表示
  };
  make = async _path=>{
    if(await exist(_path)) return null;
    await fs.mkdir(ex_path(_path), {recursive:true}).catch(()=>null);
    _path = path.join(ex_path(_path), ".value");
    await fs.writeFile(_path, "");
    return `create: ${_path}`;
  };
  set = async (value="",_path)=>{
    _path = path.join(ex_path(_path), ".value");
    await fs.writeFile(_path, value).catch(()=>null);
    return `write: ${value} ${_path}`;
  };
  catenate = async _path=>{
    _path = path.join(ex_path(_path), ".value");
    return await fs.readFile(_path, "utf-8").catch(()=>"");
  };
  statistics = async _path=>{
    return await fs.stat(ex_path(_path)).catch(()=>null);
  };
  change = async _path=>{
    if(!await exist(ex_path(_path))) return null;
    return current = path.join(current, _path);
  };

  // Commnds
  pwd = ()=>current;
  return this;
})();
