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
  let name = req.body.building_name,
    addr = req.body.building_addr,
    hostId = req.session.user.userId,
    managerId = req.body.managerID || req.session.user.userId,
    floor_count = req.body.floor_count;

  const rooms = [];
  // 세대 (101호, 102호 ..) 배열 push
  for (var floor = 1; floor <= floor_count; floor++) {
    each_floor = req.body[`floor_${floor}`];
    for (var room = 1; room <= each_floor; room++) {
      rooms.push(parseInt(`${floor}0${room}`));
    }
  }

  const params_building = {
    building_name: name,
    building_addr: addr,
    hostID: hostId,
    managerID: managerId,
  };
  let alertMsg = '';

  const insertBuildingSql = 'INSERT INTO buildings SET ?;';
  const insertRoomSql = 'INSERT INTO room (buildNum, roomNum) VALUES ?;';
  mySqlClient.query(insertBuildingSql, params_building, function (err, result) {
    if (err) {
      // SQL 오류나는 경우는 관리인 외래키 참조 오류밖에 없음
      console.log('insert Error>>' + err);
      alertMsg = '존재하지 않은 관리인입니다.';
      res.send(
        '<script type="text/javascript">alert("' +
          alertMsg +
          '"); window.location="/host/management";</script>',
      );
    } else {
      // 건물ID: result.insertId
      const buildNum = result.insertId;

      const params_rooms = [];

      for (var roomNum of rooms) {
        params_rooms.push([buildNum, roomNum]);
      }

      mySqlClient.query(insertRoomSql, [params_rooms], function (err, result) {
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
};

module.exports.host_mgmt_register = host_mgmt_register;
module.exports.reg_submit = registerSubmit;
