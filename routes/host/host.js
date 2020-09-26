const ejs = require('ejs'),
  fs = require('fs'),
  mysql = require('mysql');

const mySqlClient = mysql.createConnection(require('../../config/db_config'));

const host = function (req, res) {
  if (req.session.user) {
    const buildingInfoSql =
      'select b.buildingNum, count(payment_month_ok) as nonPayment, b.building_name, v.Unsolved as Unsolved, name as manager_name from buildings b join user u on b.managerID=u.user_id join room r on r.buildNum=b.buildingNum join (select buildingNum, COUNT(repairNum) as UnSolved from buildings b join room ro on buildingNum=buildNum join repair re on re.roomID=ro.roomID where b.hostID=? and re.isSolved=0 group by buildingNum UNION select buildingNum, 0 as UnSolved from buildings where buildingNum not in ( select buildNum from room ro join repair re on ro.roomID=re.roomID where re.isSolved=0)) v on b.buildingNum=v.buildingNum where b.hostID=? and r.payment_month_ok=0 and r.payment_type=0 group by buildingNum, building_name, Unsolved, manager_name;';

    mySqlClient.query(
      buildingInfoSql,
      [req.session.user.userId, req.session.user.userId],
      function (err, row) {
        // 건물주의 건물이 한개 이상 있는 경우
        if (row) {
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
      },
    );
  } else {
    res.send(
      '<script type="text/javascript">alert("로그인 후 이용하세요."); window.location="/";</script>',
    );
  }
};

module.exports.host = host;
