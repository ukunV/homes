//MainPage 라우터

function main(req, res) {
  if (req.session.user && req.session.user.userType === '건물주') {
    res.redirect('/host');
  } else if (req.session.user && req.session.user.userType === '관리인') {
    res.redirect('/manager');
  } else if (req.session.user && req.session.user.userType === '세입자') {
    res.redirect('/tenant');
  } else {
    res.render('index.html', {});
  }
}

module.exports = main;
