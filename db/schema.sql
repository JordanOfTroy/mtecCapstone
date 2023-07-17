drop table if exists teacher;
drop table if exists students;
drop table if exists courses;
drop table if exists teacher_courses;
drip table if exists student_courses;


create table teachers (
    id serial primary key,
    is_admin boolean default 1,
    first_name varchar (60),
    last_name varchar (60),
    email varchar(250) unique not null
);

create table students (
    id serial primary key,
    is_admin boolean default 0,
    first_name varchar (60),
    last_name varchar (60),
    email varchar(250) unique not null
);

create table courses (
    id serial primary key,
    title varchar (60),
    course_code varchar (60),
    credit_hours integer,
    tuition_cost integer,
    description text,
    foreign key (teacher_id) references teachers(id),
    capacity integer,
    enrolled integer,
    days_of_week varchar (7),
    start_time time,
    end_time time,
    room_number varchar (30),

);

create table teacher_courses (
    id serial primary key,
    foreign key (teacher_id) references teachers(id),
    foreign key (course_id) references courses(id)
);

create table student_courses (
    id serial primary key,
    foreign key (student_id) references students(id),
    foreign key (course_id) references courses(id)
);
