
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


#### zsh
```
PS1="%1~ %(!.#.%%) "
setopt interactivecomments
HISTSIZE=1000000
SAVEHIST=1000000

mkdircd(){ mkdir $1;cd $1; }
zpu(){ source ~/.zprofile }
zpe(){ vi ~/.zprofile && zpu }
```


#### 環境変数一覧
```
printenv
```
