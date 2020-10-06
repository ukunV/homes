const mysql = require('mysql');

const mySqlClient = mysql.createConnection(require('../config/db_config'));

// 로그인 필요없는 라우터  *메인페이지는 안에서 유저타입 검사
// /process/login, /register, /token
// 로그인 체크 미들웨어
const checkLogin = (req, res, next) => {
  if (req.session.user) {
    const pushCountSql = 'select count(msgID) as count from messages where receiver=?;';
    mySqlClient.query(pushCountSql, req.session.user.userId, function(err, row){
      if (err){
        next();
      } else {
        res.cookie('pushCount', row[0].count, {overwrite: true});
        next();
      }
    });
  } else {
    res.send(
      '<script type="text/javascript">alert("로그인 후 이용하세요."); window.location="/";</script>',
      );
  }
};

const permissionBanMsg = '잘못된 접근입니다.';

// 건물주/관리인 동시 체크 미들웨어
const checkHostOrManager = (req, res, next) => {
  if (req.session.user.userType === '건물주' || req.session.user.userType === '관리인') {
    next();
  } else {
    res.send(
      `<script type="text/javascript">alert("${permissionBanMsg}"); window.location="/";</script>`,
      );
  }
};

// 건물주 체크 미들웨어
const checkHost = (req, res, next) => {
  if (req.session.user.userType === '건물주') {
    next();
  } else {
    res.send(
      `<script type="text/javascript">alert("${permissionBanMsg}"); window.location="/";</script>`,
      );
  }
};

// 관리인 체크 미들웨어
const checkManager = (req, res, next) => {
  if (req.session.user.userType === '관리인') {
    next();
  } else {
    res.send(
      `<script type="text/javascript">alert("${permissionBanMsg}"); window.location="/";</script>`,
      );
  }
};

// 세입자 체크 미들웨어
const checkTenant = (req, res, next) => {
  if (req.session.user.userType === '세입자') {
    next();
  } else {
    res.send(
      `<script type="text/javascript">alert("${permissionBanMsg}"); window.location="/";</script>`,
      );
  }
};

// 에러 로그 저장 미들웨어
const saveErrorLogs = (req, _, next) => {
  const ip_address = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  console.log(`IP Address: ${ip_address}`);
  next();
};

// 건물 권한체크 함수
const checkAccessibleBuilding = (checkingNum, req, isRepair = 0) => {
  const userId = req.session.user.userId;
  const userType = req.session.user.userType;

  let checkSql;

  if (userType === '건물주') {
    checkSql =
    'SELECT buildingNum FROM buildings b, user u WHERE b.hostID = u.user_id AND buildingNum = ? AND user_id = ?;';
  } else if (userType === '관리인') {
    checkSql =
    'SELECT buildingNum FROM buildings b, user u WHERE b.managerID = u.user_id AND buildingNum = ? AND user_id = ?;';
  } else if (userType === '세입자') {
    if (isRepair === 1) {
      checkSql =
      'SELECT repairNum FROM buildings b, room ro, user u, repair re WHERE b.buildingNum = ro.buildNum AND ro.tenantID = u.user_id AND re.roomID = ro.roomID AND repairNum = ? AND user_id= ?';
    } else {
      checkSql =
      'SELECT buildingNum FROM buildings b, room r, user u WHERE b.buildingNum = r.buildNum AND r.tenantID = u.user_id AND buildingNum = ? AND user_id=?;';
    }
  }

  return new Promise((resolve, reject) => {
    mySqlClient.query(checkSql, [checkingNum, userId], (err, row) => {
      if (err) {
        reject('Database Error');
      } else {
        if (row.length === 0) {
          reject('No Accessible Data Error');
        }
        resolve('Success');
      }
    });
  });
};

module.exports = {
  checkLogin,
  checkHost,
  checkHostOrManager,
  checkManager,
  checkTenant,
  saveErrorLogs,
  checkAccessibleBuilding,
};
