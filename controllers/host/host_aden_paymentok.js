const mysql = require('mysql');

const mySqlClient = mysql.createConnection(require('../../config/db_config'));

const paymentOkMsg = '완납 처리되었습니다.';
const paymentNotOkMsg = '미납 처리되었습니다.';

const changePaymentok = function (req, res) {
  const buildNum = req.query.bid;
  const roomNum = req.query.rid;

  const paymentokSql = 'select payment_month_ok from room where buildNum=? and roomNum=?;';
  const updatePaymentokSql = 'update room set payment_month_ok=? where buildNum=? and roomNum=?;';

  mySqlClient.query(paymentokSql, [buildNum, roomNum], function (err, row) {
    if (row[0]) {
      const selectpaymentok = row[0].payment_month_ok;
      if (selectpaymentok === 1) {
        mySqlClient.query(updatePaymentokSql, [0, buildNum, roomNum], function (err) {
          res.send(
            `<script type="text/javascript">alert("${paymentNotOkMsg}"); window.location="/host/aden/${buildNum}";</script>`,
          );
        });
      } else {
        mySqlClient.query(updatePaymentokSql, [1, buildNum, roomNum], function (err) {
          res.send(
            `<script type="text/javascript">alert("${paymentOkMsg}"); window.location="/host/aden/${buildNum}";</script>`,
          );
        });
      }
    }
  });
};

module.exports = { changePaymentok };
