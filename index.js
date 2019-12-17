(async conf=>{
  const DB = require('./Database');

  const Node = await require('./Node.js');
  if(Node.True()){
    (async function(){
      //初期ノード作成
      async function init(){
        await initialize();
        const NODE_DATAS = [
          {hash: "NodeHash_ROOT", parent: "", key: "TestA", value: "AAA"},
          {hash: "NodeHash_B", parent: "NodeHash_ROOT", key: "TestB", value: "BBB"},
          {hash: "NodeHash_C", parent: "NodeHash_B", key: "TestC", value: "CCC"},
          {hash: "NodeHash_D", parent: "NodeHash_B", key: "TestD", value: "DDD"},
          {hash: "NodeHash_E", parent: "NodeHash_ROOT", key: "TestE", value: "EEE"},
        ];
        for(k in NODE_DATAS) await one.create(NODE_DATAS[k]);
      }

      await init();
      // const root_node = await make('root', true); await cd('root');
      //
      // const root = 'root',
      // work = 'work',
      // first = 'TestA/TestB/TestC/TestD',
      // second = 'TestE/TestF',
      // third = 'TestG';
      //
      // await make(`${root}/${work}/${first}`);
      // await cd(`${root}/${work}/TestB`);
      // await make(second);
      // await make(third);
    }).bind(Node)();
  }
})({
  name: 'scape_node',
});
