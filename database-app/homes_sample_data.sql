INSERT INTO `user` (`id`, `user_id`, `password`, `name`, `type`, `tel`, `token`) VALUES
	(1, 'test1', '1ARVn2Auq2/WAqx2gNrL+q3RNjAzXpUfCXrzkA6d4Xa22yhRLy4AC50E+6UTPoscbo31nbOoq51gvkuXzJ6B2w==', '건물주다', '건물주', '01012341234', NULL),
	(2, 'test2', '1ARVn2Auq2/WAqx2gNrL+q3RNjAzXpUfCXrzkA6d4Xa22yhRLy4AC50E+6UTPoscbo31nbOoq51gvkuXzJ6B2w==', '관리인임', '관리인', '01012341234', NULL),
	(3, 'test3', '1ARVn2Auq2/WAqx2gNrL+q3RNjAzXpUfCXrzkA6d4Xa22yhRLy4AC50E+6UTPoscbo31nbOoq51gvkuXzJ6B2w==', '세입자1', '세입자', '01012341234', NULL),
	(4, 'test4', '1ARVn2Auq2/WAqx2gNrL+q3RNjAzXpUfCXrzkA6d4Xa22yhRLy4AC50E+6UTPoscbo31nbOoq51gvkuXzJ6B2w==', '세입자2', '세입자', '01012341234', NULL),
	(5, 'test5', '1ARVn2Auq2/WAqx2gNrL+q3RNjAzXpUfCXrzkA6d4Xa22yhRLy4AC50E+6UTPoscbo31nbOoq51gvkuXzJ6B2w==', '세입자3', '세입자', '01012341234', NULL),
	(6, 'test6', '1ARVn2Auq2/WAqx2gNrL+q3RNjAzXpUfCXrzkA6d4Xa22yhRLy4AC50E+6UTPoscbo31nbOoq51gvkuXzJ6B2w==', '세입자4', '세입자', '01012341234', NULL),
	(7, 'test7', '1ARVn2Auq2/WAqx2gNrL+q3RNjAzXpUfCXrzkA6d4Xa22yhRLy4AC50E+6UTPoscbo31nbOoq51gvkuXzJ6B2w==', '세입자5', '세입자', '01012341234', NULL);
	
INSERT INTO `buildings` (`buildingNum`, `building_name`, `hostID`, `managerID`, `building_addr`, `bank_account`) VALUES
	(1, '에덴빌', 'test1', 'test2', '경기도 용인시 수지구 죽전로144번길 19-1', '국민 123-456789-123'),
	(2, '파크빌', 'test1', 'test2', '경기도 용인시 수지구 죽전로144번길 19-1', '신한 123-456789-123'),
	(3, '드림하우스', 'test1', 'test2', '경기도 용인시 수지구 죽전로144번길 19-1', '농협 123-456789-123'),
	(4, '하이빌', 'test1', 'test1', '경기도 용인시 수지구 죽전로144번길 19-1', '기업 123-456789-123');
	
INSERT INTO `room` (`roomID`, `buildNum`, `roomNum`, `tenantID`, `payment_type`, `payment_cash`, `payment_month_ok`, `payment_month_day`, `begin_date`, `end_date`, `memo`) VALUES
	(1, 1, 101, 'test3', 0, 0, 1, 0, '2020-09-26 00:00:00', '2021-04-08 00:00:00', NULL),
	(2, 1, 102, 'test4', 0, 0, 1, 0, NULL, NULL, NULL),
	(3, 1, 201, 'test5', 0, 0, 0, 0, NULL, NULL, NULL),
	(4, 1, 202, 'test6', 0, 0, 0, 0, NULL, NULL, NULL),
	(5, 2, 101, NULL, 0, 0, 0, 0, NULL, NULL, NULL),
	(6, 2, 102, NULL, 0, 0, 0, 0, NULL, NULL, NULL),
	(7, 2, 201, NULL, 0, 0, 1, 0, NULL, NULL, NULL),
	(8, 2, 202, NULL, 0, 0, 0, 0, NULL, NULL, NULL),
	(9, 3, 101, NULL, 0, 0, 0, 0, NULL, NULL, NULL),
	(10, 3, 102, NULL, 0, 0, 0, 0, NULL, NULL, NULL),
	(11, 3, 201, NULL, 0, 0, 0, 0, NULL, NULL, NULL),
	(12, 3, 202, NULL, 0, 0, 0, 0, NULL, NULL, NULL),
	(13, 4, 101, NULL, 0, 0, 0, 0, NULL, NULL, NULL),
	(14, 4, 102, NULL, 0, 0, 0, 0, NULL, NULL, NULL),
	(15, 4, 201, NULL, 0, 0, 0, 0, NULL, NULL, NULL),
	(16, 4, 202, NULL, 0, 0, 0, 0, NULL, NULL, NULL);