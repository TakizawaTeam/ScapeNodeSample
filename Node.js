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
    node_data.created_at = APP.s_date();
    node_data.updated_at = APP.s_date();
    return node_data;
  };
  this.initialize = async function(){
    return await DB.connect(async connection=>{
      const Node = await DB.get_collection(`${APP.name}/nodes`);
      return Node.remove();
    });
  };
  this.one = { /* HASHによる直接操作 */
    create: async obj=>{
      return await DB.connect(async connection=>{
        const Node = await DB.get_collection(`${APP.name}/nodes`);
        const res = Node.insertOne(obj);
        return Node.findOne({hash: obj.hash});
      });
    },
    read: async obj=>{
      return await DB.connect(async connection=>{
        const Node = await DB.get_collection(`${APP.name}/nodes`);
        return Node.findOne(obj);
      });
    },
    update: async obj=>{
      return await DB.connect(async connection=>{
        const Node = await DB.get_collection(`${APP.name}/nodes`);
        const res = Node.updateOne({hash: obj.hash}, {$set: obj});
        return Node.findOne({hash: obj.hash});
      });
    },
    delete: async obj=>{
      return await DB.connect(async connection=>{
        const Node = await DB.get_collection(`${APP.name}/nodes`);
        const res = Node.deleteOne({hash: obj.hash});
        return Node.findOne({hash: obj.hash});
      });
    },
  };

  this.ROOT = null;
  this.current = null;
  this.woods = async function(){};
  this.checkout = async function(name=this.ROOT_HASH){
    const root = await this.one.read({key: name});
    if(root){
      this.ROOT = root;
      this.current = this.ROOT;
      return this.current;
    }else{ return null; }
  };
  await this.checkout();
  this.target = key=>{
    if(key==this.ROOT.key)return this.ROOT;
    return this.current;
  };
  this.find = async function(path=""){
    if(typeof path==="string" && path.length>0){
      const node_keys = path.split("/");
      let find_history = [];
      let node = this.target(node_keys[0]);

      for(k in node_keys){
        if(node_keys[k]==this.ROOT.key){}
        else if(node_keys[k]=='.'){}
        else if(node_keys[k]=='..'){ node = await this.parent(node); }
        else{
          const result = await this.childs(node_keys[k], node);
          if(result.length>0){ node = result[0]; }
          else{ return find_history; }
        }
        find_history.unshift(node);
      }
      return node;
    }else{return `find() $path type error [${typeof path}]`;}
  };
  this.log = (node=null)=>console.log(node?node:this.current);
  this.parent = async function(node=null){
    if(!node)node = this.current;
    if(!node.parent) return node;
    return await this.one.read({hash: node.parent});
  };
  this.childs = async function(key=null, node=null, option={r:false}){
    if(!node)node = this.current;
    return await DB.connect(async connection=>{
      const Node = await DB.get_collection(`${APP.name}/nodes`);
      let params = {parent: node.hash};
      if(key) params["key"] = key;
      return await Node.find(params).toArray();
    });
  };
  this.branch = async function(node=null){
    if(!node)node = this.current;
    let parents = [node];
    while(true){
      node = await this.parent(node);
      parents.unshift(node);
      if(node.parent=="") break;
    }
    return parents;
  };
  /* return false: stop explor;
  ** return null:
  ** return undefined:
  */
  this.explor_asset = {
    current: null,
    list: [],
    history: [],
    depth: 0,
    MAX_DEPTH: 10,
    chest: [],
    callback: null,
  };
  this.explor = async function(_callback, _start=null, asset=this.explor_asset){
    if(asset.current==null || !!_start){
      asset.current = !!_start ? _start : this.current;
      asset.callback = _callback;
    }

    const current = await _callback(asset);
    if(!current || asset.MAX_DEPTH<=asset.depth)return asset.chest;
    asset.current = await one.read(current);
    asset.list = await this.childs(null, asset.current);
    asset.depth += 1;
    return await this.explor(_callback, null, asset);
  };
  this.survey_option = {
    explorer_num: 0,
    max_explorer: 30,
  };
  this.survey = async function(_callback, node=null, option=this.survey_option){
    if(!node)node = this.current;

    return await this.explor(async function(asset){
      asset.chest.push(asset.current);
      const child_nodes = await this.childs(null, asset.current);
      if(!!child_nodes.length){
        const keep_explorer = child_nodes.shift();
        for([k,n] of Object.entries(child_nodes)){
          const collection = await this.explor(asset.callback, n);
          asset.chest.concat( collection );
        }
        return keep_explorer;
      }else{return false;}
    }, node);
  };
  this.cd = async function(path=""){
    if(typeof path==="string" && path.length>0){
      this.current = path.length==0? this.ROOT : await this.find(path);
      return this.current;
    }else{return `cd() $path type error [${typeof path}]`;}
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
  this.make = async function(path, root_flg=false, option={p:true}){
    const node_keys = path.split("/");
    let key="", parent_node=this.current;
    if(node_keys.length>0) key = node_keys.pop();
    if(node_keys.length>0) parent_node = await this.find( node_keys.join("/") );

    if(APP.is.a(parent_node) && option["p"]){ //leafが存在しない場合
      for([k,v] of Object.entries(node_keys)){
        if(!parent_node[k]){ // leafまでの各種nodeが存在しない場合
          path = node_keys.slice(0,parseInt(k)+1).join("/");
          parent_node[k] = await this.make(path, false, {p:false});
        }
      }
      parent_node = parent_node.pop();
    }

    const parent_hash = root_flg ? "" : parent_node.hash;
    const node_data = this.createModel({parent: parent_hash, key: key});
    const create_node = await this.one.create(node_data);
    //return await this.cd(await this.pwd(create_node)); // make後にcd
    return create_node;
  };
  this.set = async function(data, node=null){
    if(!node)node = this.current;
    let target_node = await this.one.read(node);
    target_node.updated_at = APP.s_date();
    target_node = Object.assign(target_node, data);
    await this.one.update(target_node);
    return target_node;
  };
  this.cat = async function(column="value", node=null){
    if(!node)node = this.current;
    let target_node = await this.one.read({hash: node.hash});
    return !!target_node[column]? target_node[column] : null;
  };
  this.rm = async function(node=null, logical=true,option={r:true}){
    console.log(this.animals.fox, await this.survey(null));
    // if(!node)node = this.current;
    // let target_node = await this.one.read(node);
    // if(option["r"]){
    //   // await this.explor(async function(asset){
    //   //
    //   // }, target_node);
    // }
    // if(logical){
    //   target_node.deleted_at = APP.s_date();
    //   await this.one.update(target_node);
    // }else{
    //   await this.one.delete(target_node);
    // }
  };
  this.cp = async function(){};
  this.mv = async function(){};
  /* [future]
  * cosmos, dimension, universe, chunk, forest: 群衆管理
  * snapshot: ツリーを圧縮保存
  * independent: 親が不在のノードを独立させる
  * serialize history undo redo diff grep
  */
  return this;
})();
