const APP = require("./Application");
const DB = require("./Database");

module.exports = (async function(){
  this.format = {hash:"", parent:"", key:"", value:""};
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

  this.ROOT = await this.one.read("NodeHash_ROOT");
  this.current = this.ROOT;
  this.parent = async function(node=null){
    if(!node)node = this.current;
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
      if(path.length==0){
        this.current = this.ROOT;
      }else{
        const node_keys = path.split("/");
        let node = this.current;
        for(k in node_keys){
          const result = await this.childs(node_keys[k], node);
          if(result.length>0){ node = result[0]; }
          else{ return {message: `NothingPath：${node_keys[k]}`}; }
        }
        this.current = node;
      }
      return this.current;
    }else{ return {message: "ParamError!"}; }
  };
  // path, find, make, set, delete, cron
  return this;
})();
