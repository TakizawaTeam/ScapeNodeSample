## nodegit
> cleanで-dfオプションが付けられない為、simple-gitを使う予定

> https://www.nodegit.org/
> サンプル： https://github.com/nodegit/nodegit/tree/master/examples
> API： https://www.nodegit.org/api/
> テストケース： https://github.com/nodegit/nodegit/tree/master/test/tests

#### clone
```
var Git = require("nodegit");

(async()=>{
  console.log('clone https://github.com/nodegit/nodegit...');
  repo = await Git.Clone("https://github.com/nodegit/nodegit", "nodegit");
  // Work with the repository object here.
})();
```

#### open
```
var Git = require("nodegit");

(async ()=>{
  repo = await Git.Repository.open("nodegit");
  commit = await repo.getBranchCommit("master");
  message = await commit.message();
  console.log(message);
})();
```

#### init
```
var Git = require("nodegit");
var repo_path = require("path").resolve("./db");

(async ()=>{
  repo = await Git.Repository.init(repo_path,isBare=0);
})();
```

#### ブランチ作成しないといけない？ → masterはcommit時からある
```
var Git = require("nodegit");
var repo_path = require("path").resolve("./db");

(async ()=>{
  author = Git.Signature.now("","");
  committer = Git.Signature.now("","");

  repo = await Git.Repository.init(repo_path,isBare=0);
  index = await repo.refreshIndex();
  // await index.addByPath('README.md');
  // await index.write();
  oid = await index.writeTree();
  commitOid = await repo.createCommit("HEAD", author, committer, "first commit", oid, []);
  // commit = await repo.getCommit(commitOid);
  // branch = await repo.createBranch('master', commitOid);
  console.log(`commit_id：${commitOid}`);
})();
```

#### branch
```
var Git = require("nodegit");

(async ()=>{
  repo = await Git.Repository.open("db");
  commit = await repo.getHeadCommit();
  branch = await repo.createBranch("develop", commit, false);
  await repo.checkoutBranch(branch);
  console.log(branch.name());
})();
```

##### reset
```
var Git = require("nodegit");

(async ()=>{
  repo = await Git.Repository.open("db");
  commit = await repo.getHeadCommit();
  await Git.Reset.reset(repo, commit, 3, {});
})();
```

##### clean
> -df等のオプションが付けられない...

```
var Git = require("nodegit");

(async ()=>{
  repo = await Git.Repository.open("db");
  await repo.cleanup();
})();
```
