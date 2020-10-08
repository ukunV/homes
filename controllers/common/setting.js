function setting(req, res) {
  res.render('common/setting.html', {
    userType: req.session.user.userType,
  });
}

module.exports = setting;
