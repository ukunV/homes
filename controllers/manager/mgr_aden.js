const mysql = require('mysql');
const checkAccessibleBuilding = require('../checkTools').checkAccessibleBuilding;
const permissionBanMsg = '잘못된 접근입니다.';

const mySqlClient = mysql.createConnection(require('../../config/db_config'));

const mgr_aden = async function (req, res) {
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

  const roomInfo =
    'select tenantID, building_name, ro.roomNum, u.name, u.tel, count(repairNum) as Unsolved  from room ro left join user u on ro.tenantID=u.user_id join repair re on re.roomID=ro.roomID join buildings on buildingNum=buildNum where buildNum=? and re.isSolved=0 group by ro.roomNum, tenantID, building_name UNION select tenantID, building_name, roomNum, name, tel, 0 as Unsolved from room left join user on tenantID=user_id join buildings on buildingNum=buildNum where buildNum=? and roomId not in (select roomid from repair where isSolved=0);';
  mySqlClient.query(roomInfo, [buildingNum, buildingNum], function (err, row) {
    if (row) {
      const room_data = [];
      const building_name = row[0].building_name;

      row.forEach((element) => {
        room_data.push(element);
      });

      res.render('manager/mgr_aden.html', {
        room_data,
        building_name,
      });
    }
  });
};

module.exports = { mgr_aden };
