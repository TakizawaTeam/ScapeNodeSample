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
