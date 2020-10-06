const mysql = require('mysql');

const mySqlClient = mysql.createConnection(require('../../config/db_config'));

const loadRepair = function (req, res) {
  const getRepairSql =
    'SELECT re.repairNum, re.title, re.content, re.isSolved, u.name, u.tel, b.building_name, ro.roomNum FROM repair re, room ro, user u, buildings b WHERE re.roomID = ro.roomID AND ro.tenantID = u.user_id AND b.buildingNum = ro.buildNum AND re.repairNum = ?';
  mySqlClient.query(getRepairSql, req.params.id, function (err, row) {
    if (row) {
      res.render('common/view_repair.html', {
        userType: req.session.user.userType,
        repair: row[0],
        pushCount: req.cookies.pushCount,
      });
    } else {
      res.send(
        '<script type="text/javascript">alert("잘못된 DB 접근입니다."); window.location="/tenant/function";</script>',
      );
    }
  });
};

module.exports = { loadRepair };
