
    -- Author: ESGI
    -- Date: 2019-01-10 10:00:00
    -- Last update: 2019-01-10 10:00:00
    -- Version: 1.0.0


    DROP TYPE IF EXISTS TYPE_ROLE CASCADE;
    CREATE TYPE TYPE_ROLE AS ENUM ('admin', 'user');

    DROP TYPE IF EXISTS STATUT_COMMENT CASCADE;
    CREATE TYPE STATUT_COMMENT AS ENUM ('pending', 'validated', 'refused');


    -- USERS
    DROP TABLE IF EXISTS demo_user CASCADE;
    CREATE TABLE demo_user (
        id SERIAL PRIMARY KEY,
        role TYPE_ROLE DEFAULT 'user',
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

    DROP TABLE IF EXISTS demo_article CASCADE;
    CREATE TABLE demo_article (
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
        FOREIGN KEY (author) REFERENCES demo_user(id) ON DELETE CASCADE
    );

    -- COMMENTS

    DROP TABLE IF EXISTS demo_comment CASCADE;
    CREATE TABLE demo_comment (
        id SERIAL,
        content text NOT NULL,
        author int NOT NULL,
        article int NOT NULL,
        comment int,
        statut STATUT_COMMENT DEFAULT 'pending',
        created_at TIMESTAMP NOT NULL DEFAULT NOW(),
        updated_at TIMESTAMP NOT NULL DEFAULT NOW(),
        FOREIGN KEY (author) REFERENCES demo_user(id) ON DELETE CASCADE,
        FOREIGN KEY (article) REFERENCES demo_article(id) ON DELETE CASCADE,
        FOREIGN KEY (comment) REFERENCES demo_comment(id) ON DELETE CASCADE,
        PRIMARY KEY (id)
    );

    -- Auth
    DROP TABLE IF EXISTS demo_auth CASCADE;
    CREATE TABLE demo_auth (
        id SERIAL,
        token varchar NULL,
        expire_on TIMESTAMP NULL,
        user_id int4 NULL,
        created_at TIMESTAMP NOT NULL DEFAULT NOW(),
        updated_at TIMESTAMP NOT NULL DEFAULT NOW(),
        FOREIGN KEY (user_id) REFERENCES demo_user(id) ON DELETE CASCADE,
        PRIMARY KEY (id)
    );
    -- Upload
    DROP TABLE IF EXISTS demo_file CASCADE;
    CREATE TABLE demo_file (
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
        FOREIGN KEY (user_id) REFERENCES demo_user(id) ON DELETE CASCADE,
        PRIMARY KEY (id)
    );

    -- Pages

    DROP TABLE IF EXISTS demo_page;

    DROP TYPE IF EXISTS TEMPLATE_PAGE CASCADE;
    CREATE TYPE TEMPLATE_PAGE AS ENUM ('home', 'article','article_list');

    CREATE TABLE demo_page(
        id SERIAL PRIMARY KEY NOT NULL,
        author_id INTEGER NOT NULL,
        parent_slug VARCHAR(255),
        slug VARCHAR(255) NOT NULL,
        title VARCHAR(255) NOT NULL,
        template TEMPLATE_PAGE NOT NULL,
        content TEXT NOT NULL,

        FOREIGN KEY (author_id) REFERENCES demo_user(id) ON DELETE CASCADE
    );

    -- Menu

    DROP TABLE IF EXISTS demo_menu;

    CREATE TABLE demo_menu (
        id SERIAL PRIMARY KEY,
        parent_id INT NULL DEFAULT 0,
        title VARCHAR(255) NOT NULL,
        url VARCHAR(255) NOT NULL,
        visible SMALLINT NOT NULL DEFAULT 1,
        position INT NOT NULL DEFAULT 0,
        created_at TIMESTAMP NOT NULL DEFAULT NOW(),
        updated_at TIMESTAMP NOT NULL DEFAULT NOW(),
        CONSTRAINT fk_demo_menu_parent_id FOREIGN KEY (parent_id) REFERENCES demo_menu(id) ON DELETE CASCADE
    );
    