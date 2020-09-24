const ejs = require('ejs'),
  fs = require('fs'),
  mysql = require('mysql'),
  cors = require('cors');

const mySqlClient = mysql.createConnection(require('../../config/db_config'));

const loadRepair = function (req, res) {
  if (req.session.user) {
    const getRepairSql =
      'SELECT re.repairNum, re.title, re.content, re.isSolved, u.name, u.tel, b.building_name, ro.roomNum FROM repair re, room ro, user u, buildings b WHERE re.roomID = ro.roomID AND ro.tenantID = u.user_id AND b.buildingNum = ro.buildNum AND re.repairNum = ?';
    mySqlClient.query(getRepairSql, req.params.id, function (err, row) {
      if (row) {
        console.log(row[0]);
        fs.readFile('./public/common/view_repair.html', 'utf8', function (error, data) {
          res.send(
            ejs.render(data, {
              userType: req.session.user.userType,
              repair: row[0],
            }),
          );
        });
      } else {
        res.send(
          '<script type="text/javascript">alert("잘못된 DB 접근입니다."); window.location="/tenant/function";</script>',
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

module.exports.loadRepair = loadRepair;
