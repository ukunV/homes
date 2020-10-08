const mysql = require('mysql');
const crypto = require('crypto');

const mySqlClient = mysql.createConnection(require('../../config/db_config'));

const checkPassword = function (req, res) {
  res.render('common/account_check_passwd.html', {
    userType: req.session.user.userType,
  });
};

const postPassword = function (req, res) {
  const userPW = crypto.createHash('sha512').update(req.body.pw).digest('base64');
  const Confirm = 'select id from user where user_id = ? && password = ?;';
  mySqlClient.query(Confirm, [req.session.user.userId, userPW], function (err, row) {
    if (row[0]) {
      res.send('<script type="text/javascript">window.location="/account/management";</script>');
    } else {
      res.send(
        '<script type="text/javascript">alert("비밀번호가 틀렸습니다."); window.location="/check/password";</script>',
      );
    }
  });
};

const loadAccount = function (req, res) {
  const userInfoSql = 'select user_id, type, name, tel from user where user_id=?;';
  mySqlClient.query(userInfoSql, req.session.user.userId, function (err, row) {
    res.render('common/account_management.html', {
      userType: req.session.user.userType,
      ...row[0],
    });
  });
};

const postChangeTel = function (req, res) {
  const tel = req.body.tel;
  const updateTelSql = 'update user set tel = ? where user_id = ?;';
  mySqlClient.query(updateTelSql, [tel, req.session.user.userId], function (err, row) {
    if (err) {
      res.send(
        '<script type="text/javascript">alert("잘못된 DB 접근입니다"); window.history.back();</script>',
      );
    } else {
      res.send(
        '<script type="text/javascript">alert("성공적으로 변경하였습니다."); window.location="/account/management";</script>',
      );
    }
  });
};

const postChangePw = function (req, res) {
  const password = crypto.createHash('sha512').update(req.body.password).digest('base64');
  const updatePwSql = 'update user set password = ? where user_id = ?;';
  mySqlClient.query(updatePwSql, [password, req.session.user.userId], function (err, row) {
    if (err) {
      res.send(
        '<script type="text/javascript">alert("잘못된 DB 접근입니다"); window.history.back();</script>',
      );
    } else {
      res.send(
        '<script type="text/javascript">alert("비밀번호를 성공적으로 변경하였습니다.\\n다시 로그인해주세요:)"); window.location="/process/logout";</script>',
      );
    }
  });
};

module.exports = {
  loadAccount,
  checkPassword,
  postPassword,
  postChangePw,
  postChangeTel,
};
