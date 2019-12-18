(async conf=>{
  const DB = require('./Database');

  const Node = await require('./Node.js');
  if(Node.True()){
    (async function(){
      //初期ノード作成
      // async function init(){
      //   await initialize();
      //   const NODE_DATAS = [
      //     {hash: "NodeHash_ROOT", parent: "", key: "TestA", value: "AAA"},
      //     {hash: "NodeHash_B", parent: "NodeHash_ROOT", key: "TestB", value: "BBB"},
      //     {hash: "NodeHash_C", parent: "NodeHash_B", key: "TestC", value: "CCC"},
      //     {hash: "NodeHash_D", parent: "NodeHash_B", key: "TestD", value: "DDD"},
      //     {hash: "NodeHash_E", parent: "NodeHash_ROOT", key: "TestE", value: "EEE"},
      //   ];
      //   for(k in NODE_DATAS) await one.create(NODE_DATAS[k]);
      // }

      const branch1 = 'TestA/TestB/TestC/TestD';
      const branch2 = 'TestE/TestF';
      const branch3 = 'TestG';

      await initialize();
      const root_node = await make('root', true); await checkout('root');
      log();
      // await make('work');await cd('work');
      // await make(branch1);await cd('TestA/TestB');
      // await make(branch2);
      // await make(branch3);
    }).bind(Node)();
  }
})({
  name: 'scape_node',
});
