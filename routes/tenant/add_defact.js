//하자 등록 라우터
var ejs = require('ejs'),
fs = require('fs'),
mysql = require('mysql'),
cors = require('cors'),
imgUpload = require('./img_upload').imgUpload,
request = require('request');



const mySqlClient = mysql.createConnection(require('../../config/db_config'));

const addDefact = function(req, res){
	if(req.session.user){
		let roomID = req.params.id,
		title = req.body.title_content,
		content = req.body.repair_detail;

		const updateRepair = 'insert into repair set ?;';

		const params = {
			roomID,
			title,
			content,
			imgSrc: 'test',
		}; 
		mySqlClient.query(updateRepair, params, function(err){
			if(err){
				console.log("Insert Err>>"+err);
				alertMsg = "하자 등록 중 오류가 발생했습니다.";
				res.send('<script type="text/javascript">alert("' + alertMsg + '"); window.history.back();</script>');
			}
			else{
				alertMsg = "하자 등록이 완료되었습니다.";
				res.send('<script type="text/javascript">alert("' + alertMsg + '"); window.location="/tenant/function";</script>');
			}
		});
	} else{
		res.send('<script type="text/javascript">alert("로그인 후 이용하세요."); window.location="/";</script>');
	}
}

module.exports.addDefact = addDefact;