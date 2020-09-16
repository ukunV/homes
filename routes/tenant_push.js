var ejs = require('ejs'),
fs = require('fs'),
mysql = require('mysql');

const mySqlClient = mysql.createConnection(require('../config/db_config'));


var tenant_push = function (req, res) {
	if (req.session.user) {
			fs.readFile('./public/tenant/tenant_push.html', 'utf8', function (error, data) {
				res.send(ejs.render(data,{
					name: selected_name
				}));
			});
	} else {
		res.send('<script type="text/javascript">alert("로그인 후 이용하세요."); window.location="/";</script>');
	}
};


module.exports.tenant_push = tenant_push;
