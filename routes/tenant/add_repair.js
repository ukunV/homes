//하자 등록 라우터
var ejs = require('ejs'),
  fs = require('fs'),
  mysql = require('mysql'),
  cors = require('cors'),
  imgUpload = require('./img_upload').imgUpload,
  request = require('request');

const mySqlClient = mysql.createConnection(require('../../config/db_config'));

const loadAddRepair = function (req, res) {
  if (req.session.user) {
    const roomIDSql = 'select roomID from room where tenantID=?';
    mySqlClient.query(roomIDSql, req.session.user.userId, function (err, row) {
      if (row[0]) {
        const selectroomID = row[0].roomID;
        fs.readFile('./public/tenant/register_repair.html', 'utf8', function (error, data) {
          res.send(
            ejs.render(data, {
              roomID: selectroomID,
            }),
          );
        });
      } else {
        res.send(
          '<script type="text/javascript">alert("입주한 건물이 없습니다. 건물주에게 세입자 등록을 요청하세요."); window.location="/";</script>',
        );
      }
    });
  } else {
    res.send(
      '<script type="text/javascript">alert("로그인 후 이용하세요."); window.location="/";</script>',
    );
  }
};

const addRepair = function (req, res) {
  if (req.session.user) {
    const roomID = req.body.roomID,
      title = req.body.title_content,
      content = req.body.repair_detail;

    const updateRepairSql = 'insert into repair set ?;';

    const params = {
      roomID,
      title,
      content,
    };

    mySqlClient.query(updateRepairSql, params, function (err) {
      if (err) {
        console.log('Insert Err>>' + err);
        alertMsg = '하자 등록 중 오류가 발생했습니다.';
        res.send(
          '<script type="text/javascript">alert("' +
            alertMsg +
            '"); window.history.back();</script>',
        );
      } else {
        alertMsg = '하자 등록이 완료되었습니다.';
        res.send(
          '<script type="text/javascript">alert("' +
            alertMsg +
            '"); window.location="/tenant/function";</script>',
        );
      }
    });
  } else {
    res.send(
      '<script type="text/javascript">alert("로그인 후 이용하세요."); window.location="/";</script>',
    );
  }
};

module.exports.loadAddRepair = loadAddRepair;
module.exports.addRepair = addRepair;
