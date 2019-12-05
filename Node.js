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
  cd:  function(path){ /* 根から絶対パスを辿り移動or相対パスで移動 */
    // if(typeof path==="string"){
    //   if(path.length==0) return this.one.read
    // }
    // const path_names = path.split("/");
    // let node = await this.lib.find_name(this.current, path_names.shift());
    // for(let path_name in path_names){
    //   node = await this.lib.find_name(node, path_name);
    //   this.current = node;
    // }
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
