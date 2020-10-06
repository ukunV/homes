const mysql = require('mysql');

const mySqlClient = mysql.createConnection(require('../../config/db_config'));

const manager = function (req, res) {
  const managerInfoSql =
    'select b.buildingNum, b.building_name, b.building_addr, v.Unsolved as Unsolved, name as hostName, tel as hostTel from buildings b join user u on b.hostID=u.user_id join room r on r.buildNum=b.buildingNum join (select buildingNum, COUNT(repairNum) as UnSolved from buildings b join room ro on buildingNum=buildNum join repair re on re.roomID=ro.roomID where b.managerID=? and re.isSolved=0 group by buildingNum UNION select buildingNum, 0 as UnSolved from buildings  where buildingNum not in ( select buildNum from room ro join repair re on ro.roomID=re.roomID where re.isSolved=0)) v on b.buildingNum=v.buildingNum where b.managerID=? group by b.buildingNum, building_name, building_addr, Unsolved, hostName, hostTel;';

  mySqlClient.query(managerInfoSql, [req.session.user.userId, req.session.user.userId], function (
    err,
    row,
  ) {
    if (row) {
      const manager_data = [];

      row.forEach((element) => {
        manager_data.push(element);
      });
      res.render('manager/mgr.html', {
        name: req.session.user.userName,
        manager_data,
      });
    } else {
      res.render('manager/mgr.html', {
        name: req.session.user.userName,
      });
    }
  });
};

module.exports = { manager };
