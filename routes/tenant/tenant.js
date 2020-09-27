var ejs = require('ejs'),
  fs = require('fs'),
  mysql = require('mysql');

const mySqlClient = mysql.createConnection(require('../../config/db_config'));

var tenant = function (req, res) {
  if (req.session.user) {
    const tenantInfoSql = `select payment_month_day, payment_cash, payment_type, payment_month_ok, building_name, building_addr, roomNum, u.name as hostName, u.user_id AS hostID, u.tel as hostTel, bank_account, v.name as managerName, v.user_id as managerID, v.tel as managerTel, date_format(begin_date,'%Y-%m-%d') as begin_date, date_format(end_date,'%Y-%m-%d') as end_date from user u join buildings b on u.user_id=b.hostID join room r on b.buildingNum = r.buildNum join (select * from user) v on v.user_id=b.managerID where r.tenantID = ?;`;
    mySqlClient.query(tenantInfoSql, req.session.user.userId, function (err, row) {
      if (row) {
        const tenant_data = {
          ...row[0],
        };

        fs.readFile('./public/tenant/tenant.html', 'utf8', function (error, data) {
          res.send(
            ejs.render(data, {
              name: req.session.user.userName,
              ...tenant_data,
            }),
          );
        });
      } else {
        const roomNum = 'none';
        fs.readFile('./public/tenant/tenant.html', 'utf8', function (error, data) {
          res.send(
            ejs.render(data, {
              roomNum: roomNum,
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

module.exports.tenant = tenant;
