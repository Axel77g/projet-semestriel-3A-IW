DROP TABLE IF EXISTS frw_auth CASCADE;

CREATE TABLE frw_auth (
	id SERIAL,
	"token" varchar NULL,
	expire_on TIMESTAMP NULL,
	user_id int4 NULL,

    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP NOT NULL DEFAULT NOW(),

    PRIMARY KEY (id)
);

ALTER TABLE frw_auth ADD CONSTRAINT user_foregin FOREIGN KEY (user_id) REFERENCES frw_user(id);