const APP = require("./Application");
const DB = require("./Database");

module.exports = {
  format: {},
  current: null,
  one: { /* HASHによる直接操作 */
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
  },
  parent: async function(){
    return await this.one.read(this.current.parent);
  },
  childs: async function(key=null){
    return await DB.connect(async connection=>{
      const Node = await DB.get_collection(`${APP.name}/nodes`);
      let params = {parent: this.current.hash};
      if(key) params["key"] = key;
      return await Node.find(params).toArray();
    });
  },
  cd: async function(path=""){ /* 根から絶対パスを辿り移動or相対パスで移動 */
    if(typeof path==="string"){
      if(path.length==0){
        this.current = await this.one.read("NodeHash_ROOT"); }
      else{
        const node_keys = path.split("/");
        for(k in node_keys) this.current = await this.childs(node_keys[k]); }
      return this.current; }
    else{ return {message: "ParamError!"}; }
  },
  path: ()=>{ /* 親を辿り現在のフルパスを生成 */

  },
  find: function(name, option){ /* 配下の検索 */

  },
  make: function(path){},
  set: function(value){},
  delete: function(path){},
  cron: function(datetime=now){},
};
