const { promisify } = require('util');

module.exports = (async function(){
  this.name = "database";
  this.is = {
    u: v=>(typeof v==="undefined"),
    s: v=>(typeof v==="string"),
    n: v=>(typeof v==="number"),
    a: v=>Array.isArray(v),
    f: v=>(typeof v==="function"),
    o: v=>(!Array.isArray(v) && v!=null && (typeof obj==="object")),
  };
  this.dup = obj=>Object.assign({},obj);
  this.system_date = (datetime=null)=>{
    if(!datetime) datetime = new Date();
    return `${datetime.toLocaleDateString()} ${datetime.toLocaleTimeString()}`;
  };
  this.createHash = (prefix, num)=>{
    var h = '';
    while( h.length<num ) h+="1234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"[parseInt(Math.random()*62)];
    return `${prefix}${h}`;
  };
  this.exist = async _path=>await fs.stat(_path).catch(()=>null);
  return this;
})();
