const app = require('./app.js');
const https = require('https');
const options = require('./config/pem_config').options;
const port = process.env.PORT || 3000;

// Server Timer (매달 정산일 초기화)
const timer = require('./controllers/common/timer').timer;

https.createServer(options, app).listen(port, function () {
  console.log(`Express listening on port ${port}`);
});
