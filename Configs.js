module.exports = {
  name: 'scape_node',
  http_server: {
    port: 8000,
    static: {
      page404: {message: '404not found!'},
      workspace: {index: './system/workspace/index.html'},
      client: './client.js',
    },
    page404: {},
    pageWorkbench: {}
  },
  ws_server: { },
  repl_server: {
    port: 8001,
    server: 'localhost',
    prefix: '> ',
  },
};
