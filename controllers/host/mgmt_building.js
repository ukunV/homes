const mysql = require('mysql');
const checkAccessibleBuilding = require('../checkTools').checkAccessibleBuilding;
const permissionBanMsg = '잘못된 접근입니다.';

const mySqlClient = mysql.createConnection(require('../../config/db_config'));

const mgmt_building_list = function (req, res) {
  // 건물명, 주소 리스트
  const buildingInfoSql =
    'select buildingNum as id, building_name, building_addr from buildings where hostID = ?;';

  mySqlClient.query(buildingInfoSql, req.session.user.userId, function (err, row) {
    // 건물주의 건물이 한개 이상 있는 경우
    if (row[0]) {
      // 모든 소유 건물을 데이터에 저장
      const building_data = [];

      row.forEach((element) => {
        building_data.push(element);
      });

      res.render('host/mgmt_building_list.html', {
        building_data, // 건물 이름, 관리인 이름 데이터 배열
      });
    }
    // 건물주의 건물이 없는 경우
    else {
      res.render('host/mgmt_building_list.html', {
      });
    }
  });
};

const mgmt_building_modify = async function (req, res) {
  // URL 파라미터(건물 번호)로 접근
  const buildingNum = req.params.id;

  const checkAccessible = await checkAccessibleBuilding(buildingNum, req)
    .then((value) => {
      return true;
    })
    .catch((err) => {
      return false;
    });

  if (checkAccessible === false) {
    res.send(
      `<script type="text/javascript">alert("${permissionBanMsg}"); window.location="/";</script>`,
    );
    return;
  }
  const buildingInfoSql =
    'select buildingNum, hostID, building_name, managerID, NAME AS manager_name, building_addr from buildings b, user u WHERE b.managerID = u.user_id AND hostID= ? AND buildingNum = ?;';
  const roomInfoSql = `select roomID, roomNum, tenantId, NAME AS tenant_name, payment_type, payment_cash, payment_month_day, date_format(begin_date,'%Y-%m-%d') as begin_date, date_format(end_date,'%Y-%m-%d') as end_date FROM (SELECT * FROM room WHERE buildNum = ?) AS r LEFT OUTER JOIN user u on r.tenantID = u.user_id;`;

  // 한 건물의 모든 세대의 데이터 저장
  const room_data = [];
  mySqlClient.query(buildingInfoSql, [req.session.user.userId, buildingNum], function (err, row) {
    if (err) {
      console.log(err);
      // 본인 소유 건물이 아닌 경우
      res.send(
        '<script type="text/javascript">alert("잘못된 데이터베이스 접근입니다."); window.location="/";</script>',
      );
    } else {
      let building_data = [];
      if (row) {
        building_data = {
          ...row[0],
        };
      }

      mySqlClient.query(roomInfoSql, buildingNum, function (err, row) {
        if (err) {
          console.log(err);
          res.send(
            '<script type="text/javascript">alert("잘못된 데이터베이스 접근입니다."); window.location="/";</script>',
          );
        } else {
          row.forEach((element) => {
            room_data.push(element);
          });

          res.render('host/mgmt_modify_building.html', {
            ...building_data,
            rooms: room_data, // 세대 데이터 배열
          });
        }
      });
    }
  });
};

module.exports = {
  mgmt_building_list,
  mgmt_building_modify,
};
