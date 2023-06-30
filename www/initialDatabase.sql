
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
        password VARCHAR(100) NOT NULL
    );

    -- ARTICLES

    DROP TABLE IF EXISTS frw_article CASCADE;
    CREATE TABLE frw_article (
        id SERIAL,
        title varchar(255) NOT NULL,
        description text NOT NULL,
        content text NOT NULL,
        author int NOT NULL,
        views int NOT NULL DEFAULT 0,
    --    likes int NOT NULL DEFAULT 0,
        created_at TIMESTAMP NOT NULL,
        updated_at TIMESTAMP NOT NULL,
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
    