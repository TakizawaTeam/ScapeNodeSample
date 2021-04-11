console.log(`run report`);
const fs = require('fs');

fs.writeFile('test.txt','Hello!',()=>{});
const src = fs.createReadStream('test.txt','utf8');
src.pipe(process.stdout);
//const dest = fs.createWriteStream('dest.txt','utf8');
//src.pipe(dest);

// -----
const Writable = require('stream').Writable;
class MyWritable extends Writable{
  constructor(options){super(options);}
  _write(chunk,encoding,callback){
    console.log(''+chunk);
  }
}

src.pipe( new MyWritable('dest.txt','utf8',function(){}) );



/*
const fs = require('fs');
const rl = require('readline');

const rl = rl.createInterface({input: fs.createReadStream('./input.csv')});
rl.on('line', (str)=>console.log(str));
*/
