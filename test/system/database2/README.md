## Database検証
#### GetStarted
1. npm install
2. node server.js
3. open test/system/database2/Terminal.html

#### REPL検証
1. CONNECTボタンを押す
2. 入力するとレスポンスが返ってくる

#### Node検証
```
node -i
> const Node = require("Node.js");
> (async ()=>{
>   await Node.initialize(); #初期化
>   await Node.checkout(); #root選択
>   Node.connect(async ()=>{
>     await Node.mkcd("japan/daily");
>     await Node.mk("210507.json", "[{sc:6758,price:10470,pre:-245}]";
>     console.log(await Node.cat("index"));
>   });
> })();
```
