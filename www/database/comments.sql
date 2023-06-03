DROP TABLE IF EXISTS frw_comment;

CREATE TABLE frw_comment (
  id SERIAL,
  content text NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP NOT NULL DEFAULT NOW(),
  PRIMARY KEY (id)
)

INSERT INTO frw_comment (content) VALUES ('Comment 1');