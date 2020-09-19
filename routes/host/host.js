var ejs = require('ejs'),
fs = require('fs'),
mysql = require('mysql');

const mySqlClient = mysql.createConnection(require('../../config/db_config'));


var host = function (req, res) {
	if (req.session.user) {
		const findId = req.session.user.userId;
		const selectNameSql = 'select name from user where user_id=?;';
		const buildingInfoSql = 'select building_name, name from buildings b, user u where b.managerID=u.user_id and b.hostID=?;';
		mySqlClient.query(selectNameSql, findId, function(err, result){
			selected_name = result[0].name;
			mySqlClient.query(buildingInfoSql, findId, function(err, result2){
				selected_building = result2[0].building_name;
				selected_managerName = result2[0].name;
				fs.readFile('./public/host/host.html', 'utf8', function (error, data) {
					res.send(ejs.render(data,{
						name: selected_name,
						building_name: selected_building,
						managerName: selected_managerName
					}));
				});
			})
			
		});
	} else {
		res.send('<script type="text/javascript">alert("로그인 후 이용하세요."); window.location="/";</script>');
	}
};


module.exports.host = host;
