const APP = require("./Application");
const DB = require("./Database");

exports = {
  format: {},
  current: null,
  one: { /* HASHによる直接操作 */
    create: async obj=>{
      return await DB.connect(async connection=>{
        const Node = await DB.get_collection(`${APP.name}/nodes`);
        return Node.insertOne(obj);
      });
    },
    read: async _hash=>{
      return await DB.connect(async connection=>{
        const Node = await DB.get_collection(`${APP.name}/nodes`);
        return Node.findOne({hash: _hash});
      });
    },
    update: async (hash, obj)=>{
      return await DB.connect(async connection=>{
        const Node = await DB.get_collection(`${APP.name}/nodes`);
        return Node.updateOne({hash: _hash}, obj);
      });
    },
    delete: async _hash=>{
      return await DB.connect(async connection=>{
        const Node = await DB.get_collection(`${APP.name}/nodes`);
        return Node.deleteOne({hash: _hash});
      });
    },
  },
  cd:  function(path){ /* 根から絶対パスを辿り移動or相対パスで移動 */

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
module.exports = exports;
