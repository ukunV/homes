var ejs = require('ejs'),
fs = require('fs'),
mysql = require('mysql');

const mySqlClient = mysql.createConnection(require('../../config/db_config'));


var tenant = function (req, res) {
	if (req.session.user) {
		const tenantInfoSql='select hostID, managerID, building_name, roomNum from buildings b, room r where b.buildingNum = r.buildNum and r.tenantID =?;'
		const hostmgrInforSql = 'select name, tel, bank_account from building'
		mySqlClient.query(tenantInfoSql, req.session.user.userId, function(err, row){
			if(row[0]){
				const building_name = row[0].building_name, 
				roomNum = row[0].roomNum;
				fs.readFile('./public/tenant/tenant.html', 'utf8', function (error, data) {
					res.send(ejs.render(data,{
						name: req.session.user.userName,
						building_name: building_name,
						roomNum: roomNum,
					}));
				});
			} else{
				fs.readFile('./public/tenant/tenant.html', 'utf8', function (error, data) {
					res.send(ejs.render(data,{
						name: req.session.user.userName,
					}));
				});
			}
		});
	} else {
		res.send('<script type="text/javascript">alert("로그인 후 이용하세요."); window.location="/";</script>');
	}
};


module.exports.tenant = tenant;
