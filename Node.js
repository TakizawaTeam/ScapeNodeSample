module.exports = (async function(){
  const APP = await require("./Application.js");
  const DB = require("./Database.js");

  this.ROOT_HASH = 'NodeHash_ROOT';
  this.format = {
    hash:"",
    parent:"",
    key:"",
    value:"",
    created_at: "",
    updated_at: "",
    deleted_at: "",
  };
  this.createNodeHash = ()=>APP.createHash('NodeHash_', 30); //createHashにすると落ちる
  this.createModel = (params=null)=>{
    let node_data = APP.dup(this.format);
    node_data = Object.assign(node_data, params);
    node_data.hash = this.createNodeHash();
    return node_data;
  };
  this.one = { /* HASHによる直接操作 */
    create: async obj=>{
      return await DB.connect(async connection=>{
        const Node = await DB.get_collection(`${APP.name}/nodes`);
        return Node.insertOne(obj);
      });
    },
    read: async hash=>{
      return await DB.connect(async connection=>{
        const Node = await DB.get_collection(`${APP.name}/nodes`);
        return Node.findOne({hash: hash});
      });
    },
    update: async obj=>{
      return await DB.connect(async connection=>{
        const Node = await DB.get_collection(`${APP.name}/nodes`);
        return Node.updateOne({hash: obj.hash}, {$set: obj});
      });
    },
    delete: async hash=>{
      return await DB.connect(async connection=>{
        const Node = await DB.get_collection(`${APP.name}/nodes`);
        return Node.deleteOne({hash: hash});
      });
    },
  };

  this.ROOT = await this.one.read(this.ROOT_HASH);
  if(this.ROOT){
    this.current = this.ROOT;
    this.target = key=>{
      if(key==this.ROOT.key)return this.ROOT;
      return this.current;
    };
    this.find = async function(path=""){
      if(typeof path==="string" && path.length>0){
        const node_keys = path.split("/");
        let node = this.target(node_keys[0]);

        for(k in node_keys){
          if(node_keys[k]==this.ROOT.key){}
          else if(node_keys[k]=='.'){}
          else if(node_keys[k]=='..'){ node = this.parent(); }
          else{
            const result = await this.childs(node_keys[k], node);
            if(result.length>0){ node = result[0]; }
            else{ return null; }
          }
        }
        return node;
      }else{return `find$path type error [${typeof path}]`;}
    };
    // [TBI] snap serialize history undo redo diff grep
    this.log = (node=null)=>console.log(node?node:this.current);
    this.parent = async function(node=null){
      if(!node)node = this.current;
      if(!node.parent) return node;
      return await this.one.read(node.parent);
    };
    this.childs = async function(key=null, node=null){
      if(!node)node = this.current;
      return await DB.connect(async connection=>{
        const Node = await DB.get_collection(`${APP.name}/nodes`);
        let params = {parent: node.hash};
        if(key) params["key"] = key;
        return await Node.find(params).toArray();
      });
    };
    this.cd = async function(path=""){ /* 根から絶対パスを辿り移動or相対パスで移動 */
      if(typeof path==="string"){
        this.current = path.length==0? this.ROOT : await this.find(path);
        return this.current;
      }else{return `cd$path type error [${typeof path}]`;}
    };
    this.ls = async function(key){ return (await this.childs(key)).map(n=>n.key); };
    this.pwd = async function(node=null){
      if(!node)node = this.current;
      let keys = [node.key];
      while(true){
        parent_node = await this.parent(node);
        if(node==parent_node){ break; }
        else{ keys.unshift((node=parent_node).key); }
      }
      return keys.join('/');
    };
    this.cat = function(node=null){
      if(!node)node = this.current;
      return node["value"];
    };
    this.make = async function(path, root_flg=false){
      const node_keys = path.split("/");
      let key="", parent_node=this.current;
      if(node_keys.length>0) key = node_keys.pop();
      console.log(key, node_keys);
      if(node_keys.length>0) parent_node = await this.find( node_keys.join("/") );

      const parent_hash = root_flg ? "" : parent_node.hash;
      const node_data = this.createModel({parent: parent_hash, key: key});
      const create_node = await this.one.create(node_data);
      //return await this.cd(await this.pwd(create_node));
      return create_node;
    };
    this.set = async function(node_data, node=null){
      if(!node)node = this.current;
      await this.one.update(node_data);
      return node_data;
    };
    this.rm = async function(){};
    return this;
  }else{
    return null; //error: missing root node
  }
})();
