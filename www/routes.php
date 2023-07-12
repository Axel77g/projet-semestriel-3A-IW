<?php

use App\Core\Route;

Route::get('/api/articles', [
    "controller" => "Articles",
    "action" => "index",
]);


Route::get("/", [
    "controller" => "Main",
    "action" => "index",
]);

Route::get("/contact", [
    "controller" => "Main",
    "action" => "contact"
]);

// Route::get("/admin", [
//     "controller" => "Users",
//     "action" => "index",
//     "middlewares" => [
//         "Auth",
//         "Permission:admin"
//     ]
// ]);

Route::get("/api/isAdmin", [
    "controller" => "Users",
    "action" => "isAdmin",
    "middlewares" => [
        "Auth",
        "Permission:admin"
    ]
]);

// Comments Routes ---------------------------------------------------------------
Route::get("/api/comments", [
    "controller" => "Comments",
    "action" => "index",
    "middlewares" => [
        "Auth",
    ]
]);

Route::get("/api/comments/{id}", [
    "controller" => "Comments",
    "action" => "show",
    "middlewares" => [
        "Auth",
    ]
]);

Route::post("/api/comments", [
    "controller" => "Comments",
    "action" => "create",
    "middlewares" => [
        "Auth",
    ]
]);

Route::put("/api/comments/{id}", [
    "controller" => "Comments",
    "action" => "update",
    "middlewares" => [
        "Auth",
        // "Permission:admin"
    ]
]);

Route::delete("/api/comments/{id}", [
    "controller" => "Comments",
    "action" => "delete"
]);

// Auth Routes ---------------------------------------------------------------
Route::post("/api/login", [
    "controller" => "Auth",
    "action" => "login"
]);

Route::post("/api/register", [
    "controller" => "Auth",
    "action" => "register"
]);

Route::get("/verify", [
    "controller" => "Auth",
    "action" => "verify"
]);

Route::post("/api/forgot-password", [
    "controller" => "Auth",
    "action" => "forgotPassword"
]);

Route::post("/api/update-password", [
    "controller" => "Auth",
    "action" => "updatePassword",
]);

// Users Routes ---------------------------------------------------------------
Route::get("/api/users/me", [
    "controller" => "Users",
    "action" => "me",
    "middlewares" => [
        "Auth"
    ]
]);

Route::get("/api/users/{id}", [
    "controller" => "Users",
    "action" => "show",
    "middlewares" => [
        "Auth"
    ]
]);

Route::put("/users/{id}", [
    "controller" => "Users",
    "action" => "update",
    "middlewares" => [
        "Auth"
    ]
]);


Route::post("/api/users", [
    "controller" => "Users",
    "action" => "register"
]);

Route::delete('/api/users/{id}', [
    "controller" => "Users",
    "action" => "destroy",
    "middlewares" => [
        "Auth"
    ]
]);


// Roles Routes ---------------------------------------------------------------
Route::post('/api/roles/create', [
    "controller" => "Roles",
    "action" => "create",
    "middlewares" => [
        "Auth"
    ]
]);

Route::put('/api/roles/{id}', [
    "controller" => "Roles",
    "action" => "update",
    "middlewares" => [
        "Auth"
    ]
]);

Route::delete('/api/roles/{id}', [
    "controller" => "Roles",
    "action" => "destroy",
    "middlewares" => [
        "Auth"
    ]
]);

// Articles Routes ----------------------------------------------
Route::get('/api/article/{slug}', [
    "controller" => "Articles",
    "action" => "show",
]);

Route::post('/api/articles', [
    "controller" => "Articles",
    "action" => "create",
    "middlewares" => [
        "Auth"
    ]
]);

Route::put('/api/article/{id}', [
    "controller" => "Articles",
    "action" => "update",
    "middlewares" => [
        "Auth"
    ]
]);

Route::delete('/api/article/{id}', [
    "controller" => "Articles",
    "action" => "delete",
    "middlewares" => [
        "Auth",
        "Permission:admin"
    ]
]);

// Article Comment Routes ---------------------------------------------------------------
Route::get('/api/article-comments', [
    "controller" => "ArticleComments",
    "action" => "index",
]);

Route::get('/api/article-comments/{id}', [
    "controller" => "ArticleComments",
    "action" => "show",
]);

Route::post('/api/article-comments', [
    "controller" => "ArticleComments",
    "action" => "create",
    "middlewares" => [
        "Auth"
    ]
]);

Route::put('/api/article-comments/{id}', [
    "controller" => "ArticleComments",
    "action" => "update",
    "middlewares" => [
        "Auth"
    ]
]);

Route::delete('/api/article-comments/{id}', [
    "controller" => "ArticleComments",
    "action" => "delete",
    "middlewares" => [
        "Auth"
    ]
]);

// Menus Routes ---------------------------------------------------------------
Route::get('/api/menus', [
    "controller" => "Menus",
    "action" => "index",
    // "middlewares" => [
    //     "Auth",
    // ]
]);



Route::get('/api/menu/{id}', [
    "controller" => "Menus",
    "action" => "show",
    // "middlewares" => [
    //     "Auth",
    //     "Permission:admin"
    // ]
]);

Route::post('/api/menu', [
    "controller" => "Menus",
    "action" => "create",
    "middlewares" => [
        "Auth"
    ]
]);

Route::put('/api/menu/{id}', [
    "controller" => "Menus",
    "action" => "update",
    "middlewares" => [
        "Auth",
    ]
]);

Route::delete('/api/menu/{id}', [
    "controller" => "Menus",
    "action" => "delete",
    "middlewares" => [
        "Auth"
    ]
]);

// Pages Routes ---------------------------------------------------------------
Route::get('/api/pages', [
    "controller" => "Pages",
    "action" => "index",
    "middlewares" => [
        "Auth",    ]
]);

Route::post('/api/pages', [
    "controller" => "Pages",
    "action" => "create",
    "middlewares" => [
        "Auth",
        "Permission:admin"
    ]
]);

Route::get('/api/pages/{slug}', [
    "controller" => "Pages",
    "action" => "show",
    "middlewares" => [
        "Auth",
    ]
]);


Route::put('/api/pages/{slug}', [
    "controller" => "Pages",
    "action" => "update",
    "middlewares" => [
        "Auth",
        "Permission:admin"
    ]
]);

Route::delete('/api/pages/{id}', [
    "controller" => "Pages",
    "action" => "delete",
    "middlewares" => [
        "Auth",
    ]
]);

// Sitemap Routes ---------------------------------------------------------------

Route::get('/sitemap.xml', [
    "controller" => "Sitemap",
    "action" => "index",
]);


// Upload Routes ---------------------------------------------------------------

Route::post('/api/upload', [
    "controller" => "Upload",
    "action" => "store",
    "middlewares" => [
        "Auth",
        "Permission:admin"
    ] 
]);

Route::delete('/api/upload/{id}', [
    "controller" => "Upload",
    "action" => "delete",
    "middlewares" => [
        "Auth"
    ]
]);

// Template Routes ---------------------------------------------------------------

Route::post('/api/pages/resolve', [
    "controller" => "Pages",
    "action" => "resolvePath"
]);

// Installer Routes ---------------------------------------------------------------


Route::post('/api/install', [
    "controller" => "Installer",
    "action" => "create",
]);
