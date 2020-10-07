const fs = require('fs');
const keys_dir = 'config/secure/';
const ca = fs.readFileSync(keys_dir + 'ca.ca-bundle');
const key = fs.readFileSync(keys_dir + 'key.pem');
const cert = fs.readFileSync(keys_dir + 'cert.crt');

module.exports.options = {
  key,
  cert,
  ca,
};
