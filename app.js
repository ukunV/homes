const express = require('express');
const app = express();
const http = require('http').createServer(app);
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const static = require('serve-static');
const expressErrorHandler = require('express-error-handler');
const expressSession = require('express-session');
const ejs = require('ejs');
const fs = require('fs');
const url = require('url');
const cors = require('cors'); //ajax 요청시 cors 지원
let errorHandler = require('errorhandler');

app.set('port', process.env.PORT || 3000);
app.use(express.json());
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  }),
);
app.use('/public', express.static(__dirname + '/public'));
app.use(cookieParser());
app.use(
  expressSession({
    secret: 'my key',
    resave: true,
    saveUninitialized: true,
  }),
);
app.use(cors());

const router = express.Router();

// 메인페이지
const index = require('./routes/index.js');
router.route('/').get(index);

app.use('/', router);

// 404 에러 페이지 처리
errorHandler = expressErrorHandler({
  static: {
    404: './public/404.html',
  },
});

app.use(expressErrorHandler.httpError(404));
app.use(errorHandler);

http.listen(app.get('port'), function () {
  console.log('server started - port: ' + app.get('port'));
});
