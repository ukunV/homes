const mysql = require('mysql');
const crypto = require('crypto');

const mySqlClient = mysql.createConnection(require('../../config/db_config'));
const selectPwdSql = 'select * from user where user_id = ? && password=?';
const checkTokenSql = 'select * from user where token=?';
const loginErrMsg = `<script type="text/javascript">alert("아이디 또는 비밀번호를 다시 확인해주세요."); window.history.back();</script>`;

const getLogin = function (req, res) {
  res.render('login.html', {});
};

const postLogin = function (req, res) {
  const checkId = req.body.id;
  const checkPwd = crypto.createHash('sha512').update(req.body.password).digest('base64'); // Crypto Encryption
  mySqlClient.query(selectPwdSql, [checkId, checkPwd], function (err, row) {
    if (err) {
      console.log('select page sql ERROR>>' + err);
    } else {
      if (row[0]) {
        console.log('login sql - name:' + row[0].name + 'type:' + row[0].type);
        const userType = row[0].type;
        req.session.user = {
          userId: row[0].user_id,
          userName: row[0].name,
          userType: row[0].type,
        };
        console.log(`Token: ${req.cookies.token}`);

        if (req.cookies.token) {
          //token값이 다른 사용자에게서 사용되고 있는지 확인
          mySqlClient.query(checkTokenSql, req.cookies.token, function (err, row) {
            if (row[0]) {
              const makeTokenNullSql = 'update user set token=null where user_id=?';
              mySqlClient.query(makeTokenNullSql, req.session.user.userId, function (err, row) {
                if (err) {
                  console.log('make token null err>' + err);
                } else {
                  if (tokenUpdate(req.cookies.token, req.session.user.userId)) {
                    res.writeHead(200, {
                      'Set-Cookie': 'token=; Max-Age:0',
                    });
                    console.log('200 - Set Cookie Finished');
                  }
                  if (userType === '건물주') {
                    res.redirect('/host');
                  } else if (userType === '관리인') {
                    res.redirect('/manager');
                  } else if (userType === '세입자') {
                    res.redirect('/tenant');
                  }
                }
              });
            } else {
              if (tokenUpdate(req.cookies.token, req.session.user.userId)) {
                res.writeHead(200, {
                  'Set-Cookie': 'token=; Max-Age:0',
                });
                if (userType === '건물주') {
                  res.redirect('/host');
                } else if (userType === '관리인') {
                  res.redirect('/manager');
                } else if (userType === '세입자') {
                  res.redirect('/tenant');
                }
              }
            }
          });
        } else {
          // Token이 다른 사용자가 사용중이지 않는 경우
          if (userType === '건물주') {
            res.redirect('/host');
          } else if (userType === '관리인') {
            res.redirect('/manager');
          } else if (userType === '세입자') {
            res.redirect('/tenant');
          }
        }
      } else {
        res.send(loginErrMsg);
      }
    }
  });
};

function tokenUpdate(token, id) {
  const setTokenSql = 'update `user` set token = ? where user_id = ?;';

  //Token Update
  mySqlClient.query(setTokenSql, [token, id], function (err, row) {
    if (err) {
      console.log(`update token error(token:${token}, user_id:${id}) -> ${err}`);
      return true;
    } else {
      console.log('토큰 정상 업데이트: ' + token);
      return true;
    }
  });
}

module.exports = { postLogin, getLogin };
