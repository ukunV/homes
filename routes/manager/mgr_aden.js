var ejs = require('ejs'),
  fs = require('fs'),
  mysql = require('mysql');

const mySqlClient = mysql.createConnection(require('../../config/db_config'));

var mgr_aden = function (req, res) {
  if (req.session.user) {
    const buildingNum = req.params.id;
    const roomInfo =
      'select tenantID, building_name, ro.roomNum, u.name, u.tel, count(repairNum) as Unsolved  from room ro left join user u on ro.tenantID=u.user_id join repair re on re.roomID=ro.roomID join buildings on buildingNum=buildNum where buildNum=? and re.isSolved=0 group by ro.roomNum UNION select tenantID, building_name, roomNum, name, tel, 0 as Unsolved from room left join user on tenantID=user_id join buildings on buildingNum=buildNum where buildNum=? and roomId not in (select roomid from repair where isSolved=0);';
    mySqlClient.query(roomInfo, [buildingNum, buildingNum], function (err, row) {
      if (row) {
        const room_data = [];
        const building_name = row[0].building_name;

        row.forEach((element) => {
          room_data.push(element);
        });
        fs.readFile('./public/manager/mgr_aden.html', 'utf8', function (error, data) {
          res.send(
            ejs.render(data, {
              room_data,
              building_name,
            }),
          );
        });
      }
    });
  } else {
    res.send(
      '<script type="text/javascript">alert("로그인 후 이용하세요."); window.location="/";</script>',
    );
  }
};

module.exports.mgr_aden = mgr_aden;
