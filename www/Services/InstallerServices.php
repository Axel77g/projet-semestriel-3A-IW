<?php

namespace App\Services;

use App\Errors\UserAlreadyExists;
use App\Models\Menu;
use App\Models\Page;
use App\Models\User;

class InstallerServices{

    static function writeConfig($payload){
        $myfile = fopen("./config.php", "w");
    
        fwrite($myfile, '<?php'); 
        fwrite($myfile, "\n");  
        fwrite($myfile, "\n");  
    
        fwrite($myfile, 'define(\'ROUTES\', \'routes.php\');');  
        fwrite($myfile, "\n");
        fwrite($myfile, 'define("ENV", "dev");');
        fwrite($myfile, "\n");
        fwrite($myfile, "\n");
        fwrite($myfile, 'define("DEFAULT_ROLE","user");');
        fwrite($myfile, "\n");
        fwrite($myfile, "\n");
        fwrite($myfile, 'define("TITLE","' . str_replace("&quot;", "", $payload["input_name_site"]) . '");');
        fwrite($myfile, "\n");
        fwrite($myfile, "\n");
    
        fwrite($myfile, 'define("DB_DRIVER", "pgsql");');
        fwrite($myfile, "\n");
        fwrite($myfile, 'define("DB_PORT", ' . $payload["input_port_database"] . ');');
        fwrite($myfile, "\n");
        fwrite($myfile, 'define("DB_HOST", "' . str_replace("&quot;", "", $payload["input_host_database"]) . '");');
        fwrite($myfile, "\n");
        fwrite($myfile, 'define("DB_NAME", "' . str_replace("&quot;", "", $payload["input_name_database"]) . '");');
        fwrite($myfile, "\n");
        fwrite($myfile, 'define("DB_USERNAME","' . str_replace("&quot;", "", $payload["input_username_database"]) . '");');
        fwrite($myfile, "\n");
        fwrite($myfile, 'define("DB_PASSWORD","' . str_replace("&quot;", "", $payload["input_password_database"]) . '");');
        fwrite($myfile, "\n");
        fwrite($myfile, 'define("DB_PREFIX","' . str_replace("&quot;", "", $payload["input_table_prefix_database"]) . '");');
        fwrite($myfile, "\n");
        fwrite($myfile, "\n");
    
        fwrite($myfile, 'define("APP_KEY", "SALT");');
        fwrite($myfile, "\n");
        fwrite($myfile, "\n");
        fwrite($myfile, "\n");
    
        fwrite($myfile, 'define("SMTP_HOST", "' . str_replace("&quot;", "", $payload["input_host_smtp"]) . '");');
        fwrite($myfile, "\n");
        fwrite($myfile, 'define("SMTP_PORT", ' . $payload["input_port_smtp"] . ');');
        fwrite($myfile, "\n");
        fwrite($myfile, 'define("SMTP_USERNAME", "' . str_replace("&quot;", "", $payload["input_username_smtp"]) . '");');
        fwrite($myfile, "\n");
        fwrite($myfile, 'define("SMTP_PASSWORD", "' . str_replace("&quot;", "", $payload["input_password_smtp"]) . '");');
        fwrite($myfile, "\n");
    
        fclose($myfile);
    }
    
