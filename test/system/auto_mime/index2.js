const path = require("path");
const fs = require('fs').promises;
const http = require('http');
const mime = require('mime-types');

const files = [
  "dir/test.json",
  "dir/150x150.png"
];

const server = http.createServer(async function(req, res){
  const _path = `.${req.url}`;
  const stat = async _path=>await fs.stat(_path).catch(()=>null);

  const mime_type = mime.contentType(path.extname(_path));
  if(await stat(_path)){
    const data = await fs.readFile(_path);
    res.writeHead(200, {'content-type': mime_type});
    res.write(data);
  }else{
    res.writeHead(404);
    res.write("404 not found!");
  }
  res.end();
});
server.listen(8888, function(){});
