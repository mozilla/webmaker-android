var Model = require('./model-class');

// Mobile Appmaker needs to share a single instance;
// You should *never* use model-class directly, except
// intests.
module.exports = new Model();
