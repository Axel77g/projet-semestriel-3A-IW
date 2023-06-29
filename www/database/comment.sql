DROP TABLE IF EXISTS "frw_comment" CASCADE;

CREATE TABLE frw_comment (
  id SERIAL,
  article_id INTEGER NOT NULL,
  author_id INTEGER NOT NULl,
  comment_id INTEGER,
  content TEXT NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP NOT NULL DEFAULT NOW(),
  PRIMARY KEY (id),
  FOREIGN KEY (author_id) REFERENCES frw_user (id) ON DELETE CASCADE,
  FOREIGN KEY (article_id) REFERENCES frw_article (id) ON DELETE CASCADE,
  FOREIGN KEY (comment_id) REFERENCES frw_comment (id) ON DELETE CASCADE
);

-- CONSTRAINTS 
ALTER TABLE frw_comment
ADD CONSTRAINT fk_article_id
FOREIGN KEY (article_id) REFERENCES frw_article(id);

ALTER TABLE frw_comment
ADD CONSTRAINT fk_author_id
FOREIGN KEY (author_id) REFERENCES frw_user(id);

ALTER TABLE frw_comment
ADD CONSTRAINT fk_comment_id
FOREIGN KEY (comment_id) REFERENCES frw_comment(id);
