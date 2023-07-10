
    -- Author: ESGI
    -- Date: 2019-01-10 10:00:00
    -- Last update: 2019-01-10 10:00:00
    -- Version: 1.0.0


    DROP TYPE IF EXISTS TYPEROLE CASCADE;
    CREATE TYPE TYPEROLE AS ENUM ('admin', 'user');


    -- USERS
    DROP TABLE IF EXISTS frw_user CASCADE;
    CREATE TABLE frw_user (
        id SERIAL PRIMARY KEY,
        role TYPEROLE DEFAULT 'user',
        firstname VARCHAR(100) NOT NULL,
        lastname VARCHAR(100) NOT NULL,
        email VARCHAR(100) NOT NULL,
        password VARCHAR(255) NOT NULL,
        is_verified BOOLEAN DEFAULT FALSE,
        verification_code VARCHAR(255),
        reset_code INTEGER,
        created_at TIMESTAMP NOT NULL DEFAULT NOW(),
        updated_at TIMESTAMP NOT NULL DEFAULT NOW()
    );

    -- ARTICLES

    DROP TABLE IF EXISTS frw_article CASCADE;
    CREATE TABLE frw_article (
        id SERIAL,
        slug varchar(255) NOT NULL,
        title varchar(255) NOT NULL,
        description text NOT NULL,
        content text NOT NULL,
        author int NOT NULL,
        image varchar(255) NOT NULL,
        views int NOT NULL DEFAULT 0,
        likes int NOT NULL DEFAULT 0,
        created_at TIMESTAMP NOT NULL DEFAULT NOW(),
        updated_at TIMESTAMP NOT NULL DEFAULT NOW(),
        PRIMARY KEY (id),
        FOREIGN KEY (author) REFERENCES frw_user(id) ON DELETE CASCADE
    );

    -- COMMENTS

    DROP TABLE IF EXISTS frw_comment CASCADE;
    CREATE TABLE frw_comment (
        id SERIAL,
        content text NOT NULL,
        author int NOT NULL,
        article int NOT NULL,
        comment int,
        created_at TIMESTAMP NOT NULL DEFAULT NOW(),
        updated_at TIMESTAMP NOT NULL DEFAULT NOW(),
        FOREIGN KEY (author) REFERENCES frw_user(id) ON DELETE CASCADE,
        FOREIGN KEY (article) REFERENCES frw_article(id) ON DELETE CASCADE,
        FOREIGN KEY (comment) REFERENCES frw_comment(id) ON DELETE CASCADE,
        PRIMARY KEY (id)
    );

    -- Auth
    DROP TABLE IF EXISTS frw_auth CASCADE;
    CREATE TABLE frw_auth (
        id SERIAL,
        token varchar NULL,
        expire_on TIMESTAMP NULL,
        user_id int4 NULL,
        created_at TIMESTAMP NOT NULL DEFAULT NOW(),
        updated_at TIMESTAMP NOT NULL DEFAULT NOW(),
        FOREIGN KEY (user_id) REFERENCES frw_user(id) ON DELETE CASCADE,
        PRIMARY KEY (id)
    );
    -- Upload
    DROP TABLE IF EXISTS frw_file CASCADE;
    CREATE TABLE frw_file (
        id SERIAL,
        name varchar NULL,
        path varchar NULL,
        extension varchar NULL,
        size int4 NULL,
        mime varchar NULL,
        hash varchar NULL,
        user_id int4 NULL,
        created_at TIMESTAMP NOT NULL DEFAULT NOW(),
        updated_at TIMESTAMP NOT NULL DEFAULT NOW(),
        FOREIGN KEY (user_id) REFERENCES frw_user(id) ON DELETE CASCADE,
        PRIMARY KEY (id)
    );

    -- Pages

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

    -- Menu

    DROP TABLE IF EXISTS frw_menu;

    CREATE TABLE frw_menu (
        id SERIAL PRIMARY KEY,
        parent_id INT NULL DEFAULT 0,
        title VARCHAR(255) NOT NULL,
        url VARCHAR(255) NOT NULL,
        visible SMALLINT NOT NULL DEFAULT 1,
        position INT NOT NULL DEFAULT 0,
        created_at TIMESTAMP NOT NULL DEFAULT NOW(),
        updated_at TIMESTAMP NOT NULL DEFAULT NOW(),
        CONSTRAINT fk_frw_menu_parent_id FOREIGN KEY (parent_id) REFERENCES frw_menu(id) ON DELETE CASCADE
    );
    