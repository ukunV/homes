const mysql = require('mysql');
const checkAccessibleBuilding = require('../checkTools').checkAccessibleBuilding;
const permissionBanMsg = '잘못된 접근입니다.';

const mySqlClient = mysql.createConnection(require('../../config/db_config'));

const mgmt_building_modify_submit = async function (req, res) {
  const whichToChange = req.params.toChange;
  const buildingNum = req.body.buildingNum;
  const userId = req.session.user.userId;
  const newData = req.body.newData;

  const checkAccessible = await checkAccessibleBuilding(buildingNum, req)
    .then((value) => {
      return true;
    })
    .catch((err) => {
      return false;
    });

  if (checkAccessible === false) {
    res.send(
      `<script type="text/javascript">alert("${permissionBanMsg}"); window.location="/";</script>`,
    );
    return;
  }

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
    modify_payment_all(buildingNum, payData, res);
  }
  // 세대별 전체 변경
  if (whichToChange === 'tenant') {
    const roomID = req.body.roomID;
    const newData = [
      req.body.payType,
      req.body.payCash,
      req.body.tenantID || null,
      req.body.payment_month_day,
      req.body.begin_date || null,
      req.body.end_date || null,
    ];
    modify_tenant(buildingNum, roomID, newData, res);
  }
  // from host_aden.js
  if (whichToChange === 'memo') {
    const roomData = [req.body.memo, req.body.roomNum];
    modify_memo(req.body.buildNum, roomData, res);
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
        '<script type="text/javascript">alert("올바른 관리인 아이디를 입력하세요."); window.history.back();</script>',
      );
    } else {
      res.send(
        `<script type="text/javascript">alert("성공적으로 변경하였습니다."); location.href='/host/management/modify/${buildingNum}';</script>`,
      );
    }
  });
};

// 월세/전세 일괄 설정 함수
const modify_payment_all = function (buildingNum, payData, res) {
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

// 세대 세입자 설정 함수
const modify_tenant = function (buildingNum, roomID, newData, res) {
  const updateSql =
    'update room set payment_type = ?, payment_cash = ?, tenantID = ?, payment_month_day = ?, begin_date = ?, end_date = ? where roomID = ?';
  mySqlClient.query(updateSql, [...newData, roomID], function (err, row) {
    if (err) {
      console.log(err);
      res.send(
        '<script type="text/javascript">alert("입력 내용을 다시 확인하세요."); window.history.back();</script>',
      );
    } else {
      res.send(
        `<script type="text/javascript">alert("성공적으로 변경하였습니다."); location.href='/host/management/modify/${buildingNum}';</script>`,
      );
    }
  });
};

// 메모 변경 함수
const modify_memo = function (buildingNum, roomData, res) {
  const updateSql = 'update room set memo = ? where roomNum = ? and buildNum = ?';
  mySqlClient.query(updateSql, [...roomData, buildingNum], function (err, row) {
    if (err) {
      console.log(err);
      res.send(
        '<script type="text/javascript">alert("잘못된 DB 접근입니다."); window.history.back();</script>',
      );
    } else {
      res.send(
        `<script type="text/javascript">alert("성공적으로 변경하였습니다."); location.href='/host/aden/${buildingNum}';</script>`,
      );
    }
  });
};

module.exports.mgmt_building_modify_submit = mgmt_building_modify_submit;
