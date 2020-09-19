var ejs = require('ejs'),
  fs = require('fs'),
  mysql = require('mysql');

const mySqlClient = mysql.createConnection(require('../../config/db_config'));

var host = function (req, res) {
  if (req.session.user) {
    const buildingInfoSql =
      'select building_name, name from buildings b, user u where b.managerID=u.user_id and b.hostID=?;';
    mySqlClient.query(buildingInfoSql, req.session.user.userId, function (err, row) {
      // 건물주의 건물이 한개 이상 있는 경우
      if (row[0]) {
        selected_building = row[0].building_name;
        selected_managerName = row[0].name;
        fs.readFile('./public/host/host.html', 'utf8', function (error, data) {
          res.send(
            ejs.render(data, {
              name: req.session.user.userName,
              building_name: selected_building,
              managerName: selected_managerName,
            }),
          );
        });
      }
      // 건물주의 건물이 없는 경우
      else {
        fs.readFile('./public/host/host.html', 'utf8', function (error, data) {
          res.send(
            ejs.render(data, {
              name: req.session.user.userName,
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

module.exports.host = host;
