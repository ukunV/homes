const mysql = require('mysql');
const checkAccessibleBuilding = require('../checkTools').checkAccessibleBuilding;
const permissionBanMsg = '잘못된 접근입니다.';

const mySqlClient = mysql.createConnection(require('../../config/db_config'));

const host_aden = async function (req, res) {
  const buildingNum = req.params.id;

  const checkAccessible = await checkAccessibleBuilding(buildingNum, req)
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

  const roomInfoSql =
    'select buildNum, building_name, r.roomNum, name, tenantID, tel, payment_cash, payment_type, payment_month_ok, payment_month_day, v.Unsolved as Unsolved, memo from buildings b join room r on b.buildingNum = r.buildNum left outer join user u on r.tenantID=u.user_id join ( select roomNum, count(repairNum) as Unsolved from room ro join repair re on ro.roomID=re.roomID  where buildNum=? and re.isSolved=0 group by ro.roomNum UNION select roomNum, 0 as Unsolved from room where buildnum=1 and roomID not in (select roomID from repair where isSolved=0)) v on r.roomNum=v.roomNum where buildingNum = ?;';
  mySqlClient.query(roomInfoSql, [buildingNum, buildingNum], function (err, row) {
    if (row) {
      const room_data = [];
      const building_name = row[0].building_name;

      row.forEach((element) => {
        room_data.push(element);
      });

      res.render('host/host_aden.html', {
        room_data,
        building_name,
      });
    }
  });
};

module.exports = { host_aden };
