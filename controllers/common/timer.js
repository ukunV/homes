var schedule = require('node-schedule');
var rule = new schedule.RecurrenceRule();
rule.hour = 23;
rule.minute = 59;
rule.second = 59;

var moment = require('moment');
require('moment-timezone');
moment.tz.setDefault('Asia/Seoul');
var date = moment().format('DD');

const mysql = require('mysql');
const mySqlClient = mysql.createConnection(require('../../config/db_config'));

const setPaymentOk = function () {
  const changePaymentOkSql =
    'update room set payment_month_ok=0 where payment_month_day=? and payment_type=0;';
  mySqlClient.query(changePaymentOkSql, date, function (err) {
    if (err) {
      console.log('Update Error>>' + err);
    } else {
      console.log(`[${date} 일] payment_month_ok 업데이트 완료`);
    }
  });
};

const timer = schedule.scheduleJob(rule, setPaymentOk);

module.exports.timer = timer;
