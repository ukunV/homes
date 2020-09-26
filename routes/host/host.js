const ejs = require('ejs'),
  fs = require('fs'),
  mysql = require('mysql');

const mySqlClient = mysql.createConnection(require('../../config/db_config'));

const host = function (req, res) {
  if (req.session.user) {
    const buildingInfoSql =
      'select buildingNum, count(payment_month_ok) as nonPayment, building_name, name as manager_name from buildings b join user u on b.managerID=u.user_id join room r on r.buildNum=b.buildingNum where b.hostID=? and r.payment_month_ok=0 and r.payment_type=0 group by b.buildingNum;';

    mySqlClient.query(buildingInfoSql, req.session.user.userId, function (err, row) {
      // 건물주의 건물이 한개 이상 있는 경우
      if (row[0]) {
        // 모든 소유 건물을 데이터에 저장
        const building_data = [];

        row.forEach((element) => {
          building_data.push(element);
        });

        fs.readFile('./public/host/host.html', 'utf8', function (error, data) {
          res.send(
            ejs.render(data, {
              name: req.session.user.userName,
              building_data, // 건물 이름, 관리인 이름 데이터 배열
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
