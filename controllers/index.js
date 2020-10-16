const { Router } = require('express');
const router = Router();

// import middlewares
const checkLoginAndPush = require('./checkTools').checkLoginAndPush;
const checkHost = require('./checkTools').checkHost;
const checkHostOrManager = require('./checkTools').checkHostOrManager;
const checkManager = require('./checkTools').checkManager;
const checkTenant = require('./checkTools').checkTenant;
// 1차 배포 후 에러 수집기 만들기
const saveErrorLogs = require('./checkTools').saveErrorLogs;

// 메인 페이지
const main = require('./common/main.js');
router.route('/').get(main);

// 회원가입
const register = require('./user/register.js');
router.route('/register').get(register.getRegister);
router.route('/register').post(register.postRegister);
router.route('/register/checkId').post(register.checkId);

// 로그인
const login = require('./user/login.js');
router.route('/process/login').get(login.getLogin);
router.route('/process/login').post(login.postLogin);

// 로그아웃
const logout = require('./user/logout.js');
router.route('/process/logout').get(checkLoginAndPush, logout);

// FCM 처리 사용자 디바이스 토큰 관리
const token = require('./common/token.js');
router.route('/token').post(token.addToken);

// (공통) 계정관리
const account = require('./user/account.js');
router.route('/check/password').get(checkLoginAndPush, account.checkPassword);
router.route('/check/password_submit').post(checkLoginAndPush, account.postPassword);
router.route('/account/management').get(checkLoginAndPush, account.loadAccount);
router.route('/account/tel_submit').post(checkLoginAndPush, account.postChangeTel);
router.route('/account/password_submit').post(checkLoginAndPush, account.postChangePw);

// (공통) 설정
const setting = require('./common/setting');
router.route('/setting').get(checkLoginAndPush, setting);

// (세입자) 판다
const pandaimgUpload = require('./panda/img_upload').imgUpload; // 이미지 업로드 모듈
const panda = require('./panda/panda');
router.route('/panda').get(checkLoginAndPush, checkTenant, panda.getPanda);
router.route('/panda/add').get(checkLoginAndPush, checkTenant, panda.getAddProduct);
router
  .route('/panda/add')
  .post(checkLoginAndPush, checkTenant, pandaimgUpload.single('img'), panda.postAddProduct);
router.route('/panda/product/:pid').get(checkLoginAndPush, checkTenant, panda.getProduct);
router.route('/panda/sold/:pid').get(checkLoginAndPush, checkTenant, panda.productSold);

// (세입자) 긴급신고
const emergency = require('./common/emergency');
router.route('/emergency/fire').get(checkLoginAndPush, checkTenant, emergency.getEmergency);
router.route('/emergency/fire').post(checkLoginAndPush, checkTenant, emergency.postEmergency);
router.route('/emergency/fire/success').get(checkLoginAndPush, checkTenant, emergency.finishReport);

// (건물주/관리인) 기능페이지
const getFunction = require('./common/function');
router.route('/function').get(checkLoginAndPush, checkHostOrManager, getFunction);

// (공통) 알림페이지
const push = require('./common/push.js');
router.route('/push').get(checkLoginAndPush, push.push);

// (건물주/관리인) 유지보수
const repairs = require('./common/repairs');
router.route('/repair_list').get(checkLoginAndPush, checkHostOrManager, repairs.loadRepairList);

// (공통) 유지보수 상세보기
const view_repair = require('./common/view_repair');
router.route('/view_repair/:id').get(checkLoginAndPush, view_repair.loadRepair);

// (공통) 푸시 (알림 보내기)
const send_push = require('./common/send_push');
router.route('/message/').get(checkLoginAndPush, send_push.loadSendList_each); // 개별 알림보내기(user_id, buildingNum)
router
  .route('/tenant/function/message')
  .get(checkLoginAndPush, checkTenant, send_push.loadSendList_tenant); // 세입자 알림보내기
router
  .route('/host/function/message')
  .get(checkLoginAndPush, checkHost, send_push.loadSendList_host); // 건물주 알림보내기
