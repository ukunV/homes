CREATE DATABASE IF NOT EXISTS `homes-db`;
USE `homes-db`;

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
imgSrc VARCHAR(1000) default NULL,
regDate datetime default CURRENT_TIMESTAMP,
CONSTRAINT fk_repairroom FOREIGN KEY(roomID) REFERENCES room(roomID)) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=UTF8;

DROP TABLE IF EXISTS messages;
CREATE TABLE messages(
msgID INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
sender VARCHAR(30) NOT NULL,
receiver VARCHAR(30) NOT NULL,
sendDate datetime default CURRENT_TIMESTAMP,
msgType TINYINT(1) default 0,
content VARCHAR(5000) default NULL, #메시지내용
CONSTRAINT fk_sender FOREIGN KEY(sender) REFERENCES user(user_id),
CONSTRAINT fk_receiver FOREIGN KEY(receiver) REFERENCES user(user_id)) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=UTF8;


INSERT INTO `user` (`id`, `user_id`, `password`, `name`, `type`, `tel`, `token`) VALUES
	(1, 'test1', '1ARVn2Auq2/WAqx2gNrL+q3RNjAzXpUfCXrzkA6d4Xa22yhRLy4AC50E+6UTPoscbo31nbOoq51gvkuXzJ6B2w==', '건물주다', '건물주', '01012341234', NULL),
	(2, 'test2', '1ARVn2Auq2/WAqx2gNrL+q3RNjAzXpUfCXrzkA6d4Xa22yhRLy4AC50E+6UTPoscbo31nbOoq51gvkuXzJ6B2w==', '관리인임', '관리인', '01012341234', NULL),
    (3, 'test3', '1ARVn2Auq2/WAqx2gNrL+q3RNjAzXpUfCXrzkA6d4Xa22yhRLy4AC50E+6UTPoscbo31nbOoq51gvkuXzJ6B2w==', '세입자1', '세입자', '01012341234', NULL),
    (4, 'test4', '1ARVn2Auq2/WAqx2gNrL+q3RNjAzXpUfCXrzkA6d4Xa22yhRLy4AC50E+6UTPoscbo31nbOoq51gvkuXzJ6B2w==', '세입자2', '세입자', '01012341234', NULL),
    (5, 'test5', '1ARVn2Auq2/WAqx2gNrL+q3RNjAzXpUfCXrzkA6d4Xa22yhRLy4AC50E+6UTPoscbo31nbOoq51gvkuXzJ6B2w==', '세입자3', '세입자', '01012341234', NULL),
    (6, 'test6', '1ARVn2Auq2/WAqx2gNrL+q3RNjAzXpUfCXrzkA6d4Xa22yhRLy4AC50E+6UTPoscbo31nbOoq51gvkuXzJ6B2w==', '세입자4', '세입자', '01012341234', NULL);
    
INSERT INTO `buildings` (`buildingNum`, `building_name`, `hostID`, `managerID`, `building_addr`, `bank_account`) VALUES
	(1, '에덴빌', 'test1', 'test2', '경기도 용인시 수지구 죽전로144번길 19-1', '국민 123-456789-123'),
	(2, '파크빌', 'test1', 'test2', '경기도 용인시 수지구 죽전로144번길 19-1', '신한 123-456789-123'),
	(3, '드림하우스', 'test1', 'test2', '경기도 용인시 수지구 죽전로144번길 19-1', '농협 123-456789-123'),
	(4, '하이빌', 'test1', 'test1', '경기도 용인시 수지구 죽전로144번길 19-1', '기업 123-456789-123');

	
INSERT INTO `room` (`buildNum`, `roomNum`, `tenantID`) VALUES
	(1, 101, 'test3'),
	(1, 102, 'test4'),
	(1, 201, 'test5'),
	(1, 202, 'test6'),
	(2, 101, NULL),
	(2, 102, NULL),
	(2, 201, NULL),
	(2, 202, NULL),
	(3, 101, NULL),
	(3, 102, NULL),
	(3, 201, NULL),
	(3, 202, NULL),
	(4, 101, NULL),
	(4, 102, NULL),
	(4, 201, NULL),
	(4, 202, NULL);