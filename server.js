const app = require('./app.js');
const https = require('https');
const options = require('./config/pem_config').options;
const httpPort = 80;
const httpsPort = 443;

// Server Timer (매달 정산일 초기화)
const timer = require('./controllers/common/timer').timer;
https.createServer(options, app).listen(httpsPort, () => {
  console.log(`HTTPS: Express listening on port ${httpsPort}`);
});

app.listen(httpPort, () => {
  console.log(`HTTP: Express listening on port ${httpPort}`);
});
