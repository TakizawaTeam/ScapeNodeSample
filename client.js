
// クライアント処理
let global = {
  command: {},
  var: {
    command: {},
  },
};
const importNode = async (path, dom=document.querySelector("#main"))=>{ // NodeのPathから取り込み
  await ask(`await checkout("system");`);
  await ask(`await cd("${path}");`);
  const el_str = await ask(`await cat();`);
  dom.insertAdjacentHTML('beforeend', el_str);

  const import_dom = dom.lastElementChild;
  for(let script of import_dom.querySelectorAll("script")){ // innerHTMLでは実行されない為js再配置
    var new_script = document.createElement('script');
    new_script.innerHTML = script.innerHTML;
    script.parentElement.insertBefore(new_script, script);
    script.parentElement.removeChild(script);
  }
  return !import_dom? false: import_dom;
};
const bgf_color = (bg='white',f='black')=>`color:${f};background-color:${bg};`;
const output_log = (target=null, style=bgf_color("#335","#DDE"))=>{
  if(typeof target==='object') target = JSON.stringify(target);
  console.log(`%c${target}`, style);
};
const str_var = str=>(new Function("return " + str))(); // ただの文字列をJSに変換


// replサーバー接続処理
let server = null;
let opened = false;
let client_hash_node = null;
const URL = `ws://${this.location.host}/repl`;
let history = [];
let history_size = 50;
let ask = null;
const COMMAND_LOG = true;

window.onload = function(){
  server = new WebSocket(URL);
  ask = async q=>{
    if(!opened || !server) return null;
    server.send(q);
    if(COMMAND_LOG) output_log(`$ ${q}`);
    return await new Promise((res,rej)=>{
      server.onmessage = function(e){
        m=e.data.split("\n"); m.pop(); m=m.join("\n"); m=str_var(m); //prompt削除
        if(typeof m!=='undefined'){
          history.push(m); history=history.slice(-history_size); //履歴保存と最大件数処理
          if(COMMAND_LOG) output_log(m);
          res(history.slice(-1)[0]);
        }
      };
    });
  };
  server.onopen = async function(e){
    opened=true; console.log(`${URL} connected!`); // 接続及びログ出力

    // client session
    await ask(`await checkout("system");`);
    await ask(`await cd("session");`);
    client_hash_node = await ask(`await make( APP.createHash('WorkspaceHash_', 30) );`);
    if(!!client_hash_node){
      await ask(`await cd("${client_hash_node.key}");`);
      node = await ask(`await make("created_at");`);
      test = await ask(`await set({value: APP.s_date()}, ${JSON.stringify(node)});`);
    }

    // workspace build
    await ask(`await checkout("system");`);
    await importNode("workspace/component/ChunkLoader");
    await importNode("workspace/component/ServerLine");
    updateServerLine(true);
    await importNode("workspace/component/KeyManager");
    await importNode("workspace/component/CommandPalette"); //原因不明だが最後でないと失敗する
  };
  server.onclose = async function(e){
    opened=false; console.log(`${URL} disconnected!`);  // 切断及びログ出力
    updateServerLine(false);
  };
};
