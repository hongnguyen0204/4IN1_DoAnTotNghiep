-- create database quanlysukien;
-- use quanlysukien;
create table account_information(
	ID int,
    username varchar(50),
    pwd nvarchar(50),
    email varchar(50),
	fullname nvarchar(50),
    faculty nvarchar(50),
	day_of_birth date,
    phone_number varchar(10),
    role_acc bit,
	primary key(ID)
);

create table event_information(
	ID int,
    event_name nvarchar(100),
    organizer nvarchar(50),
    time_of_event	datetime,
    place	nvarchar(100),
    describe_of_event nvarchar(1000),
    img nvarchar(200),
    planfile nvarchar(200),
    number_of_collaborators int,
    criteria nvarchar(1000),
    end_day date,
    status_of_event nvarchar(20),
    owner_event_id int,
    hot boolean,
	constraint fk_evid foreign key(owner_event_id) references account_information(ID),
    primary key(ID)
);
create table join_register(
	acc_ID int,
    event_ID int,
    event_name nvarchar(100),
	constraint fk_IDACDK foreign key(acc_ID) references account_information(ID),
	constraint fk_IDSKDK foreign key(event_ID) references event_information(ID)
);
create table collaborator(
	user_ID int,
    event_ID int,
	constraint fk_IDNDCTV foreign key(user_ID) references account_information(ID),
	constraint fk_IDSKCTV foreign key(event_ID) references event_information(ID)
);

create table news(
	ID int,
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
	ID_news int,
    ID_acc int,
    act nvarchar(20),
	acttime datetime,
    constraint fk_IDnews foreign key(ID_news) references news(ID),
    constraint fk_IDADMINLS foreign key(ID_acc) references account_information(ID)
);

