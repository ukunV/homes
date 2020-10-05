// 로그인 필요없는 라우터  *메인페이지는 안에서 유저타입 검사
// /process/login, /register, /token
// 로그인 체크 미들웨어
const checkLogin = (req, res, next) => {
  if (req.session.user) {
    next();
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

// 건물주 본인건물 체크 미들웨어

// 관리인 본인건물 체크 미들웨어

// 세입자 본인건물 체크 미들웨어

// 로그 저장 미들웨어
const saveLogs = (req, _, next) => {
  const ip_address = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  console.log(`IP Address: ${ip_address}`);
  next();
};

module.exports = { checkLogin, checkHost, checkHostOrManager, checkManager, checkTenant, saveLogs };
