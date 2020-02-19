#### Get Started

> https://www.npmjs.com/package/node-repl-await?activeTab=readme <br>
> replサーバーにて、TopLevelAwaitを処理出来るようにする

##### Node's processTopLevelAwait
>Standalone util function from Node.js core to process await statements in REPL.
>Since v10.0.0, Node.js introduced a new experimental feature to support await keyword in the REPL by using the argument --experimental-repl-await, however, if a user wants to implement a custom REPL console, there would be no await-support at all, to achieve such a goal, this package clones the internal module of await-support to form a standalone version, allowing users share the benefits of await-support in their own REPL environments.
>See Node.js docs for more details, and contribute to the original source.

##### Example
```
const repl = require("repl");
const vm = require("vm");
const { processTopLevelAwait } = require("node-repl-await");

function isRecoverableError(error) {
    if (error.name === 'SyntaxError') {
        return /^(Unexpected end of input|Unexpected token)/.test(error.message);
    }
    return false;
}

async function myEval(code, context, filename, callback) {
    code = processTopLevelAwait(code) || code;

    try {
        let result = await vm.runInNewContext(code, context);
        callback(null, result);
    } catch (e) {
        if (isRecoverableError(e)) {
            callback(new repl.Recoverable(e));
        } else {
            console.log(e);
        }
    }
}

repl.start({ prompt: '> ', eval: myEval });
```
