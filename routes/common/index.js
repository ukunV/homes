//MainPage 라우터

var ejs = require('ejs'),
    fs = require('fs');

function index(req, res) {
    if (req.session.user && req.session.user.userType === '건물주') {
        res.redirect('/host');
    }
    else if(req.session.user && req.session.user.userType === '관리인'){
    	res.redirect('/manager');
    }
    else if(req.session.user && req.session.user.userType === '세입자'){
    	res.redirect('/tenant');
    } else {
        fs.readFile('./public/index.html', 'utf8', function (error, data) {
            res.send(ejs.render(data, {}));
        });
    }
}
module.exports = index;
