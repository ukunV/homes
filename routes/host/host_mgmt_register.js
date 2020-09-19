const ejs = require('ejs'),
  fs = require('fs');
mysql = require('mysql');

const mySqlClient = mysql.createConnection(require('../../config/db_config'));

const host_mgmt_register = function (req, res) {
  if (req.session.user) {
    fs.readFile('./public/host/mgmt_register.html', 'utf8', function (error, data) {
      res.send(ejs.render(data, {}));
    });
  } else {
    res.send(
      '<script type="text/javascript">alert("로그인 후 이용하세요."); window.location="/";</script>',
    );
  }
};

const registerSubmit = function (req, res) {
  const name = req.body.building_name,
    addr = req.body.building_addr,
    hostId = req.session.user.userId,
    managerId = req.body.managerID,
    floor_count = req.body.floor_count;

  const rooms = [];
  // 세대 (101호, 102호 ..) 배열 push
  for (var floor = 1; floor <= floor_count; floor++) {
    each_floor = req.body[`floor_${floor}`];
    for (var room = 1; room <= each_floor; room++) {
      rooms.push(`${floor}0${room}`);
    }
  }

  const params_building = {
    building_name: name,
    building_addr: addr,
    hostID: hostId,
    managerID: managerId,
  };
  let alertMsg = '';

  const checkManagerSql = 'SELECT * from user where user_id= ?;';
  const insertBuildingSql = 'INSERT INTO buildings SET ?;';
  const insertRoomSql = 'INSERT INTO room (buildNum, roomNum) VALUES ?;';
  mySqlClient.query(checkManagerSql, params_building.managerID, function (err, row) {
    if (row[0]) {
      mySqlClient.query(insertBuildingSql, params_building, function (err, result) {
        if (err) {
          console.log('insert Error>>' + err);
          alertMsg = '건물등록 중 오류가 발생했습니다.';
          res.send(
            '<script type="text/javascript">alert("' +
              alertMsg +
              '"); window.location="/host/management";</script>',
          );
        } else {
          // 건물ID: result.insertId
          const buildNum = result.insertId;

          const params_rooms = [];

          for (roomNum in rooms) {
            params_rooms.push([[buildNum, roomNum]]);
          }

          mySqlClient.query(insertRoomSql, params_rooms, function (err, result) {
            if (err) {
              console.log('insert Error>>' + err);
              alertMsg = '건물등록 중 오류가 발생했습니다.';
              res.send(
                '<script type="text/javascript">alert("' +
                  alertMsg +
                  '"); window.location="/host/management";</script>',
              );
            } else {
              alertMsg = '건물등록이 완료되었습니다.';
              res.send(
                '<script type="text/javascript">alert("' +
                  alertMsg +
                  '"); window.location="/host";</script>',
              );
            }
          });
        }
      });
    } else {
      console.log('Not exist manager:' + err);
      alertMsg = '존재하지 않는 매니저입니다.';
      res.send(
        '<script type="text/javascript">alert("' +
          alertMsg +
          '"); window.location="/host/management";</script>',
      );
    }
  });
};

module.exports.host_mgmt_register = host_mgmt_register;
module.exports.reg_submit = registerSubmit;
