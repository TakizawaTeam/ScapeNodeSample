(async conf=>{
  const APP = await require("./Application.js");
  const Node = await require('./Node.js');
  if(Node){
    (async function(){
      async function init(){
        await initialize();
        // scape node system.
        const system_node = await make('system', true);await checkout('system');
        await make("workspace/commands");await cd("workspace/commands");
        await make("core:helper");
        await make("core:import");
        CommandPalette = await make("core:CommandPalette");
        await make("core:Terminal");
        await make("core:Editor");
        await make("core:PathFinder");
        await set({value: `<div id="CommandPalette" class="modal">
              <style>
              #CommandPalette .window{
                position: relative;
                left: 50%;
                top: 10px;
                transform: translateX(-50%);
                background-color: #404550;
                max-width: 480px;
                min-width: 240px;
                height: 480px;
                border-radius: 5px;
                padding: 10px;
              }
              #CommandPalette .command{
                color: #EEE;
                caret-color: #DDE;
                background-color: #303440;
                border: none;
                width: 100%;
                margin-bottom: 10px;
                padding-left: 5px;
                font-size: 14px;
                height: 25px;
              }
              #CommandPalette .predict{
                background-color: #303440;
                height: calc(100% - 35px);
                border: solid 1px #303440;
                overflow-y: scroll;
              }
              #CommandPalette .predict .box{
                color: #CCD;
                background-color: #404550;
                border-bottom: solid 1px #303440;
                height: 30px;
                padding-left: 10px;
                line-height: 30px;
              }
              #CommandPalette .predict .box:last-child{ border-bottom: none; }
              #CommandPalette .predict .box:hover{ background-color: #505660; }
              </style>

              <div class="window">
                <input type="text" class="command"/>
                <div class="predict">
                  <div class="box">dummyA</div>
                  <div class="box">dummyB</div>
                  <div class="box">dummyC</div>

                  <div class="box">dummy1</div>
                  <div class="box">dummy2</div>
                  <div class="box">dummy3</div>
                  <div class="box">dummy4</div>
                  <div class="box">dummy5</div>
                  <div class="box">dummy6</div>
                  <div class="box">dummy7</div>
                  <div class="box">dummy8</div>
                  <div class="box">dummy9</div>
                  <div class="box">dummy10</div>
                  <div class="box">dummy11</div>
                  <div class="box">dummy12</div>
                  <div class="box">dummy13</div>
                  <div class="box">dummy14</div>
                  <div class="box">dummy15</div>
                </div>
              </div>

              <script>
              console.log(document.querySelector("#CommandPalette"));
              alert("Test!");
              </script>
            </div>`}, CommandPalette);

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
