const ejs = require('ejs'),
  fs = require('fs'),
  mysql = require('mysql'),
  cors = require('cors');

const mySqlClient = mysql.createConnection(require('../../config/db_config'));

const repairList = function (req, res) {
  if (req.session.user) {
    const getRepairsSql =
      'SELECT re.repairNum, re.title, re.isSolved FROM repair re, room ro, user u WHERE re.roomID = ro.roomID AND ro.tenantID = u.user_id AND user_id = ? order by repairNum desc';
    const unsolved_repairs = [];
    const solved_repairs = [];
    mySqlClient.query(getRepairsSql, req.session.user.userId, function (err, row) {
      if (row) {
        row.forEach((element) => {
          if (element.isSolved === 0) {
            unsolved_repairs.push(element);
          } else {
            solved_repairs.push(element);
          }
        });

        fs.readFile('./public/tenant/repair_list.html', 'utf8', function (error, data) {
          res.send(
            ejs.render(data, {
              unsolved_repairs,
              solved_repairs,
            }),
          );
        });
      } else {
        res.send(
          '<script type="text/javascript">alert("잘못된 DB 접근입니다."); window.location="/tenant/function";</script>',
        );
      }
    });
  } else {
    res.send(
      '<script type="text/javascript">alert("로그인 후 이용하세요."); window.location="/";</script>',
    );
  }
};

module.exports.repairList = repairList;
