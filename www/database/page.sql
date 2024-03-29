DROP TABLE IF EXISTS frw_page;

CREATE TYPE TEMPLATE_PAGE AS ENUM ('home', 'article','article_list');

CREATE TABLE frw_page(
    id SERIAL PRIMARY KEY NOT NULL,
    author_id INTEGER NOT NULL,
    parent_slug VARCHAR(255),
    slug VARCHAR(255) NOT NULL,
    title VARCHAR(255) NOT NULL,
    template TEMPLATE_PAGE NOT NULL,
    content TEXT NOT NULL,

    FOREIGN KEY (author_id) REFERENCES frw_user(id) ON DELETE CASCADE
);
