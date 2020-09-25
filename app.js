const express = require('express');
const app = express();
const http = require('http').createServer(app);
const path = require('path'),
  bodyParser = require('body-parser'),
  cookieParser = require('cookie-parser'),
  static = require('serve-static'),
  expressErrorHandler = require('express-error-handler'),
  expressSession = require('express-session'),
  ejs = require('ejs'),
  fs = require('fs'),
  url = require('url'),
  cors = require('cors'); //ajax 요청시 cors 지원

// Server Timer (매달 정산일 초기화)
const timer = require('./routes/common/timer').timer;

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

//메인 페이지 라우터
const index = require('./routes/common/index.js');
router.route('/').get(index);

//회원가입 라우터
const register = require('./routes/common/register.js');
router.route('/register').get(register.register);
router.route('/reg_submit').post(register.reg_submit);

//로그인 라우터
const login = require('./routes/common/login.js');
router.route('/process/login').post(login);

//로그아웃 라우터
const logout = require('./routes/common/logout.js');
router.route('/process/logout').get(logout);

// 건물주페이지 라우터
const host = require('./routes/host/host.js');
router.route('/host').get(host.host);

// 관리인페이지 라우터
const manager = require('./routes/manager/manager.js');
router.route('/manager').get(manager.manager);

// 세입자페이지 라우터
const tenant = require('./routes/tenant/tenant.js');
router.route('/tenant').get(tenant.tenant);

// 알림페이지 라우터
const push = require('./routes/common/push.js');
router.route('/push').get(push.push);

// 건물주 건물정보페이지 라우터
const host_aden = require('./routes/host/host_aden.js');
router.route('/host/aden/:id').get(host_aden.host_aden);

const host_aden_paymentok = require('./routes/host/host_aden_paymentok.js');
router.route('/host/change/paymentok/').get(host_aden_paymentok.changePaymentok);

// 관리인 건물정보페이지 라우터
const mgr_aden = require('./routes/manager/mgr_aden.js');
router.route('/mgr/aden').get(mgr_aden.mgr_aden);

// 건물주 관리페이지 라우터
const host_management = require('./routes/host/host_management.js');
router.route('/host/management').get(host_management.host_management);

// 건물주 건물 등록 라우터
const host_management_register = require('./routes/host/host_mgmt_register.js');
router.route('/host/management/register').get(host_management_register.host_mgmt_register);
router.route('/host/management/reg_submit').post(host_management_register.reg_submit);

// 건물주/관리인 기능페이지 라우터
const loadFunction = require('./routes/common/loadFunction');
router.route('/function').get(loadFunction.loadFunction);

// 건물주/관리인 유지보수 라우터
const repairs = require('./routes/common/repairs');
router.route('/repair_list').get(repairs.loadRepairList);

// 세입자 기능페이지 라우터
const tenant_function = require('./routes/tenant/tenant_function.js');
router.route('/tenant/function').get(tenant_function.tenant_function);

// 건물주 - 건물 수정 라우터
const mgmt_building = require('./routes/host/mgmt_building.js');
router.route('/host/management/modify').get(mgmt_building.mgmt_building_list); // 건물 리스트 표시
router.route('/host/management/modify/:id').get(mgmt_building.mgmt_building_modify); // 수정할 건물 표시 (modify 화면)

// 건물주 - 건물 수정 유형별 Submit 라우터(POST)
const mgmt_building_modify_submit = require('./routes/host/mgmt_building_modify_submit');
router
  .route('/host/modify/submit/:toChange')
  .post(mgmt_building_modify_submit.mgmt_building_modify_submit);

// 세입자 - 유지보수 리스트 라우터
const tenant_repair_list = require('./routes/tenant/repair_list');
router.route('/tenant/repair_list').get(tenant_repair_list.repairList);

// 세입자 - 유지보수 등록 라우터
const imgUpload = require('./routes/tenant/img_upload').imgUpload; // 이미지 업로드 모듈
const tenant_repair = require('./routes/tenant/add_repair');
router.route('/tenant/function/register_repair').get(tenant_repair.loadAddRepair); // 하자 등록 이동
router
  .route('/tenant/function/repair_submit')
  .post(imgUpload.single('img'), tenant_repair.addRepair); // 하자 등록

// 세입자 - 유지보수 완료 라우터
const solveRepair = require('./routes/tenant/solve_repair');
router.route('/tenant/solve_repair/:id').get(solveRepair.solveRepair);

// 공통 - 유지보수 상세보기 라우터
const view_repair = require('./routes/common/view_repair');
router.route('/view_repair/:id').get(view_repair.loadRepair);

//FCM 처리 사용자 디바이스 토큰 관리 라우터
const token = require('./routes/common/token.js');
router.route('/token').post(token.addToken);

app.use('/', router);

// 404 에러 페이지 처리
const errorHandler = expressErrorHandler({
  static: {
    404: './public/404.html',
  },
});

app.use(expressErrorHandler.httpError(404));
app.use(errorHandler);

//웹서버 생성
http.listen(app.get('port'), function () {
  console.log('server started - port: ' + app.get('port'));
  console.log(`db_host: ${process.env.DATABASE_HOST}`);
});
