const app = require('./app.js');
const https = require('https');
const options = require('./config/pem_config').options;
const port_http = 80;
const port_https = 443;

// Server Timer (매달 정산일 초기화)
const timer = require('./controllers/common/timer').timer;
https.createServer(options, app).listen(port_https, () => {
  console.log(`HTTPS: Express listening on port ${port_https}`);
});

app.listen(port_http, () => {
  console.log(`HTTP: Express listening on port ${port_http}`);
});
