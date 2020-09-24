const ejs = require('ejs'),
  fs = require('fs'),
  mysql = require('mysql'),
  cors = require('cors');

const mySqlClient = mysql.createConnection(require('../../config/db_config'));

const solveRepair = function (req, res) {
  if (req.session.user) {
    const solveRepairSql = 'update repair set isSolved = 1 where repairNum = ?';
    mySqlClient.query(solveRepairSql, req.params.id, function (err, row) {
      if (row) {
        res.send(
          `<script type="text/javascript">alert("완료 처리되었습니다!"); location.href="/view_repair/${req.params.id}"</script>`,
        );
      } else {
        res.send(
          `<script type="text/javascript">alert("잘못된 DB 접근입니다."); location.href="/view_repair/${req.params.id}"</script>`,
        );
      }
    });
    if (req.session.user.userType === '세입자') {
    }
  } else {
    res.send(
      '<script type="text/javascript">alert("로그인 후 이용하세요."); window.location="/";</script>',
    );
  }
};

module.exports.solveRepair = solveRepair;
