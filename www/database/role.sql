DROP TABLE IF EXISTS frw_user CASCADE;

CREATE TABLE frw_role (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL
);

INSERT INTO frw_role (name) VALUES ('admin');