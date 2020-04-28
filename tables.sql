CREATE TABLE IF NOT EXISTS users (
    id serial PRIMARY KEY,
    username text,
    userpassword text
);

CREATE TABLE IF NOT EXISTS list (
    id serial PRIMARY KEY,
    user_id int,
    content text
);
