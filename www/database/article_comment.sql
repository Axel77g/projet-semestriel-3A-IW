DROP TABLE IF EXISTS frw_article_comment;

CREATE TABLE frw_article_comment (
  id SERIAL,
  article_id INTEGER NOT NULL,
  comment_id INTEGER NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP NOT NULL DEFAULT NOW(),
  PRIMARY KEY (id),
  FOREIGN KEY (article_id) REFERENCES frw_article (id),
  FOREIGN KEY (comment_id) REFERENCES frw_comment (id)
);

INSERT INTO frw_article_comment (article_id, comment_id) VALUES (1, 2);