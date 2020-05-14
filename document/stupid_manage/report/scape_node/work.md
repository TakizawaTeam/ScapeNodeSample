# scape node worker
## スクリプトのサンプル
```
logon = Node.login("guest", "password");
if(logon) Node.make("DailyReport/8/22/TaskList").set("Task01¥nTask02¥nTask03");
if(logon) Node.cron("XXXX/XX/XX XX:XX:XX", {})
```

## フルパス(キー連結)で参照、CRUD出来るようにする
1. API化を促進するNodeRunnerを実装
2. hashを渡し特定ノードのフルパス取得、フルパスで単純なCRUDが出来るように
3. ~圧縮ファイル~非同期参照やファイルの入出力
