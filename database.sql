-- drop database quanlysukien;
-- create database quanlysukien;
-- use quanlysukien;

create table account_information(
	ID int AUTO_INCREMENT,
    username varchar(50),
    pwd nvarchar(50),
    email varchar(50),
	fullname nvarchar(50),
    faculty nvarchar(50),
	day_of_birth date,
    phone_number varchar(10),
    img nvarchar(200),
    gender boolean,
    role_acc boolean null default 0,
    status_acc boolean null default 0,
	primary key(ID)
);

create table event_information(
	ID int AUTO_INCREMENT,
    event_name nvarchar(100),
    organizer nvarchar(50),
    time_of_event	datetime,
    place	nvarchar(100),
    faculty nvarchar(50),
    describe_of_event nvarchar(1000),
    content nvarchar(10000),
    img nvarchar(200),
    planfile nvarchar(200),
    number_of_collaborators int,
    criteria nvarchar(1000),
    end_day date,
    status_of_event nvarchar(20) null default "Đang chờ",
    owner_event_id int,
    hot boolean,
	constraint fk_evid foreign key(owner_event_id) references account_information(ID),
    primary key(ID)
);
create table join_register(
	ID int AUTO_INCREMENT,
	acc_ID int,
    event_ID int,
    event_name nvarchar(100),
    primary key(ID),
	constraint fk_IDACDK foreign key(acc_ID) references account_information(ID),
	constraint fk_IDSKDK foreign key(event_ID) references event_information(ID)
);
create table collaborator(
	ID int AUTO_INCREMENT,
	user_ID int ,
    event_ID int,
    primary key(ID),
	constraint fk_IDNDCTV foreign key(user_ID) references account_information(ID),
	constraint fk_IDSKCTV foreign key(event_ID) references event_information(ID)
);

create table news(
	ID int AUTO_INCREMENT,
    title nvarchar(100),
    describe_of_news nvarchar(500),
    content text,
    img nvarchar(200),
    postday date,
    ID_admin int,
    constraint fk_IDADMINTT foreign key(ID_admin) references account_information(ID),
    primary key(ID)
);
create table history(
	ID int AUTO_INCREMENT,
	ID_news int,
    ID_acc int,
    act nvarchar(20),
	acttime datetime,
    primary key(ID),
    constraint fk_IDnews foreign key(ID_news) references news(ID),
    constraint fk_IDADMINLS foreign key(ID_acc) references account_information(ID)
);

