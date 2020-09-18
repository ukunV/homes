// FOR SERVER - Docker Server
module.exports = {
  connectionLimit: 30,
  host: process.env.DATABASE_HOST,
  user: 'root',
  password: 'homesdb-5177',
  database: 'homes-db',
  dateStrings: 'date',
  charset: 'utf8',
  debug: false,
  insecureAuth: true,
};
// 위에꺼 놔두고 밑에꺼 주석 풀어서 해 정민

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
