const mysql = require('mysql');

const mySqlClient = mysql.createConnection(require('../../config/db_config'));

// 메시지 읽음 처리 라우터
const readPush = function (req, res) {
  const msgID = req.params.id;
  let updateReadPushSql = 'update messages set isRead=1 where msgID=?';

  if (msgID === 'all') {
    updateReadPushSql = `update messages set isRead=1 where receiver='${req.session.user.userId}'`;
  }

  mySqlClient.query(updateReadPushSql, msgID, function (err, result) {
    if (err) {
      console.log('insert Error>>' + err);
      res.send(
        '<script type="text/javascript">alert("잘못된 DB 접근입니다."); window.location="/push";</script>',
      );
    } else {
      res.send('<script type="text/javascript">location.href="/push";</script>');
    }
  });
};

// POST: 알림 전송 라우터 (+Firebase)
const sendPush = function (req, res) {
  const receivers = req.body.user_id; // 1명~여러명
  const sender = req.session.user.userId;
  const content = req.body.content;
  // msgType: 0 (기본 메시지, default로 설정되어 있음)

  const sendMessageSql = 'insert into messages (receiver, sender, content) VALUES ?';
  const params_msg = [];

  if (receivers && sender && content) {
    if (Array.isArray(receivers)) {
      // 다수인 경우
      for (var receiver of receivers) {
        params_msg.push([receiver, sender, content]);
      }
    } else {
      // 한명인 경우
      params_msg.push([receivers, sender, content]);
    }

    console.log(params_msg);

    mySqlClient.query(sendMessageSql, [params_msg], function (err, result) {
      if (err) {
        console.log('insert Error>>' + err);
        res.send(
          '<script type="text/javascript">alert("전송 중 오류가 발생했습니다."); window.location="/";</script>',
        );
      } else {
        res.send(
          '<script type="text/javascript">alert("알림을 보냈어요!"); location.href="/";</script>',
        );
      }
    });
  } else {
    res.send(
      '<script type="text/javascript">alert("수신자 또는 내용을 다시 확인하세요."); window.history.back();</script>',
    );
  }
};

// 개별 알림 보내기 라우터
// Query: userID, buildingNum
const loadSendList_each = function (req, res) {
  if (req.query.user_id) {
    const loadReceiverSql = 'SELECT user_id, name, type from user where user_id=?';
    mySqlClient.query(loadReceiverSql, req.query.user_id, function (err, row) {
      if (row) {
        res.render('common/each_message.html', {
          userType: req.session.user.userType,
          receiver: row[0],

        });
      } else {
        res.send(
          '<script type="text/javascript">alert("알림을 보낼 대상이 없습니다."); window.location="/function";</script>',
        );
      }
    });
  } else if (req.query.buildingNum) {
    const loadReceiverSql =
      'SELECT tenantID, `name`, roomNum FROM buildings b, room r, user u WHERE b.buildingNum=r.buildNum AND r.tenantID=u.user_id AND buildingNum = ?;';
    const receivers = [];

    mySqlClient.query(loadReceiverSql, req.query.buildingNum, function (err, row) {
      if (row) {
        row.forEach((element) => {
          receivers.push(element);
        });
        res.render('common/each_message.html', {
          userType: req.session.user.userType,
          receivers,
        });
      } else {
        res.send(
          '<script type="text/javascript">alert("알림을 보낼 대상이 없습니다."); window.location="/function";</script>',
        );
      }
    });
  }
};

const loadSendList_host = function (req, res) {
  if (req.session.user) {
    const loadReceiverSql =
      'SELECT buildNum, building_name, roomID, tenantID, roomNum, name AS tenant_name FROM buildings b, room r, user u WHERE b.buildingNum=r.buildNum AND r.tenantID=u.user_id AND hostID = ?;';

    const buildings_set = new Set();
    const buildings = [];
    const receivers = [];

    mySqlClient.query(loadReceiverSql, req.session.user.userId, function (err, row) {
      if (row) {
        row.forEach((element) => {
          if (!buildings_set.has(element.buildNum)) {
            buildings_set.add(element.buildNum);
            buildings.push({
              buildNum: element.buildNum,
              building_name: element.building_name,
            });
          }
          receivers.push(element);
        });

        res.render('common/host_mgr_message.html', {
          userType: req.session.user.userType,
          buildings,
          receivers,
        });
      } else {
        res.send(
          '<script type="text/javascript">alert("알림을 보낼 대상이 없습니다."); window.location="/function";</script>',
        );
      }
    });
  } else {
    res.send(
      '<script type="text/javascript">alert("로그인 후 이용하세요."); window.location="/";</script>',
    );
  }
};

const loadSendList_mgr = function (req, res) {
  if (req.session.user) {
    const loadReceiverSql =
      'SELECT buildNum, building_name, roomID, tenantID, roomNum, name AS tenant_name FROM buildings b, room r, user u WHERE b.buildingNum=r.buildNum AND r.tenantID=u.user_id AND managerID = ?;';

    const buildings_set = new Set();
    const buildings = [];
    const receivers = [];

    mySqlClient.query(loadReceiverSql, req.session.user.userId, function (err, row) {
      if (row) {
        row.forEach((element) => {
          if (!buildings_set.has(element.buildNum)) {
            buildings_set.add(element.buildNum);
            buildings.push({
              buildNum: element.buildNum,
              building_name: element.building_name,
            });
          }
          receivers.push(element);
        });

        res.render('common/host_mgr_message.html', {
          userType: req.session.user.userType,
          buildings,
          receivers,
        });
      } else {
        res.send(
          '<script type="text/javascript">alert("알림을 보낼 대상이 없습니다."); window.location="/function";</script>',
        );
      }
    });
  } else {
    res.send(
      '<script type="text/javascript">alert("로그인 후 이용하세요."); window.location="/";</script>',
    );
  }
};

const loadSendList_tenant = function (req, res) {
  if (req.session.user) {
    const loadReceiverSql =
      'SELECT tenantID, roomID, roomNum FROM buildings b, room r, user u WHERE b.buildingNum=r.buildNum AND r.tenantID=u.user_id AND tenantID!=? AND buildNum = any(SELECT buildNum FROM buildings b, room r, user u WHERE b.buildingNum=r.buildNum AND r.tenantID=u.user_id AND u.user_id=?);';
    const receivers = [];

    mySqlClient.query(loadReceiverSql, [req.session.user.userId, req.session.user.userId], function (err, row) {
      if (row) {
        row.forEach((element) => {
          receivers.push(element);
        });
        res.render('tenant/tenant_message.html', {
          receivers,
        });
      }
    });
  } else {
    res.send(
      '<script type="text/javascript">alert("로그인 후 이용하세요."); window.location="/";</script>',
    );
  }
};

module.exports = {
  loadSendList_host,
  loadSendList_each,
  loadSendList_mgr,
  loadSendList_tenant,
  sendPush,
  readPush,
};
