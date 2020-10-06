const host_management = function (req, res) {
  res.render('host/management.html', {
  	pushCount: req.cookies.pushCount,
  });
};

module.exports = { host_management };
