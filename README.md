# Lambda Executor

[![Travis](https://img.shields.io/travis/SamanIO/lambda-executor.svg?style=flat-square)](https://travis-ci.org/SamanIO/lambda-executor) [![npm](https://img.shields.io/npm/v/lambda-executor.svg?style=flat-square)](https://www.npmjs.com/package/lambda-executor)

A library to easily execute AWS lambda functions from JavaScript code.

## How it works

Pass the lambda function file name and event object to this tester. The lambda function will be executed in a
separate process with limited time and memory, the same way it is executed in the lambda environment.

## Install

`npm install lambda-executor --save-dev`

## Usage

### API

`lambdaTester(fileName, handlerName, event, timeout, memory, callback)`

- `fileName` : absolute filename of lambda function
- `handlerName` : name of exported handler function (default: handler)
- `event` : JSON event object
- `timeout` : timeout in milliseconds
- `memory` : maximum available memory in MB
- `callback(err, result)` : callback function which is executed after execution completed
- `babel` (optional) : boolean if babel should be registered to execute es2015 code

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

## License

MIT
