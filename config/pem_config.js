const fs = require('fs');
const keys_dir = 'config/secure/';
const ca = fs.readFileSync(keys_dir + 'client.csr');
const key = fs.readFileSync(keys_dir + 'key.pem');
const cert = fs.readFileSync(keys_dir + 'cert.pem');

module.exports.options = {
  key,
  cert,
  ca,
};
