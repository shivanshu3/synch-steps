/**
 * The constructor
 */
var SynchSteps = function() {
   // Instance variables:
   this._steps = [];
};

/**
 * Define a step to be executed.
 */
SynchSteps.prototype.step = function(task) {
   this._steps.push(task);
   return this;
};

/**
 * Execute the chain of steps defined in this object.
 */
SynchSteps.prototype.execute = function() {
   // First n-1 steps:
   for (var i = 0; i < this._steps.length - 1; i++) {
      var thisStep = this._steps[i];
      var nextStep = this._steps[i + 1];
      thisStep(nextStep);
   }

   // Last step:
   var lastStep = this._steps[this._steps.length - 1];
   lastStep(function(){});
};
