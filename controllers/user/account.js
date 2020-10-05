const mysql = require('mysql'),
const crypto = require('crypto');

const mySqlClient = mysql.createConnection(require('../../config/db_config'));

const checkPassword = function (req, res) {
  res.render('common/account_check_passwd.html', {});
};

const postPassword = function (req, res) {
  const userPW = crypto.createHash('sha512').update(req.body.pw).digest('base64');
  const Confirm = 'select id from user where user_id = ? && password = ?;';
  mySqlClient.query(Confirm, [req.session.user.userId, userPW], function (err, row) {
    if (row[0]) {
      res.send(
        '<script type="text/javascript">alert("본인인증에 성공하였습니다."); window.location="/";</script>',
      );
    } else {
      res.send(
        '<script type="text/javascript">alert("비밀번호가 틀렸습니다."); window.location="/";</script>',
      );
    }
  });
};

module.exports = {
  checkPassword,
  postPassword,
};
