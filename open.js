// CLI = node open.js http://localhost:3001/webpack-dev-server/
var open = require('open');
var url = process.argv[2];
open(url);
