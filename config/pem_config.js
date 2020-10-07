const fs = require('fs');

const ca = fs.readFileSync('config/secure/client.csr');
const key = fs.readFileSync('config/secure/key.pem');
const cert = fs.readFileSync('config/secure/cert.pem');

module.exports.options = {
  key,
  cert,
  ca,
};
