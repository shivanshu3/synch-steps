# synch-steps
Callback hell alternative! Synchronously execute steps.

## Usage
```javascript
var SynchSteps = require('synch-steps');
var fs = require('fs');

var fooBarSteps = new SynchSteps();

fooBarSteps.step(function(next) {
   var foo = 10;
   var bar = 20;
   fs.readFile('/foo', function(err, result) {
      if (err) {
         // handle err
      } else {
         // process the file contents
      }
      next();
   });
}).step(function(next) {
   // This step executes after the previous step is done executing
   var baz = 20;
   fs.readFile('/bar', function(err, result) {
      if (err) {
         // handle err
      } else {
         // process the file contents
      }
      next();
   });
}).step(function(next) {
   // This is the last step in this example:
   // This step executes after the previous step is done executing
   next();
});

fooBarSteps.execute(function() {
   console.log('All steps are now done executing.');
});
```

You can choose to stop the execution of further statements by calling
the stop() function as follows:

```javascript
var SynchSteps = require('synch-steps');
var assert = require('assert');

var testString = '';

steps = new SynchSteps();

steps.step(function(next) {
   testString += 'x';
   next();
}).step(function(next, stop) {
   testString += 'y';
   stop();
}).step(function(next) {
   testString += 'z';
   next();
});

steps.execute(function() {
   assert.equal(testString, 'xy');
});
```
