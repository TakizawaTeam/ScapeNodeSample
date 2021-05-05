const path = require("path");
const fs = require('fs').promises;
const Git = require('simple-git/promise');

module.exports = (async function(){
  this.repo = null;
  this.root = null;
  this.current = null;

  this.initialize =  async (_path="db")=>{
    await fs.mkdir(_path);
    this.repo = Git(_path);
    await this.repo.add('README.md');
    await this.repo.addConfig("user.name", "naoto-mizunuma")
    await this.repo.addConfig("user.email", "n-mizunuma@froide.co.jp")
    await this.repo.commit("first commit!");
  };
  this.checkout = async (_path="db")=>{
    this.repo = Git(_path);
    this.root = __dirname;
    this.current = path.resolve(__dirname, _path);
  };
  this.connect = async callback=>{
    try{
      await this.repo.clean("dfx");
      await callback();
      await this.repo.add("./*");
      await this.repo.commit("db commit!");
    }catch(e){ await this.repo.clean("dfx"); }
  };
  this.childs = async function(_path=null){
    if(!_path)_path = this.current;
    return await fs.readdir(_path);
  };
  this.make = async function(_path=null){
    // await fs.mkdir(_path,{recursive:true});
    // await fs.writeFile(`${path.resolve(__dirname, _path)}/.index`,'');
  };

  // commands
  this.ls = async path=>(await this.childs(path)).join(' ');
  const mk = ()=>{};
  const cd = ()=>{};
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
