const ejs = require('ejs'),
  fs = require('fs'),
  mysql = require('mysql');

const mySqlClient = mysql.createConnection(require('../../config/db_config'));

const mgmt_building_modify_submit = function (req, res) {
  if (req.session.user) {
    const whichToChange = req.params.toChange;
    const buildingNum = req.body.buildingNum;
    const userId = req.session.user.userId;
    const newData = req.body.newData;
    if (whichToChange === 'building_name') {
      modify_building_name(buildingNum, userId, newData, res);
    }
  } else {
    res.send(
      '<script type="text/javascript">alert("로그인 후 이용하세요."); window.location="/";</script>',
    );
  }
};

const modify_building_name = function (buildingNum, userId, newData, res) {
  const updateSql = 'update buildings set building_name = ? where hostID = ? and buildingNum = ?';
  mySqlClient.query(updateSql, [newData, userId, buildingNum], function (err, row) {
    if (err) {
      console.log(err);
      res.send(
        '<script type="text/javascript">alert("잘못된 DB 접근입니다"); window.history.back();</script>',
      );
    } else {
      res.send(
        '<script type="text/javascript">alert("성공적으로 변경하였습니다."); window.history.back();</script>',
      );
    }
  });
};

module.exports.mgmt_building_modify_submit = mgmt_building_modify_submit;
