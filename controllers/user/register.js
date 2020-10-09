const mysql = require('mysql');
const crypto = require('crypto');

const mySqlClient = mysql.createConnection(require('../../config/db_config'));

const alertMsgDb = '회원가입 중 오류가 발생했습니다.';
const alertMsgSuccess = '회원가입을 완료했습니다.';

const getRegister = function (req, res) {
  res.render('register.html', {
    inputId: '',
    right: 3,
  });
};

const postRegister = function (req, res) {
  const user_id = req.body.id,
    password = crypto.createHash('sha512').update(req.body.pw).digest('base64'), // Converted hashed pw to save database
    name = req.body.name,
    tel = req.body.tel,
    type = req.body.type;

  const params = {
    user_id,
    password,
    name,
    tel,
    type,
  };

  const checkIdSql = 'SELECT * FROM user WHERE user_id = ?;';
  mySqlClient.query(checkIdSql, params.user_id, function (err, rows) {
    if (err) {
      console.error('Search Error>>' + err);
      res.send(
        `<script type="text/javascript">alert("${alertMsgDb}"); window.history.back();</script>`,
      );
    } else {
        var insertSql = 'INSERT INTO user SET ?;';
        mySqlClient.query(insertSql, params, function (err) {
          if (err) {
            console.error('Insert Error>>' + err);
            res.send(
              `<script type="text/javascript">alert("${alertMsgDb}"); window.history.back();</script>`,
            );
          } else {
            res.send(
              `<script type="text/javascript">alert("${alertMsgSuccess}"); location.href='/';</script>`,
            );
          }
        });
      }
  });

};
const checkId = function (req, res) {
  const user_id = req.body.id;
  const checkIdSql = 'select id from user where user_id = ?;';
  mySqlClient.query(checkIdSql, user_id, function (err, row) {
    console.log(row);
    if (row.length > 0) {
      res.render('register.html', {
        inputId: user_id,
        right: 0
      });
    } else {
      res.render('register.html', {
        inputId: user_id,
        right: 1,
      });
    }
  });
}

module.exports = {
  getRegister,
  postRegister,
  checkId,
};
