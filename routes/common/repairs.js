const ejs = require('ejs'),
  fs = require('fs'),
  mysql = require('mysql');

const mySqlClient = mysql.createConnection(require('../../config/db_config'));
const host_getRepairsSql =
  'SELECT re.repairNum, re.title, re.isSolved, b.building_name, ro.roomNum FROM buildings b, repair re, room ro, user u WHERE re.roomID = ro.roomID AND ro.tenantID = u.user_id AND ro.buildNum = b.buildingNum AND hostID = ? order by repairNum desc';
const mgr_getRepairsSql =
  'SELECT re.repairNum, re.title, re.isSolved, b.building_name, ro.roomNum FROM buildings b, repair re, room ro, user u WHERE re.roomID = ro.roomID AND ro.tenantID = u.user_id AND ro.buildNum = b.buildingNum AND managerID = ? order by repairNum desc';

const loadRepairList = function (req, res) {
  if (req.session.user) {
    let executeSql;
    const unsolved_repairs = [];
    const solved_repairs = [];

    if (req.session.user.userType === '건물주') {
      executeSql = host_getRepairsSql;
    } else if (req.session.user.userType === '관리인') {
      executeSql = mgr_getRepairsSql;
    }

    mySqlClient.query(executeSql, req.session.user.userId, function (err, row) {
      if (row) {
        row.forEach((element) => {
          if (element.isSolved === 0) {
            unsolved_repairs.push(element);
          } else {
            solved_repairs.push(element);
          }
        });

        fs.readFile('./public/common/repair_list.html', 'utf8', function (error, data) {
          res.send(
            ejs.render(data, {
              userType: req.session.user.userType,
              unsolved_repairs,
              solved_repairs,
            }),
          );
        });
      } else {
        res.send(
          '<script type="text/javascript">alert("잘못된 DB 접근입니다."); window.location="/function";</script>',
        );
      }
    });
  } else {
    res.send(
      '<script type="text/javascript">alert("로그인 후 이용하세요."); window.location="/";</script>',
    );
  }
};

module.exports.loadRepairList = loadRepairList;
