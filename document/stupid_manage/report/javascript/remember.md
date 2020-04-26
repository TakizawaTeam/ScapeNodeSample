
#### 要素から要素を辿る
```
myElement.children
myElement.firstElementChild
myElement.lastElementChild
myElement.previousElementSibling
myElement.nextElementSibling
myElement.childNodes
myElement.firstChild
myElement.lastChild
myElement.previousSibling
myElement.nextSibling
myElement.parentNode
myElement.parentElement
```

#### 忘れるので汎用的なループ
```
// Array 2
const array2 = ['a', 'b', 'c'];

console.log('array2');
for (const [key, value] of array2.entries()) { // ★
    console.log({key, value});
}
```

#### 配列の結合
```
arr1 = arr1.concat( arr2 );
```

#### よく忘れるawait sleep
```
const sleep = msec => new Promise(resolve => setTimeout(resolve, msec));
```

#### await
```
async function A(){
  return await new Promise(function(resolve, reject){
    if(false) reject(true);
    resolve(true);
  });
}
```

#### async eval
```
AsyncFunction = Object.getPrototypeOf(async function(){}).constructor; // AsyncFunctionコンストラクタの取得
async_eval = async code=>{ await AsyncFunction(code)(); } // コード文字列のasync実行
sleep = ms=>new Promise(res=>setTimeout(res,ms));

(async ()=>{
  await async_eval(`await sleep(3000); return console.log("act1");`);
  console.log("act2");
})();
```

#### 一意の配列値
```
// new Set：一意な値だけの集合
// Array.from：配列に戻す
return Array.from(new Set(array));
return [...new Set(array)];
```
