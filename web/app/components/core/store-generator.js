var EventEmitter = require('eventemitter3');
var objectAssign = require('object-assign');

module.exports = function(store) {
  objectAssign(store, EventEmitter.prototype);

  return store;
};
