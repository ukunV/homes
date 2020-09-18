//MainPage 라우터

var ejs = require('ejs'),
    fs = require('fs');

function index(req, res) {
    if (req.session.user && req.session.user.userType === '건물주') {
        res.redirect('/host/management');
    }
    else if(req.session.user && req.session.user.userType === '관리인'){
    	res.redirect('/manager/management');
    }
    else if(req.session.user && req.session.user.userType === '세입자'){
    	res.redirect('/tenant/management');
    } else {
        fs.readFile('./public/index.html', 'utf8', function (error, data) {
            res.send(ejs.render(data, {}));
        });
    }
}
module.exports = index;
