const ejs = require('ejs'),
  fs = require('fs'),
  mysql = require('mysql');

const loadFunction = function (req, res) {
  if (req.session.user) {
    fs.readFile('./public/common/function.html', 'utf8', function (error, data) {
      res.send(
        ejs.render(data, {
          userType: req.session.user.userType,
        }),
      );
    });
  } else {
    res.send(
      '<script type="text/javascript">alert("로그인 후 이용하세요."); window.location="/";</script>',
    );
  }
};

module.exports.loadFunction = loadFunction;
