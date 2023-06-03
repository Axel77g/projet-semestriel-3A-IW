DROP TABLE IF EXISTS frw_user CASCADE;

CREATE TABLE frw_user (
    id SERIAL PRIMARY KEY,
    role_id INT,
    firstname VARCHAR(100) NOT NULL,
    lastname VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    password VARCHAR(100) NOT NULL,
    FOREIGN KEY (role_id) REFERENCES frw_role(id) ON DELETE CASCADE
);

INSERT INTO frw_user (role_id, firstname, lastname, email, password) VALUES (1, 'John', 'Doe', 'test@mail.fr', 'password');