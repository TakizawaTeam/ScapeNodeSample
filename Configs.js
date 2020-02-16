module.exports = {
  name: 'scape_node',
  http_server: {
    port: 8000,
    page404: {'content-type': 'text/html', message: '404not found!'},
    pageWorkbench: {index: './server.html'}
  },
  ws_server: { },
  repl_server: {
    port: 8001,
    server: 'localhost',
    prefix: '> ',
  },
};
