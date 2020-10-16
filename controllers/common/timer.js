const schedule = require('node-schedule');
const rule = new schedule.RecurrenceRule();
rule.hour = 17;
rule.minute = 47;
rule.second = 10;

const moment = require('moment');
require('moment-timezone');
moment.tz.setDefault('Asia/Seoul');
const date = moment().format('DD');

const mysql = require('mysql');
const mySqlClient = mysql.createConnection(require('../../config/db_config'));

const setPaymentOk = function () {
  const changePaymentOkAndResetSmsCountSql =
    'update room set payment_month_ok=0 where payment_month_day=? and payment_type=0; update user set smsCount=0;';
  mySqlClient.query(changePaymentOkAndResetSmsCountSql, date, function (err) {
    if (err) {
      console.log('Update Error>>' + err);
    } else {
      console.log(`[${date} 일] payment_month_ok 업데이트 완료`);
    }
  });
};

const timer = schedule.scheduleJob(rule, setPaymentOk);

module.exports = timer;
