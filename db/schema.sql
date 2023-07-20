DROP TABLE IF EXISTS teachers;
DROP TABLE IF EXISTS students;
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS courses;
DROP TABLE IF EXISTS teachers_courses;
DROP TABLE IF EXISTS students_courses;

CREATE TABLE users (
    id serial primary key,
    is_admin boolean default 'false',
    first_name varchar (60),
    last_name varchar (60),
    email varchar (250) unique not null,
    password varchar(250) not null
);

CREATE TABLE courses (
    id serial primary key,
    teacher_id integer,
    title varchar(60),
    course_code varchar(60),
    credit_hours integer,
    tuition integer,
    description text,
    capacity integer,
    enrolled integer,
    days_of_week varchar(7),
    start_time time,
    end_time time,
    room_number varchar(30),
    foreign key (teacher_id) references users(id)
);

CREATE TABLE teachers_courses (
    id serial primary key,
    teacher_id integer,
    course_id integer,
    foreign key (teacher_id) references users(id),
    foreign key (course_id) references courses(id)
);

CREATE TABLE students_courses (
    id serial primary key,
    student_id integer,
    course_id integer,
    foreign key (student_id) references users(id),
    foreign key (course_id) references courses(id)
);