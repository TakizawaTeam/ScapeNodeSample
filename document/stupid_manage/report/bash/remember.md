
#### if文
```
if [ `pgrep mongo` = "" ]; then echo "A"; else echo "B"; fi;
```

#### バックグラウンド実行
ログ出力及びバックグラウンド実行
https://qiita.com/chihiro/items/ae1eb63537e60b03cb68

```
#『&』を末尾に付けてバックグラウンド実行
nohup node app.js > out.log 2> error.log &
```

#### 作成時の注意点
https://yakst.com/ja/posts/31
