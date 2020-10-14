const mysql = require('mysql');

const mySqlClient = mysql.createConnection(require('../../config/db_config'));

const getPanda = function (req, res) {
  const user_id = req.session.user.userId;
  const selectPandaList =
    'select title, productState, pandaId from room r, panda p where r.buildNum=p.buildingNum and r.tenantID=? order by pandaId DESC;';
  const pandaList = [];
  mySqlClient.query(selectPandaList, user_id, function (err, row) {
    if (row) {
      row.forEach((element) => {
        pandaList.push(element);
      });
      res.render('panda/index.html', {
        pandaList,
      });
    } else {
      ('<script type="text/javascript">alert("잘못된 DB 접근입니다."); window.location="/";</script>');
    }
  });
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
  mySqlClient.query(selectBuildingNum, sellor, function (err, row) {
    if (row) {
      const buildingNum = row[0].buildNum;
      const params = {
        buildingNum,
        sellor,
        title,
        content,
        productState,
      };
      mySqlClient.query(insertSql, params, function (err) {
        if (err) {
          console.log('Insert err >>' + err);
          res.send(
            `<script type="text/javascript">alert("등록 중 오류가 발생했습니다."); window.history.back();</script>`,
          );
        } else {
          res.send(
            '<script type="text/javascript">alert("상품 등록이 완료되었어요!"); location.href="/panda";</script>',
          );
        }
      });
    } else {
      console.log(err);
    }
  });
};

const getProduct = function (req, res) {
  const pandaId = req.params.pid;
  const getProductSql =
    'SELECT pandaId, roomNum, sellor, title, content, regDate, productState FROM panda p, user u, room r WHERE p.sellor = u.user_id AND r.tenantID = p.sellor AND pandaId = ?;';

  mySqlClient.query(getProductSql, pandaId, (err, row) => {
    if (err) {
      res.send(
        '<script type="text/javascript">alert("잘못된 DB 접근입니다."); window.location="/panda";</script>',
      );
    } else {
      let isSellor;
      if (row[0].sellor === req.session.user.userId) {
        isSellor = 1;
      } else {
        isSellor = 0;
      }
      res.render('panda/product.html', {
        userType: req.session.user.userType,
        panda: row[0],
        isSellor,
      });
    }
  });
};

const productSold = function (req, res) {
  const pandaId = req.params.pid;
  const updateStateSql = 'UPDATE panda SET productState=1 WHERE sellor=? AND pandaId=?;';

  mySqlClient.query(updateStateSql, [req.session.user.userId, pandaId], (err, row) => {
    if (err) {
      res.send(
        '<script type="text/javascript">alert("잘못된 DB 접근입니다."); window.location="/panda";</script>',
      );
    } else {
      res.send(
        '<script type="text/javascript">alert("판매 완료로 처리되었어요!"); window.history.back();</script>',
      );
    }
  });
};

module.exports = {
  getPanda,
  getAddProduct,
  postAddProduct,
  getProduct,
  productSold,
};
