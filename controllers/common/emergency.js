const {NCPClient} = require('node-sens');
const sensKey = require('../../config/ncp_config').sensSecret;

const mysql = require('mysql');
const {sendPushOfEmergency} = require('./token');
const mySqlClient = mysql.createConnection(require('../../config/db_config'));

const successRedirect =
  '<script type="text/javascript">location.href="/emergency/fire/success";</script>';
const failGetCountRedirect =
  '<script type="text/javascript">alert("SMS 횟수 조회 중 오류가 발생했습니다."); window.history.back();</script>';
const failSmsRedirect =
  '<script type="text/javascript">alert("SMS 전송 중 오류가 발생했습니다."); window.history.back();</script>';
const failCountRedirect =
  '<script type="text/javascript">alert("긴급 신고는 하루 3번으로 제한됩니다."); window.history.back();</script>';

const getEmergency = (req, res) => {
  const getInfoSql =
    'SELECT buildingNum as bid, building_addr as address, roomNum as room, tel FROM buildings b, room r, user u WHERE b.buildingNum=r.buildNum AND u.user_id=r.tenantID AND user_id=?;';

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

const postEmergency = (req, res) => {
  const getSmsCountSql = 'select smsCount from user where user_id=?';
  const updateSmsCountSql = 'update user set smsCount = ? where user_id=?';
  const bid = req.body.bid;
  const address = req.body.address.replace(/ /g, '');
  const room = req.body.room.concat('호');
  const tel = req.body.tel;

  const to = '01049414921'; // 119 번호 입력
  const content = `${address} ${room} 화재발생/신고자 ${tel}(앱신고)`;

  mySqlClient.query(getSmsCountSql, req.session.user.userId, async (err, row) => {
    if (err) {
      res.send(failGetCountRedirect);
    } else {
      const smsCount = row[0].smsCount || 0;
      if (smsCount < 3) {
        const ncp = new NCPClient({
        ...sensKey,});
        const { success, msg, status } = await ncp.sendSMS({
          to,
          content,
        });
        if (!success) {
          console.log(`(ERROR) node-sens error: ${msg}, Status ${status} Date ${Date.now()}`);
          res.send(failSmsRedirect);
        } else {
          mySqlClient.query(
            updateSmsCountSql,
            [smsCount + 1, req.session.user.userId],
            (err, row) => {
              // 세입자 Push 전송
              sendPushOfEmergency(bid, room, req.session.user.userId);
              res.send(successRedirect);
            },
          );
        }
      } else {
        res.send(failCountRedirect);
      }
    }
  });
};

const finishReport = (_, res) => {
  res.render('tenant/emergency_finish.html');
};

module.exports = {
  getEmergency,
  postEmergency,
  finishReport,
};
