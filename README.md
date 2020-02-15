#### Getting Started
1. `git clone`
2. `npm install`
3. `node index.js`

---

#### ① 事前準備 [TBI]
1. `https://www.mongodb.com`からmongodbをインストール

#### ② Getting Started [TBI]
1. `git clone git@github.com:TakizawaTeam/ScapeNodeSample.git`
2. `cd ScapeNodeSample; npm install;`
3. `node server.js`

#### ③ This Way [TBI]
1. ブラウザから`http://localhost:8000/workbench`に接続
2. コマンドパレッド[Shift+Command+P]から`tarminal`でweb_tarminalを起動
3. web_tarminalでconnectしてからrootノードを生成する
```
const root_node = await make('root', true);
await checkout('root');
```



#### Runner [TBI]
1. 実行用のノードを作成
```
create_node = await make("work/sample.js");
await set(`"use strict";`, create_node);
```
2. パスファインダー[Command+P]から`sample.js`を開いて編集する
3. web_tarminalにて`await import('./_root_/work/sample.js');`を実行

#### SymbolLinker [TBI]
1. web_tarminalにて`await setting_symbollinker("root/sys/symbol/linker")`を実行する
2. パスファインダー[Command+P]から`root/sys/symbol/linker`を開き'_path_'を追加する
3. web_tarminalにて`await import('./_path_/work/sample.js');`を実行
