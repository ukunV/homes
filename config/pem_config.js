const fs = require('fs');

const key = fs.readFileSync('config/secure/key.pem');
const cert = fs.readFileSync('config/secure/cert.pem');

module.exports.options = {
  key,
  cert,
};
