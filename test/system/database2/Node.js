const path = require("path");
const fs = require('fs').promises;
const Git = require('simple-git/promise');

module.exports = (async function(){
  this.APP = await require("./Application.js");
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
    this.current = _path;
  };
  this.connect = async callback=>{
    try{
      await this.repo.clean("dfx");
      await callback();
      await this.repo.add("./*");
      await this.repo.commit("db commit!");
    }catch(e){ await this.repo.clean("dfx"); }
  };
  this.one = {
    format: {parent:"",key:"",value:"",created_at:"",updated_at:""},
    model: async params=>{
      node = Object.assign({}, params);
      node_data.created_at = APP.s_date();
      node_data.updated_at = APP.s_date();
      return node;
    },
    create: async node=>{
      path = path.resolve(node.parent, node.key);
      await fs.mkdir(path,{recursive:true});
      await fs.writeFile(path.resolve(path, ".value"),value);
    },
    read: async node=>{},
    update: async node=>{},
    delete: async node=>{}
  };
  this.change_node = async function(_path=null){};
  this.stat = async function(_path=null){
    return {
      parent: "",
      key: "",
      value: "",
      created_at: "",
      updated_at: ""
    };
  };
  this.childs = async function(_path=null){
    if(!_path)_path = this.current;
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
