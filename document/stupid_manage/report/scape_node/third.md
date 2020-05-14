# third party phase
## 雑多な構造定義
```
cosmos, dimension, universe, chunk,

[worldの仕様策定]
・基底を『dimension』に設定する。
・システムは『dimension/cosmos』のセットとして設定する。
・『cosmos』からリソースを生成し、独自の『cosmos/universe』を生成する。
・利用者の作業領域として基本は『universe/space』配下しか使わない
・利用者として『actor』を定義する。
・利用者の可視化領域として『actor/view』を定義する。
・利用者の作業領域として『workspace』を定義する。

[workspaceの仕様策定]
・space配下に配置する作業領域として実装
・cosmosにdimension.timeをマウントしてtime_frameを設定する
・cosmosにdimension.spaceをマウントしてpointを設定する
```
