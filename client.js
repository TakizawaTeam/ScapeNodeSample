let server = null;
let opened = false;
const URL = `ws://${this.location.host}/repl`;
let history = [];
let history_size = 50;
let ask = null;
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
  return true;
};
const bgf_color = (bg='white',f='black')=>`color:${f};background-color:${bg};`;
const output_log = (target=null, style=bgf_color("#335","#DDE"))=>{
  if(typeof target==='object') target = JSON.stringify(target);
  console.log(`%c${target}`, style);
};
const str_var = str=>(new Function("return " + str))(); // ただの文字列をJSに変換

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
        if(m!="" && typeof m!=='undefined'){
          history.push(m); history=history.slice(-history_size); //履歴保存と最大件数処理
          if(COMMAND_LOG) output_log(m);
          res(history.slice(-1)[0]);
        }
      };
    });
  };
  server.onopen = async function(e){
    opened=true; console.log(`${URL} connected!`); // 接続及びログ出力
    await importNode("workspace/component/ChunkLoader");
    await importNode("workspace/component/ServerLine");
    updateServerLine(true);
    await importNode("workspace/component/CommandPalette");
  };
  server.onclose = async function(e){
    opened=false; console.log(`${URL} disconnected!`);  // 切断及びログ出力
    updateServerLine(false);
  };
};
