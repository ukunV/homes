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

module.exports = { checkLogin };
