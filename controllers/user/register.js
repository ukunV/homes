const mysql = require('mysql');
const crypto = require('crypto');

const mySqlClient = mysql.createConnection(require('../../config/db_config'));

const alertMsgTel = '연락처 입력이 잘못되었습니다.';
const alertMsgId = '아이디는 영어/숫자 4-12자리로 입력해주세요.';
const alertMsgDb = '회원가입 중 오류가 발생했습니다.';
const alertMsgUsing = '이미 사용중인 아이디입니다.';
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

  const result = checkInput(params);

  if (result == 2) {
    res.send(
      `<script type="text/javascript">alert("${alertMsgTel}"); window.history.back();</script>`,
    );
  } else if (result == 3) {
    res.send(
      `<script type="text/javascript">alert("${alertMsgId}"); window.history.back();</script>`,
    );
  } else {
    const checkIdSql = 'SELECT * FROM user WHERE user_id = ?;';
    mySqlClient.query(checkIdSql, params.user_id, function (err, rows) {
      if (err) {
        console.error('Search Error>>' + err);
        res.send(
          `<script type="text/javascript">alert("${alertMsgDb}"); window.history.back();</script>`,
        );
      } else {
        if (rows.length > 0) {
          res.send(
            `<script type="text/javascript">alert("${alertMsgUsing}"); window.history.back();</script>`,
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
      }
    });
  }
};
const checkId = function(req, res) {
  const user_id = req.body.id;
  const checkIdSql = 'select id from user where user_id = ?;';
  mySqlClient.query(checkIdSql, user_id, function(err, row){
    console.log(row);
    if(row.length>0){
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
//회원가입 체크 라우터
function checkInput(params) {
  let result;
  const pattern_mobile = /^[0-9]*$/;
  const pattern_id = /^[0-9a-zA-Z]*$/;
  const id = params.user_id;
  const tel = params.tel;
  if (pattern_id.test(id)) {
    //id검사
    if (pattern_mobile.test(tel)) {
      //tel검사
      result = 1; //정상
    } else {
      result = 2; // tel 입력 오류
    }
  } else {
    result = 3; // id 입력 오류
  }
  return result;
}

module.exports = {
  getRegister,
  postRegister,
  checkId,
};
