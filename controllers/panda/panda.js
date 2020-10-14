const mysql = require('mysql');

const mySqlClient = mysql.createConnection(require('../../config/db_config'));

const getPanda = function (req, res) {
  res.render('panda/index.html', {});
};

const getAddProduct = function (req, res) {
  res.render('panda/register.html', {});
};

const postAddProduct = function (req, res) {};

module.exports = {
  getPanda,
  getAddProduct,
  postAddProduct,
};
