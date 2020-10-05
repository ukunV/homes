const mysql = require('mysql');
const crypto = require('crypto');

const mySqlClient = mysql.createConnection(require('../../config/db_config'));

const loadAccount = function (req, res) {
  res.render('common/account_management.html', {
    userType: req.session.user.userType,
  });
};

const postInfo = function (req, res) {

};

module.exports = {
  loadAccount,
  postInfo,
};
