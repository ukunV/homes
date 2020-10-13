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
// 완납처리 to 세입자 (1명)
const sendPushOfPaymentOk = (bid, rid) => {
  const getTokenSql =
    'SELECT token FROM user u, buildings b, room r WHERE u.user_id=r.tenantID AND b.buildingNum=r.buildNum AND buildingNum = ? AND roomNum = ?;';
  const message = '월세가 완납처리 되었어요!';

  mySqlClient.query(getTokenSql, [bid, rid], (err, row) => {
    if (err) {
      console.error(err);
    } else {
      if (row.length > 0) {
        console.dir(row);
        handlePushTokens(message, row[0].token);
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
        handlePushTokens(message, tokens);
      }
    }
  });
};

// 유지보수 등록 to 건물주/관리인
const sendPushOfRepair = (roomId) => {
  const getTokenSql = 'SELECT token FROM user u WHERE u.user_id IN (?);';
  const tokens = [];

  mySqlClient.query(getTokenSql, [receivers], (err, rows) => {
    if (err) {
      console.error(err);
    } else {
      if (rows.length > 0) {
        console.dir(rows);
        rows.forEach((r) => tokens.push(r.token));
        handlePushTokens(message, tokens);
      }
    }
  });
};

const getUserTokensAndPush = function (message, type) {
  const selectTokenSql = 'select token from user where type=?';
  const savedTokens = [];
  mySqlClient.query(selectTokenSql, type, function (err, rows) {
    if (err) {
      console.log('select token err>>' + err);
    } else {
      rows.forEach(function (e) {
        savedTokens.push(e.token);
      });
      if (rows) {
        console.dir(savedTokens);
        handlePushTokens(message, savedTokens);
      }
    }
  });
};

const handlePushTokens = (message, savedPushTokens) => {
  let notifications = [];
  for (let pushToken of savedPushTokens) {
    if (!Expo.isExpoPushToken(pushToken)) {
      console.error('Push token ${pushToken} is not a valid Expo push token');
      continue;
    }
    notifications.push({
      to: pushToken,
      sound: 'default',
      title: 'Bluecheck',
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
      }
    }
  })();
};

module.exports.sendPush = getUserTokensAndPush;
module.exports.addToken = token;
