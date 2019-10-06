const DB = require('./Database');
  
(async conf=>{
  const Node = require('./Node.js');
  console.log(Node.name);
  await Node.one.create({key: "Test3", value: "Test3"});

  /*
  await DB.connect(async connection=>{
    let Nodes = await DB.get_collection("scape_node/nodes");
    console.log(Nodes);
    await Nodes.insertOne({key: "Test2", value: "Test2"});
  });
  */
})({
  name: 'scape_node',
});
