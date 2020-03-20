
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
