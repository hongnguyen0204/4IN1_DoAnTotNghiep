
drop database quanlysukien;
create database quanlysukien;
use quanlysukien;

create table account_information(
	ID int AUTO_INCREMENT,
    username varchar(50),
    password nvarchar(200),
    email varchar(50),
	fullname nvarchar(50),
    faculty nvarchar(50),
	day_of_birth datetime,
    phone_number varchar(10),
    advantages nvarchar(200),
    img nvarchar(200),
    gender boolean null default 0,
    status_acc boolean null default 0,
	reset_password_token varchar(50),
    ban boolean null default 0,
	primary key(ID)
);

create table event_information(
	ID int AUTO_INCREMENT,
    event_name nvarchar(100),
    organizer nvarchar(50),
    time_of_event datetime,
    place	nvarchar(100),
    faculty nvarchar(50),
    describe_of_event nvarchar(500),
    content nvarchar(10000),
    img nvarchar(200),
    planfile nvarchar(200),
    number_of_collaborators int null default 0,
	number_of_peoples int null default 0,
    criteria nvarchar(200),
    end_day datetime,
    status_of_event nvarchar(20) null default "Đang chờ",
    time_upload datetime,
    owner_event_id int,
    hot boolean null default 0,
	constraint fk_evid foreign key(owner_event_id) references account_information(ID),
    primary key(ID)
);
create table join_register(
	ID int AUTO_INCREMENT,
	acc_ID int,
    event_ID int,
    primary key(ID),
	constraint fk_IDACDK foreign key(acc_ID) references account_information(ID),
	constraint fk_IDSKDK foreign key(event_ID) references event_information(ID)
);
create table collaborator(
	ID int AUTO_INCREMENT,
	user_ID int ,
    event_ID int,
    status_col boolean,
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
    post_day date,
    ID_admin int,
    constraint fk_IDADMINTT foreign key(ID_admin) references account_information(ID),
    primary key(ID)
);
create table history(
	ID int AUTO_INCREMENT,
	ID_news int,
    ID_acc int,
    act nvarchar(20),
	act_time datetime,
    primary key(ID),
    constraint fk_IDnews foreign key(ID_news) references news(ID),
    constraint fk_IDADMINLS foreign key(ID_acc) references account_information(ID)
);
create table roles
(
    ID   int auto_increment
        primary key,
    name varchar(20) null
);
create table user_roles
(
    acc_id  int not null,
    role_id int not null,
    primary key (acc_id, role_id),
    constraint FK2w8pmf29beeop8352ql66ffm0
        foreign key (acc_id) references account_information (ID),
    constraint FKh8ciramu9cc9q3qcqiv4ue8a6
        foreign key (role_id) references rolesroles (ID)
);


insert into roles value(1,"ROLE_USER");
insert into roles value(2,"ROLE_MODERATOR");
insert into roles value(3,"ROLE_ADMIN");