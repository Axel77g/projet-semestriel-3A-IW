DROP TABLE IF EXISTS frw_article CASCADE;

-- Créer la table frw_article
CREATE TABLE frw_article (
    id SERIAL PRIMARY KEY NOT NULL,
    author_id INTEGER NOT NULL,
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    description TEXT NOT NULL,
    slug VARCHAR(255) NOT NULL,
    image VARCHAR(255),
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP NOT NULL DEFAULT NOW(),
    FOREIGN KEY (author_id) REFERENCES frw_user(id) ON DELETE CASCADE, 
    FOREIGN KEY (comment_id) REFERENCES frw_comment(id) ON DELETE CASCADE
);

ALTER TABLE frw_article
ADD CONSTRAINT fk_author_id
FOREIGN KEY (author_id) REFERENCES frw_user(id);

ALTER TABLE frw_article
ADD CONSTRAINT fk_comment_id
FOREIGN KEY (comment_id) REFERENCES frw_comment(id);


INSERT INTO frw_article (title, content, author, created_at, updated_at) VALUES ('Article 1', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla euismod, nisl eget aliquam ultricies, nunc nisl aliquet nunc', 1, NOW(), NOW());