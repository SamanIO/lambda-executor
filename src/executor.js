'use strict';

var timers = require('timers');
var Context = require('./context');

process.on('message', function(msg) {
  if (msg.babel) {
    console.log('Register babel');
    require('babel-core/register');
  }

  var func = require(msg.func)[msg.handler];

  var context = new Context(function(err, result) {
    process.send({
      err: err,
      result: result
    });
    process.exit(0);
  });

  console.log('Executing function');
  timers.setTimeout(function() {
    process.exit(99);
  }, msg.timeout);

  func(msg.event, context);
});
