# synch-steps
Callback hell alternative! Synchronously execute steps.

## Usage
```javascript
var synchSteps = require('synch-steps');
var fs = require('fs');

synchSteps.step(next, function() {
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
}).step(next, function() {
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
}).step(next, function() {
   // This is the last step in this example:
   // This step executes after the previous step is done executing
   next();
});
```
