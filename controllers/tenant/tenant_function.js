const mysql = require('mysql');

const mySqlClient = mysql.createConnection(require('../../config/db_config'));

const tenant_function = function (req, res) {
  res.render('tenant/tenant_function.html', {
  	pushCount: req.cookies.pushCount,
  });
};

module.exports = { tenant_function };
