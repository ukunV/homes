var ejs = require('ejs'),
  fs = require('fs'),
  mysql = require('mysql');

const mySqlClient = mysql.createConnection(require('../../config/db_config'));

const host_aden = function (req, res) {
  const buildingNum = req.params.id;

  if (req.session.user) {
    const roomInfoSql =
      'select building_name, roomNum, name, tel, payment_cash, payment_type, payment_month_ok, payment_month_day from buildings b join room r on b.buildingNum = r.buildNum left outer join user u on r.tenantID=u.user_id where buildingNum = ?';
    mySqlClient.query(roomInfoSql, buildingNum, function (err, row) {
      if (row[0]) {
        const room_data = [];
        const building_name = row[0].building_name;

        row.forEach((element) => {
          room_data.push(element);
        });

        fs.readFile('./public/host/host_aden.html', 'utf8', function (error, data) {
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

module.exports.host_aden = host_aden;
