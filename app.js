var express = require('express');
var app = express();
var http = require('http').createServer(app);
var path = require('path'),
    bodyParser = require('body-parser'),
    cookieParser = require('cookie-parser'),
    static = require('serve-static'),
    errorHandler = require('errorhandler'),
    expressErrorHandler = require('express-error-handler'),
    expressSession = require('express-session'),
    ejs = require('ejs'),
    fs = require('fs'),
    url = require('url'),
    cors = require('cors') //ajax 요청시 cors 지원

app.set('port', process.env.PORT || 3000);
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use('/public', express.static(__dirname + '/public'));
app.use(cookieParser());
app.use(expressSession({
    secret: 'my key',
    resave: true,
    saveUninitialized: true
}));
app.use(cors());

var router = express.Router();

//메인 페이지 라우터
var index = require('./routes/index.js');
router.route('/').get(index);

//회원가입 라우터
var register = require('./routes/register.js');
router.route('/register').get(register.register);
router.route('/reg_submit').post(register.reg_submit);

//로그인 라우터
var login = require('./routes/login.js');
router.route('/process/login').post(login);

//로그아웃 라우터
var logout = require('./routes/logout.js');
router.route('/process/logout').get(logout);

// 건물주페이지 라우터
var host = require('./routes/host.js');
router.route('/host/management').get(host.host_management);

// 관리인페이지 라우터
var manager = require('./routes/manager.js');
router.route('/manager/management').get(manager.manager_management);

// 세입자페이지 라우터
var tenant = require('./routes/tenant.js');
router.route('/tenant/management').get(tenant.tenant_management);

// 건물주/관리인 알림페이지 라우터
var push = require('./routes/push.js');
router.route('/push').get(push.push);

// 세입자 알림페이지 라우터
var tenant_push = require('./routes/tenant_push.js');
router.route('/tenant/push').get(tenant_push.tenant_push);

// 건물주 건물정보페이지 라우터
var host_aden = require('./routes/host_aden.js');
router.route('/host/aden').get(host_aden.host_aden);

// 관리인 건물정보페이지 라우터
var mgr_aden = require('./routes/mgr_aden.js');
router.route('/mgr/aden').get(mgr_aden.mgr_aden);

//FCM 처리 사용자 디바이스 토큰 관리 라우터
var token = require('./routes/token.js');
router.route('/token').post(token.addToken);

app.use('/', router);

// 404 에러 페이지 처리
var errorHandler = expressErrorHandler({
    static: {
        '404': './public/404.html'
    }
});


app.use(expressErrorHandler.httpError(404));
app.use(errorHandler);


//웹서버 생성
http.listen(app.get('port'),
    function () {
        console.log('server started - port: ' + app.get('port'));
    }
);