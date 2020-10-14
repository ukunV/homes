const { Expo } = require('expo-server-sdk');
const expo = new Expo();
const mysql = require('mysql');
const mySqlClient = mysql.createConnection(require('../../config/db_config'));

const token = function (req, res) {
  if (req.body.token) {
    console.log(req.body.token);
    res.cookie('token', req.body.token);
    res.end();
  } else {
    console.log('There is no token');
    res.end();
  }
};

// Push cases
// 완납처리 to 세입자 (1명) in host/host_aden_paymentok
const sendPushOfPaymentOk = (bid, rid) => {
  const getTokenSql =
    'SELECT token FROM user u, buildings b, room r WHERE u.user_id=r.tenantID AND b.buildingNum=r.buildNum AND buildingNum = ? AND roomNum = ?;';
  const message = '월세가 완납처리 되었어요!';

  mySqlClient.query(getTokenSql, [bid, rid], (err, row) => {
    if (err) {
      console.error(err);
      return;
    } else {
      if (row.length > 0) {
        console.dir(row);
        handlePushTokens('납부 알림', message, [row[0].token]);
      }
    }
  });
};

// 메시지 to 수신자(공통)
const sendPushOfMessage = (receivers, message) => {
  const getTokenSql = 'SELECT token FROM user u WHERE u.user_id IN (?);';
  const tokens = [];

  mySqlClient.query(getTokenSql, [receivers], (err, rows) => {
    if (err) {
      console.error(err);
    } else {
      if (rows.length > 0) {
        console.dir(rows);
        rows.forEach((r) => tokens.push(r.token));
        handlePushTokens('새로운 메시지', message, tokens);
      }
    }
  });
};

// 유지보수 등록 to 건물주/관리인
const sendPushOfRepair = (roomId) => {
  const getTokenSql =
    'SELECT u.token AS host_token, v.token AS mgr_token, building_name, roomNum from user u join buildings b on u.user_id=b.hostID join room r on b.buildingNum = r.buildNum join (select * from user) v on v.user_id=b.managerID WHERE r.roomID = ?;';
  const tokens = [];

  mySqlClient.query(getTokenSql, roomId, (err, rows) => {
    if (err) {
      console.error(err);
    } else {
      if (rows.length > 0) {
        const message = `${rows[0].building_name} ${rows[0].roomNum}호에 유지보수가 등록되었어요.`;
        if (rows[0].host_token === rows[0].mgr_token) {
          tokens.push(rows[0].host_token);
        } else {
          tokens.push(rows[0].host_token);
          tokens.push(rows[0].mgr_token);
        }
        handlePushTokens('유지보수 알림', message, tokens);
      }
    }
  });
};

const handlePushTokens = (title, message, savedPushTokens) => {
  let notifications = [];
  for (let pushToken of savedPushTokens) {
    if (pushToken === null || !Expo.isExpoPushToken(pushToken)) {
      continue;
    }
    notifications.push({
      to: pushToken,
      sound: 'default',
      title,
      body: message,
      data: {
        message,
      },
      channelId: 'default',
    });
  }
  let chunks = expo.chunkPushNotifications(notifications);
  (async () => {
    for (let chunk of chunks) {
      try {
        let receipts = await expo.sendPushNotificationsAsync(chunk);
        console.log(receipts);
      } catch (error) {
        console.error(error);
        return;
      }
    }
  })();
};

module.exports = {
  addToken: token,
  sendPushOfMessage,
  sendPushOfPaymentOk,
  sendPushOfRepair,
};
