## simple-git
##### 検証方法
> npm： https://www.npmjs.com/package/simple-git
> github： https://github.com/elastic/simple-git
> テストケース： https://github.com/elastic/simple-git/tree/master/test/unit

```
% node -i
> const Git = require('simple-git/promise');
> (async ()=>{})();
```

##### clone
```
const Git = require('simple-git/promise');

(async ()=>{
  await Git.clone("git@github.com:elastic/simple-git.git", "./simple-git");
})();
```

##### log
```
const Git = require('simple-git/promise');

(async ()=>{
  console.log(await Git("./simple-git").log());
})();
```

##### init
> 調べても空コミットという概念がなかった
> `git commit --allow-empty -m "first commit"`

```
const Git = require('simple-git/promise');

(async ()=>{
  repo = Git("./db");
  await repo.init();
  await repo.add('README.md');
  await repo.addConfig("user.name", "naoto-mizunuma")
  await repo.addConfig("user.email", "n-mizunuma@froide.co.jp")
  await repo.commit("first commit!");
})();
```

##### branch
```
const Git = require('simple-git/promise');

(async ()=>{
  repo = Git("./db");
  await repo.checkoutLocalBranch('develop');
  console.log(await repo.branch());
})();
```

##### reset
```
const Git = require('simple-git/promise');

(async ()=>{
  repo = Git("./db");
  await repo.reset("hard");
})();
```

##### clean
```
const Git = require('simple-git/promise');

(async ()=>{
  repo = Git("./db");
  await repo.clean("dfx");
})();
```
