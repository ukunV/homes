const getFunction = function (req, res) {
  res.render('common/function.html', {
    userType: req.session.user.userType,
    pushCount: req.cookies.pushCount,
  });
};

module.exports = getFunction;
