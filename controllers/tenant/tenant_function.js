const ejs = require('ejs'),
  fs = require('fs'),
  mysql = require('mysql');

const mySqlClient = mysql.createConnection(require('../../config/db_config'));

const tenant_function = function (req, res) {
  if (req.session.user) {
    fs.readFile('./public/tenant/tenant_function.html', 'utf8', function (error, data) {
      res.send(ejs.render(data, {}));
    });
  } else {
    res.send(
      '<script type="text/javascript">alert("로그인 후 이용하세요."); window.location="/";</script>',
    );
  }
};

module.exports.tenant_function = tenant_function;
