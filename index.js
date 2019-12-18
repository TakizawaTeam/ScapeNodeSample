(async conf=>{
  const DB = require('./Database');
  const Node = await require('./Node.js');
  if(Node){
    (async function(){
      async function init(){
        await initialize();
        const root_node = await make('root', true);await checkout('root');
        await make("work");await cd("work");

        await make("TestA/TestB/TestC/TestD"); //branch1
        await cd("TestA/TestB");
        await make("TestE/TestF"); //branch2
        await make("TestG"); //branch3
      }; await init();

      // 各種NodeModuleテスト
      console.log(`current: ${await pwd()}`);
      log();
    }).bind(Node)();
  }
})({
  name: 'scape_node',
});
