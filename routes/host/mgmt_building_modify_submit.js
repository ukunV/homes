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

    console.log(whichToChange);

    if (whichToChange === 'building_name') {
      modify_building_name(buildingNum, userId, newData, res);
    }
    if (whichToChange === 'building_addr') {
      modify_building_addr(buildingNum, userId, newData, res);
    }
    if (whichToChange === 'managerID') {
      modify_managerID(buildingNum, userId, newData, res);
    }
    if (whichToChange === 'payment-all') {
      const payData = [parseInt(req.body.all_payType), parseInt(req.body.all_payCash)];
      modify_payment_all(buildingNum, userId, payData, res);
    }
  } else {
    res.send(
      '<script type="text/javascript">alert("로그인 후 이용하세요."); window.location="/";</script>',
    );
  }
};

// 건물명 변경 함수
const modify_building_name = function (buildingNum, userId, newData, res) {
  const updateSql = 'update buildings set building_name = ? where hostID = ? and buildingNum = ?';
  mySqlClient.query(updateSql, [newData, userId, buildingNum], function (err, row) {
    if (err) {
      res.send(
        '<script type="text/javascript">alert("잘못된 DB 접근입니다"); window.history.back();</script>',
      );
    } else {
      res.send(
        `<script type="text/javascript">alert("성공적으로 변경하였습니다."); location.href='/host/management/modify/${buildingNum}';</script>`,
      );
    }
  });
};

// 주소 변경 함수
const modify_building_addr = function (buildingNum, userId, newData, res) {
  const updateSql = 'update buildings set building_addr = ? where hostID = ? and buildingNum = ?';
  mySqlClient.query(updateSql, [newData, userId, buildingNum], function (err, row) {
    if (err) {
      console.log(err);
      res.send(
        '<script type="text/javascript">alert("잘못된 DB 접근입니다"); window.history.back();</script>',
      );
    } else {
      res.send(
        `<script type="text/javascript">alert("성공적으로 변경하였습니다."); location.href='/host/management/modify/${buildingNum}';</script>`,
      );
    }
  });
};

// 관리인 변경 함수
// managerID의 유효성부터 검사해야함
const modify_managerID = function (buildingNum, userId, newData, res) {
  const updateSql = 'update buildings set managerID = ? where hostID = ? and buildingNum = ?';
  mySqlClient.query(updateSql, [newData, userId, buildingNum], function (err, row) {
    if (err) {
      console.log(err);
      res.send(
        '<script type="text/javascript">alert("관리인 아이디를 확인해주세요."); window.history.back();</script>',
      );
    } else {
      res.send(
        `<script type="text/javascript">alert("성공적으로 변경하였습니다."); location.href='/host/management/modify/${buildingNum}';</script>`,
      );
    }
  });
};

// 월세/전세 일괄 설정 함수
const modify_payment_all = function (buildingNum, userId, payData, res) {
  const updateSql = 'update room set payment_type = ?, payment_cash = ? where buildNum = ?';
  mySqlClient.query(updateSql, [...payData, buildingNum], function (err, row) {
    if (err) {
      console.log(err);
      res.send(
        '<script type="text/javascript">alert("잘못된 DB 접근입니다."); window.history.back();</script>',
      );
    } else {
      res.send(
        `<script type="text/javascript">alert("성공적으로 변경하였습니다."); location.href='/host/management/modify/${buildingNum}';</script>`,
      );
    }
  });
};

module.exports.mgmt_building_modify_submit = mgmt_building_modify_submit;
