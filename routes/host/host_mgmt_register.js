var ejs = require('ejs'),
  fs = require('fs');

var host_mgmt_register = function (req, res) {
  if (req.session.user) {
    fs.readFile('./public/host/mgmt_register.html', 'utf8', function (error, data) {
      res.send(ejs.render(data, {}));
    });
  } else {
    res.send(
      '<script type="text/javascript">alert("로그인 후 이용하세요."); window.location="/";</script>',
    );
  }
};

module.exports.host_mgmt_register = host_mgmt_register;
