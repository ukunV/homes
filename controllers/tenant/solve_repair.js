const mysql = require('mysql');
const checkAccessibleBuilding = require('../checkTools').checkAccessibleBuilding;
const permissionBanMsg = '잘못된 접근입니다.';

const mySqlClient = mysql.createConnection(require('../../config/db_config'));

const solveRepair = async function (req, res) {
  const repairNum = req.params.id;
  const checkAccessible = await checkAccessibleBuilding(repairNum, req, 1)
    .then((value) => {
      return true;
    })
    .catch((err) => {
      return false;
    });

  if (checkAccessible === false) {
    res.send(
      `<script type="text/javascript">alert("${permissionBanMsg}"); window.location="/";</script>`,
    );
    return;
  }

  const solveRepairSql = 'update repair set isSolved = 1 where repairNum = ?';
  mySqlClient.query(solveRepairSql, repairNum, function (err, row) {
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
};

module.exports = { solveRepair };
