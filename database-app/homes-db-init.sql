CREATE DATABASE IF NOT EXISTS `homes-db`;
USE `homes-db`;
SET GLOBAL time_zone = 'Asia/Seoul';

DROP TABLE IF EXISTS user;
CREATE TABLE user(
id INT NOT NULL PRIMARY KEY AUTO_INCREMENT, # seq넘버
user_id VARCHAR(30) NOT NULL UNIQUE KEY,    # 유저 아이디 
password VARCHAR(1000) NOT NULL,              # 유저 패스워드
name VARCHAR(20) NOT NULL,                  # 유저이름
type VARCHAR(20) NOT NULL,       # 유저 타입 ex) 관리자, 세입자, 건물주
tel VARCHAR(20) NOT NULL,               # 연락처
token VARCHAR(1000) default NULL) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=UTF8;


DROP TABLE IF EXISTS buildings;
CREATE TABLE buildings(
buildingNum INT NOT NULL PRIMARY KEY auto_increment,
building_name VARCHAR(30) NOT NULL,
hostID VARCHAR(30) NOT NULL,
managerID VARCHAR(30) default NULL,
building_addr VARCHAR(100) NOT NULL,
bank_account VARCHAR(50) NOT NULL, # 계좌번호 (ex. 국민 1234)
CONSTRAINT fk_hostID FOREIGN KEY(hostID) REFERENCES user(user_id),
CONSTRAINT fk_managerid FOREIGN KEY(managerID) REFERENCES user(user_id)) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=UTF8;


DROP TABLE IF EXISTS room;
CREATE TABLE room(
roomID INT NOT NULL auto_increment PRIMARY KEY,
buildNum INT NOT NULL,
roomNum INT NOT NULL,
tenantID VARCHAR(30) default NULL,
payment_type TINYINT(1) default 0,
payment_cash INT default 0,
payment_month_ok INT default 0, # 월세 납부 ok
payment_month_day INT default 0, # 월세 정산일(1~31)
begin_date datetime default NULL, # 입주일
end_date datetime default NULL, # 계약 만기일
memo VARCHAR(1000) default NULL, # 건물주 메모
CONSTRAINT fk_buildNum FOREIGN KEY(buildNum) REFERENCES buildings(buildingNum),
CONSTRAINT fk_tenantid FOREIGN KEY(tenantID) REFERENCES user(user_id)) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=UTF8;

DROP TABLE IF EXISTS repair;
CREATE TABLE repair(
repairNum INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
roomID INT NOT NULL,
title VARCHAR(100) NOT NULL,
content VARCHAR(1000) default NULL,
isSolved TINYINT default 0, #0:진행 1:완료
imgSrc VARCHAR(1000) default NULL,
regDate datetime default CURRENT_TIMESTAMP,
CONSTRAINT fk_repairroom FOREIGN KEY(roomID) REFERENCES room(roomID)) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=UTF8;

DROP TABLE IF EXISTS messages;
CREATE TABLE messages(
msgID INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
sender VARCHAR(30) NOT NULL,
receiver VARCHAR(30) NOT NULL,
sendDate datetime default CURRENT_TIMESTAMP,
msgType TINYINT(1) default 0, # 0:기본메시지, 1:유지보수
content VARCHAR(5000) NOT NULL, #메시지내용
isRead TINYINT(1) default 0, # 0:안읽음, 1:읽음
CONSTRAINT fk_sender FOREIGN KEY(sender) REFERENCES user(user_id),
CONSTRAINT fk_receiver FOREIGN KEY(receiver) REFERENCES user(user_id)) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=UTF8;

DROP TABLE IF EXISTS panda;
CREATE TABLE panda(
pandaId INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
sellor VARCHAR(30) NOT NULL,
title VARCHAR(20) NOT NULL,
content VARCHAR(100) default NULL,
productState TINYINT(1) default 0, # 0:판매중, 1:거래완료
regDate datetime default CURRENT_TIMESTAMP,
CONSTRAINT fk_sellor FOREIGN KEY(sellor) REFERENCES user(user_id)) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=UTF8;