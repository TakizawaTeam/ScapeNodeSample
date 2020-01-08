(()=>{
var server = new WebSocket("ws:localhost:5002/");
server.onmessage = function(e) { console.log(e.data); }
server.onopen = function(e) { 
  console.log('connect!');
  server.send("1+1");
}
server.onclose = function(e) { console.log('close!'); }
})();
