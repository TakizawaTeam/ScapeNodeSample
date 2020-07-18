
MacにMongoDBをインストールする
https://qiita.com/saitoryc/items/1be82c54b8736fce8886

A5 Mk-2のスクリプト操作
http://www.wind.sannet.ne.jp/m_matsu/developer/a5m2/help2.9/ScriptEditor/DMonkeyA5M2_ERD.html

swagger core の アノテーション
・Editor
・UI
・Codegen
Swagger Editor
http://editor.swagger.io/

技術者の倫理観(経営者の決定権問題)
https://twitter.com/cumulo_autumn/status/1148773483007975424

Mac用ファン
https://jinnaitakumi.com/mac-mini-usb-cooling-fan/

クリーンアーキテクチャ
https://www.slideshare.net/TokorotenNakayama/2019-structure-of-psychological-safety
https://twitter.com/cumulo_autumn/status/1148773483007975424

#### 改行コードの汎用性確認
> ファイルシステム上よく使われる改行コードだが  
> この部分は実は汎用化可能である可能性がある

```
// 文字列の構造化時の次元性確認
(()=>{

const echo = console.log;
let txt = `
a,a,a b,b,b c,c,c

ddd eee fff

-
ggg hhh iii
jjj kkk lll
`; txt=txt.slice(1); txt=txt.slice(0,-1);

let table = txt.split("
-"); echo(table);
let rows = table[0].split("
"); echo(rows);
let columns = rows[0].split("\ "); echo(columns);
let words = columns[0].split(","); echo(words);

})();
```

スクリプト化にあたっての規約
1. 分解→結合等の相対性確認
2. ファイルシステムからのノード取り込み
3. マルコフ連鎖によるコード確認

rubyの全変数一覧
https://q.hatena.ne.jp/1363214207
http://blog.livedoor.jp/maru_tak/archives/51200517.html

日本人vsアジャイル
https://qiita.com/hirokidaichi/items/1faf7a57cc55562a15e1

国民性指標(ホフテッド指数)
https://blog.brainpad.co.jp/entry/2014/11/28/211728


脳の部位損傷による各種喪失機能
https://www.msdmanuals.com/ja-jp/%E3%83%9B%E3%83%BC%E3%83%A0/09-%E8%84%B3%E3%80%81%E8%84%8A%E9%AB%84%E3%80%81%E6%9C%AB%E6%A2%A2%E7%A5%9E%E7%B5%8C%E3%81%AE%E7%97%85%E6%B0%97/%E8%84%B3%E3%81%AE%E6%A9%9F%E8%83%BD%E9%9A%9C%E5%AE%B3/%E9%83%A8%E4%BD%8D%E5%88%A5%E3%81%AB%E3%81%BF%E3%81%9F%E8%84%B3%E3%81%AE%E6%A9%9F%E8%83%BD%E9%9A%9C%E5%AE%B3

相関係数
https://sci-pursuit.com/math/statistics/correlation-coefficient.html

赤ちゃんを見習いニュートラルになる方法
http://www.nodoubt.jp/self-management/entry23044.html

味付きチラガー(和風しょう油)


##### 次世代ブレーキの検証
```
(async ()=>{
  console.log("run!");
  const cp = document.body.querySelector("#main");
  if(typeof cp === "undefined"){ //スピード操作用のコントロールパネル

  }

  let records = [];
  let x = 0;
  let speed = 0;
  const friction = 1;

  const speedUp = lr=>{switch(lr){case "left":speed--;break;case "right":speed++;break;}};
  const speedDown = f=>{if(speed>0){speed+=f;}else if(speed<0){speed-=f;}};
  this.setInterval(()=>{
    speedDown(friction);
    records.push({position: {x: x}, speed: {x: speed}});
  }, 1000);
})();
```
