const mysql = require('mysql');

const mySqlClient = mysql.createConnection(require('../../config/db_config'));

const push = function (req, res) {
  const loadMsgSql =
    'SELECT msgID, sender, receiver, isRead, sendDate AS date, msgType, content, u.name AS sender_name, u.type AS sender_type, roomNum AS sender_roomNum, building_name AS sender_building_name, roomID as sender_roomID FROM (SELECT * FROM messages WHERE receiver=?) m JOIN user u ON m.sender=u.user_id left JOIN room r ON r.tenantID = m.sender left JOIN buildings b ON b.buildingNum=r.buildNum order by isRead asc, msgID desc;';
  const messages = [];

  mySqlClient.query(loadMsgSql, req.session.user.userId, function (err, row) {
    if (row) {
      row.forEach((element) => {
        messages.push(element);
      });

      res.render('common/push.html', {
        userType: req.session.user.userType,
        messages,
      });
    } else {
      console.log(err);
      res.send(
        '<script type="text/javascript">alert("올바른 DB 접근이 아닙니다."); window.location="/function";</script>',
      );
    }
  });
};

module.exports = { push };
