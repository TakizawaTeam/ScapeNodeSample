//1秒毎に次の要素のテキストを処理していく
_curr = null;
init = d=>_curr=d;
next = _cf=>{_curr=_curr.nextSibling;_cf(_curr);};

texts = [];
init($0);
frame = function(){
    next(curr=>{
      text = curr.nodeValue;
      if(typeof text==="string"){
          text = text.replace(/\r?\n/g, '');
          if(!!text){
            texts.push(text);
            console.log(text);
          }
      }
    });
};
setInterval(frame, 1000);
