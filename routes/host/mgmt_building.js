var ejs = require('ejs'),
  fs = require('fs'),
  mysql = require('mysql');

const mySqlClient = mysql.createConnection(require('../../config/db_config'));

const mgmt_building_list = function (req, res) {
  if (req.session.user) {
    // 건물명, 주소 리스트
    const buildingInfoSql =
      'select buildingNum as id, building_name, building_addr from buildings where hostID = ?;';

    mySqlClient.query(buildingInfoSql, req.session.user.userId, function (err, row) {
      // 건물주의 건물이 한개 이상 있는 경우
      if (row[0]) {
        // 모든 소유 건물을 데이터에 저장
        const building_data = [];

        row.forEach((element) => {
          building_data.push(element);
        });

        fs.readFile('./public/host/mgmt_building_list.html', 'utf8', function (error, data) {
          res.send(
            ejs.render(data, {
              building_data, // 건물 이름, 관리인 이름 데이터 배열
            }),
          );
        });
      }
      // 건물주의 건물이 없는 경우
      else {
        fs.readFile('./public/host/mgmt_building_list.html', 'utf8', function (error, data) {
          res.send(ejs.render(data, {}));
        });
      }
    });
  } else {
    res.send(
      '<script type="text/javascript">alert("로그인 후 이용하세요."); window.location="/";</script>',
    );
  }
};

module.exports.mgmt_building_list = mgmt_building_list;