    static function writeInitialDatabase($prefix){
        $myfile = fopen("./initialDatabase.sql", "w");
        fwrite($myfile, "
        -- Author: ESGI
        -- Date: 2019-01-10 10:00:00
        -- Last update: 2019-01-10 10:00:00
        -- Version: 1.0.0
    
    
        DROP TYPE IF EXISTS TYPE_ROLE CASCADE;
        CREATE TYPE TYPE_ROLE AS ENUM ('admin', 'user');
    
        DROP TYPE IF EXISTS STATUS_COMMENT CASCADE;
        CREATE TYPE STATUS_COMMENT AS ENUM ('pending', 'validated', 'refused');
    
    
        -- USERS
        DROP TABLE IF EXISTS " . $prefix . "user CASCADE;
        CREATE TABLE " . $prefix . "user (
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
    
        -- Pages
        DROP TABLE IF EXISTS ". $prefix ."page CASCADE;
        DROP TYPE IF EXISTS TEMPLATE_PAGE CASCADE;
        CREATE TYPE TEMPLATE_PAGE AS ENUM ('home', 'article','article_list');
        CREATE TABLE ". $prefix ."page(
            id SERIAL PRIMARY KEY NOT NULL,
            author_id INTEGER NOT NULL,
            parent_slug VARCHAR(255),
            slug VARCHAR(255) NOT NULL,
            title VARCHAR(255) NOT NULL,
            template TEMPLATE_PAGE NOT NULL,
            content TEXT NOT NULL,
            is_commentable SMALLINT NOT NULL DEFAULT 1,
            views INTEGER NOT NULL DEFAULT 0,
            created_at TIMESTAMP NOT NULL DEFAULT NOW(),
            updated_at TIMESTAMP NOT NULL DEFAULT NOW(),
            FOREIGN KEY (author_id) REFERENCES ". $prefix ."user(id) ON DELETE CASCADE
        );
    
        -- COMMENTS
    
        DROP TABLE IF EXISTS " . $prefix . "comment CASCADE;
        CREATE TABLE " . $prefix . "comment (
            id SERIAL,
            content text NOT NULL,
            author_id int NOT NULL,
            page_id int NOT NULL,
            comment_id int,
            status STATUS_COMMENT DEFAULT 'pending',
            created_at TIMESTAMP NOT NULL DEFAULT NOW(),
            updated_at TIMESTAMP NOT NULL DEFAULT NOW(),
            FOREIGN KEY (author_id) REFERENCES " . $prefix . "user(id) ON DELETE CASCADE,
            FOREIGN KEY (page_id) REFERENCES " . $prefix . "page(id) ON DELETE CASCADE,
            FOREIGN KEY (comment_id) REFERENCES " . $prefix . "comment(id) ON DELETE CASCADE,
            PRIMARY KEY (id)
        );
    
        -- Auth
        DROP TABLE IF EXISTS " . $prefix . "auth CASCADE;
        CREATE TABLE " . $prefix . "auth (
            id SERIAL,
            token varchar NULL,
            expire_on TIMESTAMP NULL,
            user_id int4 NULL,
            created_at TIMESTAMP NOT NULL DEFAULT NOW(),
            updated_at TIMESTAMP NOT NULL DEFAULT NOW(),
            FOREIGN KEY (user_id) REFERENCES " . $prefix . "user(id) ON DELETE CASCADE,
            PRIMARY KEY (id)
        );
    
        -- Analytics_logs
        DROP TABLE IF EXISTS " . $prefix . "analytics_logs CASCADE;
        CREATE TABLE " . $prefix . "analytics_logs (
            id SERIAL,
            user_id int4 NULL,
            created_at TIMESTAMP NOT NULL DEFAULT NOW(),
            updated_at TIMESTAMP NOT NULL DEFAULT NOW(),
            FOREIGN KEY (user_id) REFERENCES " . $prefix . "user(id) ON DELETE CASCADE,
            PRIMARY KEY (id)
        );
        -- Upload
        DROP TABLE IF EXISTS " . $prefix . "file CASCADE;
        CREATE TABLE " . $prefix . "file (
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
            FOREIGN KEY (user_id) REFERENCES " . $prefix . "user(id) ON DELETE CASCADE,
            PRIMARY KEY (id)
        );
    
        -- Menu
    
        DROP TABLE IF EXISTS " . $prefix . "menu CASCADE;
    
        CREATE TABLE " . $prefix . "menu (
            id SERIAL PRIMARY KEY,
            parent_id INT NULL DEFAULT NULL,
            title VARCHAR(255) NOT NULL,
            page_id INT NOT NULL,
            visible SMALLINT NOT NULL DEFAULT 1,
            position INT NOT NULL DEFAULT 0,
            created_at TIMESTAMP NOT NULL DEFAULT NOW(),
            updated_at TIMESTAMP NOT NULL DEFAULT NOW(),
    
            is_footer SMALLINT NOT NULL DEFAULT 0,
            is_header SMALLINT NOT NULL DEFAULT 0,
    
            FOREIGN KEY (page_id) REFERENCES " . $prefix . "page(id) ON DELETE CASCADE ON UPDATE CASCADE,
            CONSTRAINT fk_" . $prefix . "menu_parent_id FOREIGN KEY (parent_id) REFERENCES " . $prefix . "menu(id) ON DELETE CASCADE
        );

        -- History

        DROP TABLE IF EXISTS " . $prefix . "history CASCADE;
        CREATE TABLE " . $prefix . "history (
            id SERIAL PRIMARY KEY,
            model_id INT NOT NULL,
            model VARCHAR(255) NOT NULL,
            data TEXT NOT NULL,
            created_at TIMESTAMP NOT NULL DEFAULT NOW(),
            updated_at TIMESTAMP NOT NULL DEFAULT NOW(),

        );
        
        ");
        fclose($myfile);
    }

    static function createUser($payload){
        $existing = User::fetch(["email"=>$payload['input_email_site']]);
            if($existing) throw new UserAlreadyExists();
    
            $user = new User();
            $user->setFirstname($payload['input_firstname_site']);
            $user->setLastname($payload['input_lastname_site']);
            $user->setEmail($payload['input_email_site']);
            $user->setPassword($payload['input_password_site']);
            $user->setRole("admin");
            $user->setIsVerified(true);
            $user->save();
    }

    static function seedDatabase(){
        # -- Seed home page
        $homePage = new Page();
        $homePage->setAuthorId(1);
        $homePage->setSlug("accueil");
        $homePage->setTitle("Accueil");
        $homePage->setTemplate("home");
        $homePage->setContent([
            "banner"=>[
                "title"=>"Titre du site",
                "subtitle"=>"Sous titre du site",
                "actions"=>[
                    
                ],
                "file_banner"=>null
            ],
            "contact_section"=>[
                "email"=>"email@example.com",
                "phone"=>"00 00 00 00 00",
                "address"=>"10 Rue de Paris, Paris France",
                "socials"=>[],
            ],
            "articles_section"=>[
                "enabled"=>true,
                "type"=>"latest"
            ],
            "about_section_content"=>"<h1>A propos</h1><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer id egestas mauris, a aliquet mi. Donec at porttitor metus, a pretium ipsum. Proin odio justo, dictum at varius et, facilisis vitae eros. Nullam eu felis sed purus dignissim tristique. Quisque vestibulum leo in volutpat rhoncus. Fusce sit amet ante et ipsum aliquet maximus. Cras faucibus mauris vitae est tempus varius. Ut ut semper dolor.</p>"
            
        ]);
        $homePage->save();

        # -- seed an article page
        $article = new Page();
        $article->setAuthorId(1);
        $article->setSlug("article");
        $article->setTitle("Article");
        $article->setTemplate("article");
        $article->setIsCommentable(true);
        $article->setContent([
            "thumbnail"=>null,
            "blocs"=>[
                [
                    "file_image"=>null,
                    "image_postion"=>"left",
                    "content"=> "<h2>Introduction</h2><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer id egestas mauris, a aliquet mi. Donec at porttitor metus, a pretium ipsum. Proin odio justo, dictum at varius et, facilisis vitae eros. Nullam eu felis sed purus dignissim tristique. Quisque vestibulum leo in volutpat rhoncus. Fusce sit amet ante et ipsum aliquet maximus. Cras faucibus mauris vitae est tempus varius. Ut ut semper dolor.</p><p><br></p><blockquote>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer id egestas mauris, a aliquet mi. Donec at porttitor metus, a pretium ipsum. Proin odio justo, dictum at varius et, facilisis vitae eros. Nullam eu felis sed purus dignissim tristique. Quisque vestibulum leo in volutpat rhoncus. Fusce sit amet ante et ipsum aliquet maximus. Cras faucibus mauris vitae est tempus varius. Ut ut semper dolor.</blockquote><p><br></p><ol><li>Lorem ipsum dolor</li><li>Proin odio justo</li><li>Quisque vestibulum</li></ol>"
                ],
                [
                    "file_image"=>null,
                    "image_postion"=>"left",
                    "content"=> "<h2>Conclusion</h2><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer id egestas mauris, a aliquet mi. Donec at porttitor metus, a pretium ipsum. Proin odio justo, dictum at varius et, <em>facilisis vitae eros</em>. Nullam eu felis sed purus dignissim tristique. Quisque vestibulum leo in <strong>volutpat</strong> rhoncus. Fusce sit amet ante et ipsum aliquet maximus. Cras faucibus mauris vitae est tempus varius. Ut ut semper dolor.</p>"
                ]
            ]
        ]);
        $article->save();

        # -- Seed articles page

        $articlesPage = new Page();
        $articlesPage->setAuthorId(1);
        $articlesPage->setSlug("articles");
        $articlesPage->setTitle("Articles");
        $articlesPage->setTemplate("article_list");
        $articlesPage->setContent([
            "selectedArticles" => [
                $article->getId()
            ]
        ]);
        $articlesPage->save();

        # -- Seed menu

        $menuHome = new Menu();
        $menuHome->setTitle("Accueil");
        $menuHome->setPageId($homePage->getId());
        $menuHome->setPosition(0);
        $menuHome->setIsHeader(1);
        $menuHome->setVisible(1);
        $menuHome->save();

        $menuArticles = new Menu();
        $menuArticles->setTitle("Articles");
        $menuArticles->setPageId($articlesPage->getId());
        $menuArticles->setPosition(1);
        $menuArticles->setIsHeader(1);
        $menuArticles->setVisible(1);
        $menuArticles->save();      
    }
    
}