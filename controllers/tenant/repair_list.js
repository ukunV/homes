const mysql = require('mysql');

const mySqlClient = mysql.createConnection(require('../../config/db_config'));

const repairList = function (req, res) {
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

      res.render('tenant/repair_list.html', {
        unsolved_repairs,
        solved_repairs,
        pushCount: req.cookies.pushCount,
      });
    } else {
      res.send(
        '<script type="text/javascript">alert("잘못된 DB 접근입니다."); window.location="/tenant/function";</script>',
      );
    }
  });
};

module.exports = { repairList };
