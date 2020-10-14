const mysql = require('mysql');

const mySqlClient = mysql.createConnection(require('../../config/db_config'));
const sendPushOfRepair = require('../common/token').sendPushOfRepair;

const loadAddRepair = function (req, res) {
  const roomIDSql = 'select roomID from room where tenantID=?';
  mySqlClient.query(roomIDSql, req.session.user.userId, function (err, row) {
    if (row) {
      const selectroomID = row[0].roomID;
      res.render('tenant/register_repair.html', {
        roomID: selectroomID,
      });
    } else {
      res.send(
        '<script type="text/javascript">alert("입주한 건물이 없습니다. 건물주에게 세입자 등록을 요청하세요."); window.location="/tenant/repair_list";</script>',
      );
    }
  });
};

const addRepair = function (req, res) {
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
      res.send(
        '<script type="text/javascript">alert("하자 등록 중 오류가 발생했습니다."); window.history.back();</script>',
      );
    } else {
      sendPushOfRepair(roomID);
      res.send(
        '<script type="text/javascript">alert("하자 등록이 완료되었습니다."); window.location="/tenant/repair_list";</script>',
      );
    }
  });
};

module.exports = { loadAddRepair, addRepair };
