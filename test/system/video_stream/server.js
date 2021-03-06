/*
 * Inspired by: http://stackoverflow.com/questions/4360060/video-streaming-with-html-5-via-node-js
 */

const http = require('http');
const fs = require('fs');
const util = require('util');


const root_path = process.argv[2] ? process.argv[2] : './';
const not_found_res = (req,res)=>{
  res.writeHead(200,{'content-type':'text/html'});
  res.end(`<h6>${req.url} not found!</h6>`);
}

http.createServer(function (req, res) {
  var path, stat, total;
  var video_path;

  const branch = req.url.slice(1).split('/');
  if (req.headers['range']) { // streamer
    video_path = decodeURI( branch.slice(1).join('/') );
    path = `${root_path}${video_path}`;
    stat = fs.statSync(path);
    total = stat.size;

    var range = req.headers.range;
    var parts = range.replace(/bytes=/, "").split("-");
    var partialstart = parts[0];
    var partialend = parts[1];

    var start = parseInt(partialstart, 10);
    var end = partialend ? parseInt(partialend, 10) : total-1;
    var chunksize = (end-start)+1;
    console.log('RANGE: ' + start + ' - ' + end + ' = ' + chunksize);

    var file = fs.createReadStream(path, {start: start, end: end});
    res.writeHead(206, { 'Content-Range': 'bytes ' + start + '-' + end + '/' + total, 'Accept-Ranges': 'bytes', 'Content-Length': chunksize, 'Content-Type': 'video/mp4' });
    file.pipe(res);

  } else {
    if(branch[0]=='_video_'){ // open
      //if(video_path=='') not_found_res(req, res);
      //res.writeHead(200, {'Content-Length': total, 'Content-Type': 'video/mp4'});
      //fs.createReadStream(path).pipe(res);
      const _video_path = decodeURI( branch.slice(1).join('/') );
      if(_video_path=='') not_found_res(req, res);
      const _path = `${root_path}${_video_path}`;
      fs.readFile(_path,'utf-8',function(err,data){
        const _total = fs.statSync(_path);
        res.writeHead(200, {'Content-Length': _total, 'Content-Type': 'video/mp4'});
        res.write(data);
        res.end();
      });

    }else if(branch[0]=='_folder_'){ // dir listup
      fs.readdir(`${root_path}${decodeURI(branch.slice(1).join('/'))}` ,(err,files)=>{
        if(err) not_found_res(req, res);
        res.writeHead(200, {'Content-Type': 'application/json'});
        res.end(JSON.stringify(files));
      });

    }else{ // find and listup
      fs.readFile('./index.html','utf-8',function(err,data){
        if(!err) console.log(err);
        res.writeHead(200, {'content-type': 'text/html'});
        res.write(data);
        res.end();
      });

    }

  }
}).listen(1362, 'localhost');
console.log('Server running at http://localhost:1362/');
