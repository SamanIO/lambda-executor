# Lambda Executor

[![Travis](https://img.shields.io/travis/SamanIO/lambda-executor.svg?style=flat-square)](https://travis-ci.org/SamanIO/lambda-executor) [![npm](https://img.shields.io/npm/v/lambda-executor.svg?style=flat-square)](https://www.npmjs.com/package/lambda-executor)

A library to easily execute AWS lambda functions from JavaScript code.

## How it works

Pass the lambda function file name and event object to this tester. The lambda function will be executed either

* in a separate process with limited time and memory, the same way it is executed in the lambda environment
* in the same process just limited by time

## Install

`npm install lambda-executor --save-dev`

## Usage

### API

`lambdaTester(fileName, handlerName, event, timeout, memory, callback, sameProcess, babel)`

- `fileName` : absolute filename of lambda function
- `handlerName` : name of exported handler function (default: handler)
- `event` : JSON event object
- `timeout` : timeout in milliseconds
- `memory` : maximum available memory in MB
- `callback(err, result)` : callback function which is executed after execution completed
- `sameProcess` (optional) : boolean if executor should not create a separate child process to execute the function (default: false)
- `babel` (optional) : boolean if babel should be registered to execute es2015 code (default: false)

### Example

```javascript
var lambdaExecutor = require('lambda-executor');
var path = require('path');

describe('My Tests', function() {
  it('should succeed', function(done) {
    lambdaExecutor(path.join(__dirname, 'function.js'), 'handler', {}, 10, 128, function(err, result) {
      //insert assertions here
      done();
    });
  });
});
```

### Modes

#### Different process (default)

By default functions are executed in a different process. This makes the execution very similar to how it is executed
on AWS. However, in this mode you can only return plain objects (without any functions) from the function. The executer
uses communication via process messages which can only plain objects
(https://nodejs.org/api/child_process.html#child_process_event_message).
Also it is not possible to record code coverage if the function is executed in a separate process.

#### Same process
If you use the local mode you can return anything from the lambda function (including Error objects). Also code coverage
can be recorded. However, the execution won't stop if the function consumes more memory then specified. 

## License

MIT
