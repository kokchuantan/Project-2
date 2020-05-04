CREATE TABLE IF NOT EXISTS users (
    id serial PRIMARY KEY,
    username text,
    userpassword text
);

CREATE TABLE IF NOT EXISTS list (
    id serial PRIMARY KEY,
    user_id int,
    content text not null,
    category_id int,
    time_created text,
    time_completed text,
    urgent int not null
);

CREATE TABLE IF NOT EXISTS category (
    id serial primary key,
    name text
);