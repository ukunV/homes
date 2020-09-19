var ejs = require('ejs'),
fs = require('fs'),
mysql = require('mysql');

const mySqlClient = mysql.createConnection(require('../../config/db_config'));


var manager = function (req, res) {
	if (req.session.user) {
		fs.readFile('./public/manager/mgr.html', 'utf8', function (error, data) {
			res.send(ejs.render(data,{
				name: req.session.user.userName
			}));
		});
	} else {
		res.send('<script type="text/javascript">alert("로그인 후 이용하세요."); window.location="/";</script>');
	}
};


module.exports.manager = manager;
