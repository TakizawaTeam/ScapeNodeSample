(async conf=>{
  const APP = await require("./Application.js");
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

        console.log(`\n[generate NodeModule TestTree.]`);
        console.log(`current: ${await pwd()}`);

        const main_path = 'root/work/TestA/TestB';
        const test_d = await find(`${main_path}/TestC/TestD`);
        await set({value: "set value to test_d."}, test_d);
        console.log(`${await cat('value', test_d)} and write.`);

        const test_f = await find(`${main_path}/TestE/TestF`);
        await set({value: "set value to test_f."}, test_f);
        console.log(`${await cat('value', test_f)} and write.`);

        const test_g = await find(`${main_path}/TestG`);
        await set({value: "set value to test_g."}, test_g);
        console.log(`${await cat('value', test_g)} and write.`);
      };

      // 各種NodeModuleテスト
      await init();
      console.log(`${"\n"}---${"\n"}`);

      // const explor_nodes = await explor(async function(asset){
      //   //console.log(`current[${asset.depth}]:`, asset.current);
      //   console.log(APP.getAnimalIcons(0), asset.list);
      //
      //   const parent_node = await parent(asset.current);
      //   if(!asset.current.parent) return false;
      //   return parent_node;
      // });
      // //console.log('result:', explor_nodes);

      //await rm();
      let create_node = await make('root/work/TestH');
      create_node = await set({value: 'cp test.'}, create_node);
      await cp(create_node, 'root/work/TestA/TestB/TestG/TestH');
    }).bind(Node)();
  }
})({
  name: 'scape_node',
});
