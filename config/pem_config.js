const fs = require('fs');

module.exports.options = {
  key: fs.readFileSync('config/secure/private.pem'),
  cert: fs.readFileSync('config/secure/public.pem'),
};
