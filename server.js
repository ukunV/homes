const app = require('./app.js');
const port = process.env.PORT || 3000;

// Server Timer (매달 정산일 초기화)
const timer = require('./controllers/common/timer').timer;

app.listen(port, function () {
  console.log(`Express listening on port ${port}`);
});
