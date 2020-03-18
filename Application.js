const { promisify } = require('util');

module.exports = (async function(){
  this.configs = require('./Configs.js');
  this.name = this.configs.name;
  this.is = {
    u: v=>(typeof v==="undefined"),
    s: v=>(typeof v==="string"),
    n: v=>(typeof v==="number"),
    a: v=>Array.isArray(v),
    f: v=>(typeof v==="function"),
    o: v=>(!Array.isArray(v) && v!=null && (typeof obj==="object")),
  };
  this.dup = obj=>Object.assign({},obj);
  this.s_date = (datetime=null)=>{
    if(!datetime) datetime = new Date();
    return `${datetime.toLocaleDateString()} ${datetime.toLocaleTimeString()}`;
  };
  this.createHash = (prefix, num)=>{
    var h = '';
    while( h.length<num ) h+="1234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"[parseInt(Math.random()*62)];
    return `${prefix}${h}`;
  };
  this.animals = {
    dog: '🐶', cat: '🐱', rat: '🐭', hamster: '🐹', rabbit: '🐰', fox: '🦊', bear: '🐻',
    panda: '🐼', koala: '🐨', tiger: '🐯', lion: '🦁', cow: '🐮', pig: '🐷',
  };
  this.getAnimalIcons = num=>{
    const sort = [
      "dog", "cat", "rat", "hamster", "rabbit", "fox", "bear", "panda",
      "koala", "tiger", "lion", "cow", "pig",
    ];
    return num<sort.length ? sort.map(k=>this.animals[k])[num] : null;
  };
  this.log_counter = 0;
  this.debag_log = (n,msg)=>{
    const animal_icon = this.getAnimalIcons(n%Object.keys(this.animals).length);
    console.log(`${animal_icon}${this.log_counter++}`, msg);
  };
  this.ASYNC_FUNCTION = async function(){};
  this.html_static = async (res, data, head={'content-type': 'text/html'})=>{
    res.writeHead(200, head);
    res.write(data);
    res.end();
    return true;
  };
  this.read_file = async (path, char_set='utf-8')=>{
    const data = await promisify(require('fs').readFile)(path, char_set);
    return data ? data : null;
  };
  return this;
})();
