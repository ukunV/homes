const mysql = require('mysql');

const mySqlClient = mysql.createConnection(require('../../config/db_config'));

const tenant_message = function (req, res) {
  res.render('tenant/tenant_message.html', {
  	pushCount: req.cookies.pushCount,
  });
};

module.exports = { tenant_message };
