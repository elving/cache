// Require babel require hook to enable ES6
require('babel/register');

// Load to environment variables
require('dotenv').load();

if (process.env.NODE_ENV === 'production') {
  var raven = require('raven');

  // Start Sentry
  var client = new raven.Client('https://28a0cb6c53f84839b0528a96559b1b49:e194ed7340d64b4d9fcec67242281ec7@app.getsentry.com/52287');
  client.patchGlobal();
}

// Start server
require('./server');
