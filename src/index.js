'use strict';

var childProcess = require('child_process');

/**
 * Test a Lambda function using the given parameters
 *
 * @param {string} func Filename of the file containing the lambda function
 * @param {string} handler Handler name which is exported by the function
 * @param {object} event JSON Object which is passed to the function
 * @param {int} timeout Lambda function timeout
 * @param {int} memory Maximum memory for function (in MB)
 * @param {function} callback Callback function which is called after execution completed
 * @param {boolean} babel Register babel to use ES2015 syntax
 */
module.exports = function(func, handler, event, timeout, memory, callback, babel) {
  var tester = childProcess.fork('./executor', [], {
    cwd: __dirname,
    execArgv: [
      '--max-old-space-size=' + memory
    ]
  });

  //Start execution
  tester.send({
    func: func,
    handler: handler || 'handler',
    event: event,
    timeout: timeout,
    babel: babel || false
  });

  tester.on('message', function(msg) {
    if (!callback) return;
    callback(msg.err, msg.result);
  });

  tester.on('exit', function(code, signal) {
    if (!callback) return;
    switch (code) {
      case 0:
        break;
      case 1: // Windows
      case 8: // Ubuntu
        callback('JavaScript error (see console)', null);
        break;
      case 3: //Windows only no code in Ubuntu
        callback('Function ran out of memory', null);
        break;
      case 99:
        callback('Function timed out', null);
        break;
    }
    switch (signal) {
      case 'SIGABRT': // Ubuntu
        callback('Function ran out of memory', null);
        break;
    }
  });
};
