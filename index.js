/**
 * The constructor
 */
var SynchSteps = function() {
   // Instance variables:
   this._steps = [];
   this._nextCallbacks = [];
   this._executionCompleteCallback = null;
   this._executionStarted = false;
};

/** PUBLIC METHODS **/

/**
 * Define a step to be executed.
 */
SynchSteps.prototype.step = function(task) {
   if (this._executionStarted) {
      throw new Error("Cannot add a step after calling execute");
   }

   this._steps.push(task);
   return this;
};

/**
 * Execute the chain of steps defined in this object.
 */
SynchSteps.prototype.execute = function(callback) {
   if (this._executionStarted) {
      throw new Error("Cannot call execute twice");
   }

   this._executionStarted = true;

   this._executionCompleteCallback = ((callback == undefined) || (callback == null))
      ? function(){} : callback;

   // If there are no steps, then we are done:
   if (this._steps.length == 0) {
      this._executionCompleteCallback();
      return;
   }

   // Generate the next callbacks:
   var _this = this;
   for (var i = 0; i < this._steps.length; i++) {
      (function() {
         var stepIndex = i;
         var nextCallback = function() {
            _this._nextCallback(stepIndex);
         };
         _this._nextCallbacks.push(nextCallback);
      })();
   }

   var firstStep = this._steps[0];
   var firstCallback = this._nextCallbacks[0];
   firstStep(firstCallback, function() {
      _this._stopCallback();
   });
};

/** PRIVATE METHODS **/

/**
 * This method is called after the next() function is called
 * in the user code. stepIndex is the step number of the step which
 * just finished execution. (Step numbering starts from 0).
 */
SynchSteps.prototype._nextCallback = function(stepIndex) {
   var _this = this;

   // Was this the last step?
   if (stepIndex == this._steps.length - 1) {
      this._executionCompleteCallback();
      return;
   }

   // Not the last step:
   else {
      var nextStep = this._steps[stepIndex + 1];
      var nextCallback = this._nextCallbacks[stepIndex + 1];
      nextStep(nextCallback, function() {
         _this._stopCallback();
      });
   }
};

/**
 * This method is called after the stop() function is called
 * in the user code.
 */
SynchSteps.prototype._stopCallback = function(stepIndex) {
   this._executionCompleteCallback();
}

module.exports = SynchSteps;
