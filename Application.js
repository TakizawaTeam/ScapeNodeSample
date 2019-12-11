module.exports = (async function(){
  this.name = "scape_node";
  this.is = {
    types: {
      u: "undefined",
      s: "string",
      n: "number"},
    init: ()=>{
      for(k in this.is.types){
        this.is[k] = eval(`valid=>(typeof valid===${this.is.types[k]})`);
      }
    }
  };
  this.is.init();
  this.dup = obj=>Object.assign({},obj);
  this.createHash = (prefix, num)=>{
    var h = '';
    while( h.length<num ) h+="1234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"[parseInt(Math.random()*62)];
    return `${prefix}${h}`;
  };
  return this;
})();
