//공종, 동, 호 선택 함수
var ejs = require('ejs'),
fs = require('fs'),
mysql = require('mysql');

const mySqlClient = mysql.createConnection(require('../config/db_config'));


var host_management = function (req, res) {
	if (req.session.user) {
		var selectd_name;
		const findId = req.session.user.userId;
		const selectNameSql = 'select name from user where user_id=?';
		mySqlClient.query(selectNameSql, findId, function(err, result){
			selected_name = result[0].name;
			fs.readFile('./public/host/host.html', 'utf8', function (error, data) {
				res.send(ejs.render(data,{
					name: selected_name
				}));
			});
		});
	} else {
		res.send('<script type="text/javascript">alert("로그인 후 이용하세요."); window.location="/";</script>');
	}
};


module.exports.host_management = host_management;
