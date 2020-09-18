USE HOMES;

DROP TABLE IF EXISTS user;
CREATE TABLE user(
id INT NOT NULL PRIMARY KEY AUTO_INCREMENT, # seq넘버
user_id VARCHAR(30) NOT NULL UNIQUE KEY,    # 유저 아이디 
user_pwd VARCHAR(30) NOT NULL,              # 유저 패스워드
name VARCHAR(20) NOT NULL,                  # 유저이름
type VARCHAR(20) NOT NULL UNIQUE KEY,       # 유저 타입 ex) 관리자, 세입자, 건물주
tel VARCHAR(20) NOT NULL,               # 연락처
token VARCHAR(1000) default NULL);


DROP TABLE IF EXISTS buildings;
CREATE TABLE buildings(
buildingNum INT NOT NULL PRIMARY KEY auto_increment,
buildingName VARCHAR(30) NOT NULL,
hostID VARCHAR(30) NOT NULL,
managerID VARCHAR(30) default NULL,
address VARCHAR(50) NOT NULL,
CONSTRAINT fk_hostID FOREIGN KEY(hostID) REFERENCES user(user_id),
CONSTRAINT fk_managerid FOREIGN KEY(managerID) REFERENCES user(user_id));


DROP TABLE IF EXISTS room;
CREATE TABLE room(
buildNum INT NOT NULL,
roomNum VARCHAR(20) NOT NULL,
tenantID VARCHAR(30) default NULL,
payment_2020_09 TINYINT(1) default 0,
payment_2020_10 TINYINT(1) default 0,
payment_2020_11 TINYINT(1) default 0,
payment_2020_12 TINYINT(1) default 0, 
payment INT NOT NULL,
duedate VARCHAR(20) NOT NULL,
CONSTRAINT fk_buildNum FOREIGN KEY(buildNum) REFERENCES buildings(buildingNum),
CONSTRAINT fk_tenantid FOREIGN KEY(tenantID) REFERENCES user(user_id));


DROP TABLE IF EXISTS account;
CREATE TABLE account(
bankAccount VARCHAR(50) NOT NULL PRIMARY KEY,
typeName VARCHAR(20) NOT NULL,
user_id VARCHAR(30) NOT NULL,
CONSTRAINT fk_typeName FOREIGN KEY(typeName) REFERENCES user(type),
CONSTRAINT fk_user_id FOREIGN KEY(user_id) REFERENCES user(user_id));