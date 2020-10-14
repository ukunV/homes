const fs = require('fs'),
  multer = require('multer'),
  mysql = require('mysql');

const mySqlClient = mysql.createConnection(require('../../config/db_config'));

const baseImgDir = 'public/resources/panda_images/';

// 이미지 폴더 없으면 생성
const mkdir = function (dirPath) {
  const isExists = fs.existsSync(dirPath);
  if (!isExists) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
};

const pandaUpload = multer({
  storage: multer.diskStorage({
    destination(req, file, cb) {
      const currentDirPath = baseImgDir;
      //폴더 없으면 생성
      console.log(currentDirPath);
      mkdir(currentDirPath);
      cb(null, baseImgDir);
    },
    filename(req, file, cb) {
      var currentFileName;
      var selectLastIdSql = 'select * from panda ORDER BY pandaId DESC limit 1';
      //파일 이름: 최근(last) defact id + 1
      mySqlClient.query(selectLastIdSql, function (err, row) {
        if (err) {
          console.log('selectLastIdSql ERROR>>' + err);
        } else if (row[0]) {
          lastId = parseInt(row[0].pandaId);
          currentFileName = lastId + 1 + '.png';
          cb(null, currentFileName);
        } else {
          //하자 리스트에 아무것도 없는 경우
          console.log('last id 조회 결과 없음, id 1');
          currentFileName = '1.png';
          cb(null, currentFileName);
        }
      });
    },
  }),
  limits: {
    fileSize: 10 * 1024 * 1024, //img Limit: 10MB
  },
});

module.exports.imgUpload = pandaUpload;
