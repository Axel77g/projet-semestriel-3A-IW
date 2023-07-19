DROP TABLE IF EXISTS frw_article_comment CASCADE;
DROP TABLE IF EXISTS frw_article CASCADE;
DROP TABLE IF EXISTS frw_comment CASCADE;
DROP TABLE IF EXISTS frw_user CASCADE;
DROP TABLE IF EXISTS frw_role CASCADE;


--  ROLES
CREATE TABLE frw_role (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL
);

-- USERS

CREATE TABLE frw_user (
    id SERIAL PRIMARY KEY,
    role_id INT,
    firstname VARCHAR(100) NOT NULL,
    lastname VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    password VARCHAR(100) NOT NULL,
    FOREIGN KEY (role_id) REFERENCES frw_role(id) ON DELETE CASCADE
);

-- ARTICLES

CREATE TABLE frw_article (
  id SERIAL,
  title varchar(255) NOT NULL,
  content text NOT NULL,
  author int NOT NULL,
  created_at TIMESTAMP NOT NULL,
  updated_at TIMESTAMP NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (author) REFERENCES frw_user(id) ON DELETE CASCADE
);

-- COMMENTS

CREATE TABLE frw_comment (
  id SERIAL,
  content text NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP NOT NULL DEFAULT NOW(),
  PRIMARY KEY (id)
);

-- ARTICLE COMMENTS

CREATE TABLE frw_article_comment (
  id SERIAL,
  article_id INTEGER NOT NULL,
  comment_id INTEGER NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP NOT NULL DEFAULT NOW(),
  PRIMARY KEY (id),
  FOREIGN KEY (article_id) REFERENCES frw_article (id) ON DELETE CASCADE,
  FOREIGN KEY (comment_id) REFERENCES frw_comment (id) ON DELETE CASCADE
);

-- INSERTS

INSERT INTO frw_role (name) VALUES ('admin');
INSERT INTO frw_user (role_id, firstname, lastname, email, password) VALUES ((SELECT id FROM frw_role WHERE name = 'admin' LIMIT 1), 'John', 'Doe', 'test@mail.fr', 'password');
INSERT INTO frw_article (title, content, author, created_at, updated_at) VALUES ('Article 1', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla euismod, nisl eget aliquam ultricies, nunc nisl aliquet nunc', (SELECT id FROM frw_user LIMIT 1), NOW(), NOW());
INSERT INTO frw_comment (content) VALUES ('Comment 1');
INSERT INTO frw_article_comment (article_id, comment_id) VALUES ((SELECT id FROM frw_article LIMIT 1), (SELECT id FROM frw_comment LIMIT 1));
