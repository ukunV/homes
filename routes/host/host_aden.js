var ejs = require('ejs'),
fs = require('fs'),
mysql = require('mysql');

const mySqlClient = mysql.createConnection(require('../../config/db_config'));


var host_aden = function (req, res) {
	if (req.session.user) {
		const selectbuildingName = req.body.building_name;
		const roomInfoSql = 'select roomNum, name, tel, payment_cash, payment_type from buildings b join room r on b.buildingNum = r.buildNum join user u on r.tenantID=u.user_id where building_name =?';
		mySqlClient.query(roomInfoSql, '에덴빌', function(err, row){
			if(row[0]){
				const room_data = [];

				row.forEach((element) => {
					room_data.push(element);
				});

				fs.readFile('./public/host/host_aden.html', 'utf8', function (error, data) {
					res.send(ejs.render(data,{
						room_data,
					}),
					);
				});
			}
		});		
	} else {
		res.send('<script type="text/javascript">alert("로그인 후 이용하세요."); window.location="/";</script>');
	}
};



module.exports.host_aden = host_aden;