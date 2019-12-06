const DB = require('./Database');

(async conf=>{
  const Node = require('./Node.js');

  //初期ノード作成
  async function init_db(){
    const NODE_DATAS = [
      {hash: "NodeHash_ROOT", parent: "", key: "TestA", value: "AAA"},
      {hash: "NodeHash_B", parent: "NodeHash_ROOT", key: "TestB", value: "BBB"},
      {hash: "NodeHash_C", parent: "NodeHash_B", key: "TestC", value: "CCC"},
      {hash: "NodeHash_D", parent: "NodeHash_B", key: "TestD", value: "DDD"},
      {hash: "NodeHash_E", parent: "NodeHash_ROOT", key: "TestE", value: "EEE"},
    ];
    for(k in NODE_DATAS) await Node.one.create(NODE_DATAS[k]);
  }

  console.log(Node.current);
  await Node.cd("");
  await Node.cd("NodeHash_B");
  console.log(Node.current);
})({
  name: 'scape_node',
});
