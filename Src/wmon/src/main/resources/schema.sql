
CREATE TABLE IF NOT EXISTS usr (
	id VARCHAR(32) NOT NULL,
	first_name VARCHAR(32) NOT NULL,
	last_name VARCHAR(32) NOT NULL,
	password VARCHAR(32) NOT NULL,
	role_name VARCHAR(32) NOT NULL,
	PRIMARY KEY (id)
);


CREATE TABLE IF NOT EXISTS robot (
	id VARCHAR(255) NOT NULL,
	name VARCHAR(255) NOT NULL,
	PRIMARY KEY (id)
);


CREATE TABLE IF NOT EXISTS track (
	id SERIAL NOT NULL,
	date_time DATETIME NOT NULL,
	robot_id int8 NOT NULL,
	x float4 NOT NULL,
	y float4 NOT NULL,
	speed float4,
	PRIMARY KEY (id)
);

