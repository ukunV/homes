const ejs = require('ejs'),
fs = require('fs'),
mysql = require('mysql'),
crypto = require('crypto');

const mySqlClient = mysql.createConnection(require('../../config/db_config'));

const checkPassword = function (req, res) {
  if (req.session.user) {
    fs.readFile('./public/common/account_check_passwd.html', 'utf8', function (error, data) {      res.send(
      ejs.render(data, {

      }),
      );
  });
  } else {
    res.send(
      '<script type="text/javascript">alert("로그인 후 이용하세요."); window.location="/";</script>',
      );
  }
};

const password_submit = function (req, res) {
  const userPW = crypto.createHash('sha512').update(req.body.pw).digest('base64');
  const Confirm = 'select id from user where user_id = ? && password = ?;';
  mySqlClient.query(Confirm, [req.session.user.userId, userPW], function(err, row){
    if(row[0]){
      res.send('<script type="text/javascript">alert("본인인증에 성공하였습니다."); window.location="/";</script>');
    }else {
      res.send('<script type="text/javascript">alert("비밀번호가 틀렸습니다."); window.location="/";</script>');
    }
  });
};


module.exports.checkPassword = checkPassword;
module.exports.password_submit = password_submit;