router
  .route('/manager/function/message')
  .get(checkLoginAndPush, checkManager, send_push.loadSendList_mgr); // 관리인 알림보내기
// POST - 알림 전송
router.route('/submit_message/').post(checkLoginAndPush, send_push.sendPush);
// 알림 읽음 처리
router.route('/message/read/:id').get(checkLoginAndPush, send_push.readPush);

// (건물주) 메인
const host = require('./host/host.js');
router.route('/host').get(checkLoginAndPush, checkHost, host.host);

// (관리인) 메인
const manager = require('./manager/manager.js');
router.route('/manager').get(checkLoginAndPush, checkManager, manager.manager);

// (세입자) 메인
const tenant = require('./tenant/tenant.js');
router.route('/tenant').get(checkLoginAndPush, checkTenant, tenant.tenant);

// (건물주) 건물정보
const host_aden = require('./host/host_aden.js');
router.route('/host/aden/:id').get(checkLoginAndPush, checkHost, host_aden.host_aden);

// (건물주) 월세 미납여부 변경
const host_aden_paymentok = require('./host/host_aden_paymentok.js');
router
  .route('/host/change/paymentok/')
  .get(checkLoginAndPush, checkHost, host_aden_paymentok.changePaymentok);

// (관리인) 건물정보
const mgr_aden = require('./manager/mgr_aden.js');
router.route('/manager/aden/:id').get(checkLoginAndPush, checkManager, mgr_aden.mgr_aden);

// (건물주) 관리
const host_management = require('./host/host_management.js');
router.route('/host/management').get(checkLoginAndPush, checkHost, host_management.host_management);

// (건물주) 건물 등록
const host_management_register = require('./host/host_mgmt_register.js');
router
  .route('/host/management/register')
  .get(checkLoginAndPush, checkHost, host_management_register.host_mgmt_register);
router
  .route('/host/management/reg_submit')
  .post(checkLoginAndPush, checkHost, host_management_register.registerSubmit);

// (세입자) 기능
const tenant_function = require('./tenant/tenant_function.js');
router
  .route('/tenant/function')
  .get(checkLoginAndPush, checkTenant, tenant_function.tenant_function);

// (건물주) 건물 수정
const mgmt_building = require('./host/mgmt_building.js');
router
  .route('/host/management/modify')
  .get(checkLoginAndPush, checkHost, mgmt_building.mgmt_building_list); // 건물 리스트 표시
router
  .route('/host/management/modify/:id')
  .get(checkLoginAndPush, checkHost, mgmt_building.mgmt_building_modify); // 수정할 건물 표시 (modify 화면)

// (건물주) 건물 수정 유형별 POST
const mgmt_building_modify_submit = require('./host/mgmt_building_modify_submit');
router
  .route('/host/modify/submit/:toChange')
  .post(checkLoginAndPush, checkHost, mgmt_building_modify_submit.mgmt_building_modify_submit);

// (세입자) 유지보수 리스트
const tenant_repair_list = require('./tenant/repair_list');
router
  .route('/tenant/repair_list')
  .get(checkLoginAndPush, checkTenant, tenant_repair_list.repairList);

// (세입자) 유지보수 등록
const imgUpload = require('./tenant/img_upload').imgUpload; // 이미지 업로드 모듈
const tenant_repair = require('./tenant/add_repair');
router
  .route('/tenant/function/register_repair')
  .get(checkLoginAndPush, checkTenant, tenant_repair.loadAddRepair); // 하자 등록 이동
router
  .route('/tenant/function/repair_submit')
  .post(
    checkLoginAndPush,
    checkTenant,
    imgUpload.single('img'),
    send_push.sendPush_repair,
    tenant_repair.addRepair,
  ); // 하자 등록

// (세입자) 유지보수 완료
const solveRepair = require('./tenant/solve_repair');
router
  .route('/tenant/solve_repair/:id')
  .get(checkLoginAndPush, checkTenant, solveRepair.solveRepair);

module.exports = router;
