var SynchSteps = require('../index.js');
var assert = require('assert');

var testString1 = '';

var steps = new SynchSteps();
steps.step(function(next) {
   setTimeout(function() {
      testString1 += 'a';
      next();
   }, 100);
}).step(function(next) {
   setTimeout(function() {
      testString1 += 'b';
      next();
   }, 60);
}).step(function(next) {
   setTimeout(function() {
      testString1 += 'c';
      next();
   }, 20);
});

steps.execute(function() {
   assert.equal(testString1, 'abc');
   console.log('All tests passed!');
});

// Running execute the second time should cause an exception to be thrown.
// Adding a step after calling execute should also cause an exception to be thrown.
steps = new SynchSteps();
steps.step(function(next) {
   next();
}).step(function(next) {
   next();
});
steps.execute();
try {
   steps.execute();
   // It should not reach here. It should have thrown an exception
   assert(false);
} catch(err) {
   assert.equal(err.message, 'Cannot call execute twice');
}
try {
   steps.step(function(next) {
      next();
   });
   // It should not reach here. It should have thrown an exception
   assert(false);
} catch(err) {
   assert.equal(err.message, 'Cannot add a step after calling execute');
}

// Running without any steps, and without passing a callback to execute shouldn't
// cause it to crash:
steps = new SynchSteps();
steps.execute();

// Testing the stop function to prevent execution of the rest of the steps
// in the chain
var testString2 = '';
steps = new SynchSteps();
steps.step(function(next) {
   testString2 += 'x';
   next();
}).step(function(next, stop) {
   testString2 += 'y';
   stop();
}).step(function(next) {
   testString2 += 'z';
   next();
});
steps.execute(function() {
   assert.equal(testString2, 'xy');
});
