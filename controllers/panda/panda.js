const mysql = require('mysql');

const mySqlClient = mysql.createConnection(require('../../config/db_config'));

const getPanda = function (req, res) {
  const user_id = req.session.user.userId;
  const selectPandaList = 'select title, productState from room r, panda p where r.buildNum=p.buildingNum and r.tenantID=? order by regDate DESC;';
  const pandaList = []
  mySqlClient.query(selectPandaList, user_id, function(err, row){
    if(row){
      row.forEach(element => {
        pandaList.push(element);
      });
      res.render('panda/index.html', {
        pandaList,
      });
    } else{
      '<script type="text/javascript">alert("잘못된 DB 접근입니다."); window.location="/";</script>';
    }
  })
};

const getAddProduct = function (req, res) {
  res.render('panda/register.html', {});
};

const postAddProduct = function (req, res) {
  const sellor = req.session.user.userId,
        title = req.body.title_content,
        content = req.body.detail,
        productState = 0;
  const insertSql = 'INSERT INTO panda SET ?';
  const selectBuildingNum = 'select buildNum from room where tenantId = ?;';
  mySqlClient.query(selectBuildingNum, sellor, function(err, row){
    if(row){
      const buildingNum = row[0].buildNum;
      const params = {
        buildingNum,
        sellor,
        title,
        content,
        productState,
      }
      mySqlClient.query(insertSql, params, function(err){
        if(err){
          console.log('Insert err >>' + err);
          res.send(
            `<script type="text/javascript">alert("등록 중 오류가 발생했습니다."); window.history.back();</script>`,
          )
        } else{
          res.send(
            '<script type="text/javascript">alert("상품 등록이 완료되었습니다."); location.href="/panda";</script>',
          )
        }
      })
    }else{
      console.log(err);
    }
  })
};

module.exports = {
  getPanda,
  getAddProduct,
  postAddProduct,
};
