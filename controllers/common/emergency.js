const NCPClient = require('node-sens').NCPClient;
const sensKey = require('../../config/ncp_config').sensSecret;

const mysql = require('mysql');
const { sendPushOfEmergency } = require('./token');
const mySqlClient = mysql.createConnection(require('../../config/db_config'));

const successRedirect =
  '<script type="text/javascript">location.href="/emergency/fire/success";</script>';
const failRedirect =
  '<script type="text/javascript">alert("전송 중 오류가 발생했습니다."); window.history.back();</script>';

const ncp = new NCPClient({
  ...sensKey,
});

const getEmergency = (req, res) => {
  const getInfoSql =
    'SELECT buildingNum as bid, roomId as rid, building_addr as address, roomNum as room, tel FROM buildings b, room r, user u WHERE b.buildingNum=r.buildNum AND u.user_id=r.tenantID AND user_id=?;';

  mySqlClient.query(getInfoSql, req.session.user.userId, (err, row) => {
    if (err) {
      res.send(
        '<script type="text/javascript">alert("DB 접근 오류입니다."); location.href="/";</script>',
      );
    } else {
      res.render('tenant/emergency_report.html', {
        ...row[0],
      });
    }
  });
};

const postEmergency = async (req, res) => {
  const bid = req.body.bid;
  const address = req.body.address.replace(/ /g, '');
  const room = req.body.room.concat('호');
  const tel = req.body.tel;

  const to = '01049414921'; //119 번호
  const content = `${address} ${room} 화재발생. 신고자${tel}(앱신고)`;

  // SMS 전송 부분 (과금되니 테스트 시 주석달고 할 것)
  const { success, msg, status } = await ncp.sendSMS({
    to,
    content,
  });
  if (!success) {
    res.send(failRedirect);
  }

  // SMS 전송 완료
  sendPushOfEmergency(bid, room);
  res.send(successRedirect);
};

const finishReport = (_, res) => {
  res.render('tenant/emergency_finish.html');
};

module.exports = {
  getEmergency,
  postEmergency,
  finishReport,
};
