'use strict';

var expect = require('expect');
var lambdaExecutor = require('../src/index');
var path = require('path');

describe('Lambda Executor external process', function() {
  it('should timeout', function(done) {
    lambdaExecutor(path.join(__dirname, 'functions/nocallback.js'), 'handler', {}, 10, 128, function(err, result) {
      expect(err).toEqual('Function timed out');
      expect(result).toBe(null);
      done();
    });
  });

  it('should run out of memory', function(done) {
    lambdaExecutor(path.join(__dirname, 'functions/memory.js'), 'handler', {}, 15000, 10, function(err, result) {
      expect(err).toEqual('Function ran out of memory');
      expect(result).toBe(null);
      done();
    });
  });

  it('should fail', function(done) {
    lambdaExecutor(path.join(__dirname, 'functions/fail.js'), 'handler', {}, 3000, 10, function(err, result) {
      expect(err).toEqual('Failed');
      expect(result).toBe(null);
      done();
    });
  });

  it('should succeed', function(done) {
    lambdaExecutor(path.join(__dirname, 'functions/succeed.js'), 'handler', {}, 3000, 10, function(err, result) {
      expect(err).toBe(null);
      expect(result).toEqual('Execution successful');
      done();
    });
  });

  it('should succeed with es2015 code', function(done) {
    //Babel loading takes some time
    this.timeout(15000);
    lambdaExecutor(path.join(__dirname, 'functions/es2015.js'), 'handler', {}, 3000, 128, function(err, result) {
      expect(err).toBe(null);
      expect(result).toEqual('Execution successful');
      done();
    }, false, true);
  });
});

describe('Lambda Executor same process', function() {
  it('should timeout', function(done) {
    lambdaExecutor(path.join(__dirname, 'functions/nocallback.js'), 'handler', {}, 10, 128, function(err, result) {
      expect(err).toEqual('Function timed out');
      expect(result).toBe(null);
      done();
    }, true);
  });

  it('should fail', function(done) {
    lambdaExecutor(path.join(__dirname, 'functions/fail.js'), 'handler', {}, 3000, 10, function(err, result) {
      expect(err).toEqual('Failed');
      expect(result).toBe(null);
      done();
    }, true);
  });

  it('should succeed', function(done) {
    lambdaExecutor(path.join(__dirname, 'functions/succeed.js'), 'handler', {}, 3000, 10, function(err, result) {
      expect(err).toBe(null);
      expect(result).toEqual('Execution successful');
      done();
    }, true);
  });
});
