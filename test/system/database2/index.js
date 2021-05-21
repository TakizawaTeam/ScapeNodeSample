const Node = require('./Node.js');

(async function(){
  await checkout();
  await change("user/n-mizunuma@froide.co.jp");
  console.log( await child() );
}).bind(Node)();
