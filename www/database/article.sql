DROP TABLE IF EXISTS 'frw_article';

CREATE TABLE frw_article (
  id SERIAL NOT NULL AUTO_INCREMENT,
  title varchar(255) NOT NULL,
  content text NOT NULL,
  author int NOT NULL,
  created_at datetime NOT NULL,
  updated_at datetime NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (author) REFERENCES frw_user(id)
)
