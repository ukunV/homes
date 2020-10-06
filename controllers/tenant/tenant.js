const mysql = require('mysql');

const mySqlClient = mysql.createConnection(require('../../config/db_config'));

const tenant = function (req, res) {
  const tenantInfoSql = `select payment_month_day, payment_cash, payment_type, payment_month_ok, building_name, building_addr, roomNum, u.name as hostName, u.user_id AS hostID, u.tel as hostTel, bank_account, v.name as managerName, v.user_id as managerID, v.tel as managerTel, date_format(begin_date,'%Y-%m-%d') as begin_date, date_format(end_date,'%Y-%m-%d') as end_date from user u join buildings b on u.user_id=b.hostID join room r on b.buildingNum = r.buildNum join (select * from user) v on v.user_id=b.managerID where r.tenantID = ?;`;
  mySqlClient.query(tenantInfoSql, req.session.user.userId, function (err, row) {
    if (row) {
      const tenant_data = {
        ...row[0],
      };

      res.render('tenant/tenant.html', {
        name: req.session.user.userName,
        ...tenant_data,
        pushCount: req.cookies.pushCount,
      });
    } else {
      res.render('tenant/tenant.html', {
        name: req.session.user.userName,
        pushCount: req.cookies.pushCount,
      });
    }
  });
};

module.exports = { tenant };
