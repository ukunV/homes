CREATE DATABASE IF NOT EXISTS `homes-db`;
USE `homes-db`;

DROP TABLE IF EXISTS user;
CREATE TABLE user(
id INT NOT NULL PRIMARY KEY AUTO_INCREMENT, # seq넘버
user_id VARCHAR(30) NOT NULL UNIQUE KEY,    # 유저 아이디 
password VARCHAR(1000) NOT NULL,              # 유저 패스워드
name VARCHAR(20) NOT NULL,                  # 유저이름
type VARCHAR(20) NOT NULL UNIQUE KEY,       # 유저 타입 ex) 관리자, 세입자, 건물주
tel VARCHAR(20) NOT NULL,               # 연락처
token VARCHAR(1000) default NULL) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=UTF8;


DROP TABLE IF EXISTS buildings;
CREATE TABLE buildings(
buildingNum INT NOT NULL PRIMARY KEY auto_increment,
building_name VARCHAR(30) NOT NULL,
hostID VARCHAR(30) NOT NULL,
managerID VARCHAR(30) default NULL,
building_addr VARCHAR(50) NOT NULL,
CONSTRAINT fk_hostID FOREIGN KEY(hostID) REFERENCES user(user_id),
CONSTRAINT fk_managerid FOREIGN KEY(managerID) REFERENCES user(user_id)) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=UTF8;


DROP TABLE IF EXISTS room;
CREATE TABLE room(
buildNum INT NOT NULL,
roomNum VARCHAR(20) NOT NULL,
tenantID VARCHAR(30) default NULL,
payment_type TINYINT(1) default 0,
payment_cash INT default 0,
payment_2020_09 TINYINT(1) default 0,
payment_2020_10 TINYINT(1) default 0,
payment_2020_11 TINYINT(1) default 0,
payment_2020_12 TINYINT(1) default 0,
CONSTRAINT fk_buildNum FOREIGN KEY(buildNum) REFERENCES buildings(buildingNum),
CONSTRAINT fk_tenantid FOREIGN KEY(tenantID) REFERENCES user(user_id)) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=UTF8;


DROP TABLE IF EXISTS account;
CREATE TABLE account(
bankAccount VARCHAR(50) NOT NULL PRIMARY KEY,
typeName VARCHAR(20) NOT NULL,
user_id VARCHAR(30) NOT NULL,
CONSTRAINT fk_typeName FOREIGN KEY(typeName) REFERENCES user(type),
CONSTRAINT fk_user_id FOREIGN KEY(user_id) REFERENCES user(user_id)) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=UTF8;

INSERT INTO `user` (`id`, `user_id`, `password`, `name`, `type`, `tel`, `token`) VALUES
	(1, 'test1', '1ARVn2Auq2/WAqx2gNrL+q3RNjAzXpUfCXrzkA6d4Xa22yhRLy4AC50E+6UTPoscbo31nbOoq51gvkuXzJ6B2w==', '건물주다', '건물주', '01012341234', NULL),
	(2, 'test2', '1ARVn2Auq2/WAqx2gNrL+q3RNjAzXpUfCXrzkA6d4Xa22yhRLy4AC50E+6UTPoscbo31nbOoq51gvkuXzJ6B2w==', '관리인임', '관리인', '01012341234', NULL),
    (3, 'test3', '1ARVn2Auq2/WAqx2gNrL+q3RNjAzXpUfCXrzkA6d4Xa22yhRLy4AC50E+6UTPoscbo31nbOoq51gvkuXzJ6B2w==', '세입자다', '세입자', '01012341234', NULL);