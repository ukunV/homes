function logout(req, res) {
  req.session.destroy(function (err) {
    if (err) throw err;
    res.redirect('/');
  });
}

module.exports = logout;
