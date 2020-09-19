const ejs = require('ejs'),
fs = require('fs');
mysql = require('mysql');

const mySqlClient = mysql.createConnection(require('../../config/db_config'));

const host_mgmt_register = function (req, res) {
  if (req.session.user) {
    fs.readFile('./public/host/mgmt_register.html', 'utf8', function (error, data) {
      res.send(ejs.render(data,{}));
    });
  } else {
    res.send(
      '<script type="text/javascript">alert("로그인 후 이용하세요."); window.location="/";</script>',
      );
  }
};


const registerSubmit = function(req, res){
  const name = req.body.building_name,
  addr = req.body.building_addr,
  hostId = req.session.user.userId,
  managerId = req.body.managerID;

  const params = {
    building_name: name,
    building_addr: addr,
    hostID: hostId,
    managerID: managerId
  }
  let alertMsg = "";

  const checkManagerSql = 'SELECT*from user where user_id= ?;'; 
  const insertSql = 'INSERT INTO buildings SET ?;';
  mySqlClient.query(checkManagerSql, params.managerID, function(err, row){
    if(row[0]){
      mySqlClient.query(insertSql, params, function(err){
        if(err){
          console.log("insert Error>>" + err);
          alertMsg = "건물등록 중 오류가 발생했습니다.";
          res.send('<script type="text/javascript">alert("' + alertMsg + '"); window.location="/host/management";</script>');
        } else{
         alertMsg = "건물등록이 완료되었습니다.";
         res.send('<script type="text/javascript">alert("' + alertMsg + '"); window.location="/host";</script>');
       }
     });
    }else{
     console.log("Not exist manager:" + err);
     alertMsg = "존재하지 않는 매니저입니다.";
     res.send('<script type="text/javascript">alert("' + alertMsg + '"); window.location="/host/management";</script>');
   }
 })

};

module.exports.host_mgmt_register = host_mgmt_register;
module.exports.reg_submit = registerSubmit;