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
