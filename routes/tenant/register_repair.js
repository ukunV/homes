var ejs = require('ejs'),
fs = require('fs'),
mysql = require('mysql');

const mySqlClient = mysql.createConnection(require('../../config/db_config'));


var registerRepair = function (req, res) {
	if (req.session.user) {
		const roomIDSql = 'select roomID from room where tenantID=?';
		mySqlClient.query(roomIDSql, req.session.user.userId, function(err, row){
			if(row[0]){
				const selectroomID = row[0].roomID;
				fs.readFile('./public/tenant/register_repair.html', 'utf8', function (error, data) {
					res.send(ejs.render(data,{
						roomID: selectroomID
					}));
				});
			} else{
				res.send('<script type="text/javascript">alert("입주한 건물이 없습니다. 건물주에게 건물등록을 요청하세요."); window.location="/";</script>');

			}
		})
	} else {
		res.send('<script type="text/javascript">alert("로그인 후 이용하세요."); window.location="/";</script>');
	}
};


module.exports.registerRepair = registerRepair;