const bundledHandler = require('./server-cloud.js');

// Export the handler from the bundled file
exports.handler = bundledHandler.handler;
