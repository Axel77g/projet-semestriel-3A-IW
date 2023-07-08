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