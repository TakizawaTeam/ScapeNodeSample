#### 各種フォルダ

> あくまでサブなので、サブプロジェクト別にはフォルダ分けしない
> ui_designsを元にcomponent,systemを作成する。

|フォルダパス | 概要 | 管理方法 |
|:--- | :--- | :---|
|`./component` | 各種コンポーネント開発 | サブプロジェクト名の配下に必ず配置|
|`./system` | 各種システム開発 | サブプロジェクト名の配下に必ず配置|
|`./ui_designs` | 各種デザイン・検証 | `./ui_designs`配下推奨|

#### TestProjects

|プロジェクト名 | 概要 | 状態|
|:--- | :--- | :--- |
|ScapeNode | filesystem淘汰の為のnodeシステム作成<メインプロジェクト> | 試作中|
|web_tarminal | ScapeNode利用の為のwebターミナル | コンポーネント作成中|
|3D_tarminal | webターミナルの3D版を作成 | ModelViewer側で検証中|
|ModelViewer | 3D環境の検証 | 検証中|
|caret_cursor_move | contentEditableによる各種操作検証 | 目的は達成している為保留|
|cron_notification | ブラウザ側で特定時間に処理を実行する検証 | 検証中|
|dissociation | 自立型の解離プログラムの検証 | 試作中|
|canvas_graphs | ライブラリを使わないグラフ表示 | 優先度が低い為保留中|
|free_grid | table要素を使わないgrid要素自作 | 優先度が低い為保留中|
|mbti_bot | MBTIによる対話型の心理診断ボット作成 | 試作中|
|rhythm_man | MVから引用したリズムマンをweb部品化 | 汎用化中|
|rhythm_man_ex | 関節まで自由なリズムマンの拡張版 | rhythm_man優先|
|StaticWebServer | 検証の為の静的webサーバー | 完了|
|ReplServer | replをwebから利用する為のサーバー | 完了|
