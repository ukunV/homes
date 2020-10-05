const mysql = require('mysql');

const mySqlClient = mysql.createConnection(require('../../config/db_config'));

const tenant_message = function (req, res) {
  res.render('tenant/tenant_message.html', {});
};

module.exports = { tenant_message };
