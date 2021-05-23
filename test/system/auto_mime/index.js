const mime = require('mime-types');
 const path = require("path");

console.log(mime.lookup('dir/test.json'));
console.log(mime.contentType(path.extname('dir/test.json'))); 
