var SynchSteps = require('../index.js');
var assert = require('assert');

var testString = '';

var steps = new SynchSteps();
steps.step(function(next) {
   setTimeout(function() {
      testString += 'a';
      next();
   }, 100);
}).step(function(next) {
   setTimeout(function() {
      testString += 'b';
      next();
   }, 60);
}).step(function(next) {
   setTimeout(function() {
      testString += 'c';
      next();
   }, 20);
});

steps.execute(function() {
   assert.equal(testString, 'abc');
   console.log('All tests passed!');
});
