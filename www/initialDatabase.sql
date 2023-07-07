
    -- Author: ESGI
    -- Date: 2019-01-10 10:00:00
    -- Last update: 2019-01-10 10:00:00
    -- Version: 1.0.0


    DROP TYPE IF EXISTS TYPEROLE CASCADE;
    CREATE TYPE TYPEROLE AS ENUM ('admin', 'user');


    -- USERS
    DROP TABLE IF EXISTS frwuser CASCADE;
    CREATE TABLE frwuser (
        id SERIAL PRIMARY KEY,
        role TYPEROLE DEFAULT 'user',
        firstname VARCHAR(100) NOT NULL,
        lastname VARCHAR(100) NOT NULL,
        email VARCHAR(100) NOT NULL,
        password VARCHAR(255) NOT NULL,
        is_verified BOOLEAN DEFAULT FALSE,
        verification_code VARCHAR(255),
        reset_code INTEGER,
        created_at TIMESTAMP NOT NULL,
        updated_at TIMESTAMP NOT NULL
    );

    -- ARTICLES

    DROP TABLE IF EXISTS frwarticle CASCADE;
    CREATE TABLE frwarticle (
        id SERIAL,
        slug varchar(255) NOT NULL,
        title varchar(255) NOT NULL,
        description text NOT NULL,
        content text NOT NULL,
        author int NOT NULL,
        image varchar(255) NOT NULL,
        views int NOT NULL DEFAULT 0,
        likes int NOT NULL DEFAULT 0,
        created_at TIMESTAMP NOT NULL,
        updated_at TIMESTAMP NOT NULL,
        PRIMARY KEY (id),
        FOREIGN KEY (author) REFERENCES frwuser(id) ON DELETE CASCADE
    );

    -- COMMENTS

    DROP TABLE IF EXISTS frwcomment CASCADE;
    CREATE TABLE frwcomment (
        id SERIAL,
        content text NOT NULL,
        author int NOT NULL,
        article int NOT NULL,
        comment int,
        created_at TIMESTAMP NOT NULL DEFAULT NOW(),
        updated_at TIMESTAMP NOT NULL DEFAULT NOW(),
        FOREIGN KEY (author) REFERENCES frwuser(id) ON DELETE CASCADE,
        FOREIGN KEY (article) REFERENCES frwarticle(id) ON DELETE CASCADE,
        FOREIGN KEY (comment) REFERENCES frwcomment(id) ON DELETE CASCADE,
        PRIMARY KEY (id)
    );

    -- Auth
    DROP TABLE IF EXISTS frwauth CASCADE;
    CREATE TABLE frwauth (
        id SERIAL,
        token varchar NULL,
        expire_on TIMESTAMP NULL,
        user_id int4 NULL,
        created_at TIMESTAMP NOT NULL DEFAULT NOW(),
        updated_at TIMESTAMP NOT NULL DEFAULT NOW(),
        FOREIGN KEY (user_id) REFERENCES frwuser(id) ON DELETE CASCADE,
        PRIMARY KEY (id)
    );
    -- Upload
    DROP TABLE IF EXISTS frwfile CASCADE;
    CREATE TABLE frwfile (
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
        FOREIGN KEY (user_id) REFERENCES frwuser(id) ON DELETE CASCADE,
        PRIMARY KEY (id)
    );
    