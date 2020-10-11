// FOR SERVER - Docker Server
module.exports = {
  connectionLimit: 30,
  host: process.env.DATABASE_HOST,
  user: 'root',
  password: 'homesdb-5177',
  database: 'homes-db',
  dateStrings: 'date',
  charset: 'utf8',
  timezone: 'Asia/Seoul',
  debug: false,
  insecureAuth: true,
};

// 위에 Server용 절대 지우지말것
// 테스트할거면 밑에서 컨픽짜서 하기바람

// //FOR LOCAL TEST - 정민
// module.exports = {
//   connectionLimit: 30,
//   host: 'localhost',
//   user: 'root',
//   password: 'wjdals159!',
//   database: 'test1',
//   dateStrings: 'date',
//   charset  : 'utf8',
//   debug: false,
//  insecureAuth: true
// };

// //FOR LOCAL TEST - 전진
// module.exports = {
//   connectionLimit: 30,
//   host: 'localhost',
//   user: 'root',
//   password: 'wjswls1',
//   database: 'homes-db',
//   dateStrings: 'date',
//   charset: 'utf8',
//   debug: false,
//   insecureAuth: true,
// };
