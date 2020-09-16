//MainPage 라우터

const ejs = require('ejs');
const fs = require('fs');

function index(req, res) {
  if (req.session.user) {
    res.redirect('/');
  } else {
    fs.readFile('./public/host/host.html', 'utf8', function (error, data) {
      res.send(ejs.render(data, {}));
    });
  }
}

module.exports = index;
