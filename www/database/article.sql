DROP TABLE IF EXISTS frw_article CASCADE;

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

INSERT INTO frw_article (title, content, author, created_at, updated_at) VALUES ('Article 1', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla euismod, nisl eget aliquam ultricies, nunc nisl aliquet nunc', 1, NOW(), NOW());