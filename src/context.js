'use strict';

/**
 * Context object which is passed to the lambda function
 *
 * @constructor
 * @param callback
 */
var Context = function(callback) {
  this.callback = callback;
};

/**
 * Indicates the Lambda function execution and all callbacks completed successfully
 *
 * @param result An optional parameter and it can be used to provide the result of the function execution.
 */
Context.prototype.succeed = function(result) {
  this.callback(null, result);
};

/**
 * Indicates the Lambda function execution and all callbacks completed unsuccessfully, resulting in a handled exception.
 *
 * @param error An optional parameter that you can use to provide the result of the Lambda function execution.
 */
Context.prototype.fail = function(error) {
  this.callback(error, null);
};

/**
 * Causes the Lambda function execution to terminate.
 *
 * @param error An optional parameter that you can use to provide results of the failed Lambda function execution.
 * @param result An optional parameter that you can use to provide the result of a successful function execution.
 */
Context.prototype.done = function(error, result) {
  this.callback(error, result);
};

/**
 * Returns the approximate remaining execution time (before timeout occurs) of the Lambda function that is currently
 * executing. The timeout is one of the Lambda function configuration. When the timeout reaches, AWS Lambda terminates
 * your Lambda function.
 */
Context.prototype.getRemainingTimeInMillis = function() {

};

module.exports = Context;
