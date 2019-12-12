(async conf=>{
  const DB = require('./Database');

  const Node = await require('./Node.js');
  if(Node){
    (async function(){
      //初期ノード作成
      async function init_db(){
        const NODE_DATAS = [
          {hash: "NodeHash_ROOT", parent: "", key: "TestA", value: "AAA"},
          {hash: "NodeHash_B", parent: "NodeHash_ROOT", key: "TestB", value: "BBB"},
          {hash: "NodeHash_C", parent: "NodeHash_B", key: "TestC", value: "CCC"},
          {hash: "NodeHash_D", parent: "NodeHash_B", key: "TestD", value: "DDD"},
          {hash: "NodeHash_E", parent: "NodeHash_ROOT", key: "TestE", value: "EEE"},
        ];
        for(k in NODE_DATAS) await one.create(NODE_DATAS[k]);
      }
      //await init_db();

      await cd("TestE");
      // log();
      await make("TestF");
      // log();
      // console.log(await ls());
      // console.log(await pwd());
      // console.log(cat());
      //console.log( make("TestF") );
    }).bind(Node)();
  }
})({
  name: 'scape_node',
});
