const path = require("path");
const fs = require('fs').promises;
const Git = require('simple-git/promise');

module.exports = (()=>{
  this.root = null;
  this.current = null;
  this.checkout = _path=>{
    this.root = _path;
    this.current = "";
  };
  this.path = (_path="")=>path.resolve(path.join(this.root, this.current), _path);
  this.exist = async _path=>await fs.stat(this.path(_path)).catch(()=>null);
  this.child = async _path=>{
    list = await fs.readdir(this.path(_path)).catch(()=>[]);
    return list.filter(name=>!/^\./.test(name)); //隠しファイルは非表示
  };
  this.make = async _path=>{
    await fs.mkdir(this.path(_path), {recursive:true}).catch(()=>null);
    _path = path.join(this.path(_path), ".value");
    await fs.writeFile(_path, "");
  };
  this.set = async (value="",_path)=>{
    _path = path.join(this.path(_path), ".value");
    return await fs.writeFile(_path, value).catch(()=>null);
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
    return this.current = _path;
  };
  return this;
})();
