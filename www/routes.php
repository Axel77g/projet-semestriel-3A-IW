<?php

use App\Core\Route;

Route::get("/", [
    "controller" => "Main",
    "action" => "index",
]);

// Comments Routes ---------------------------------------------------------------

Route::get("/api/comments", [
    "controller" => "Comments",
    "action" => "index",
    /* auth handle by controller */
]);

Route::get("/api/comments/{id}", [
    "controller" => "Comments",
    "action" => "show",
    "middlewares" => [
        "Auth",
        "Permission:admin"
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
        "Permission:admin"
    ]
]);

Route::delete("/api/comments/{id}", [
    "controller" => "Comments",
    "action" => "delete",
    "middlewares" => [
        "Auth",
    ]
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

Route::get("/api/users", [
    "controller" => "Users",
    "action" => "index",
    "middlewares" => [
        "Auth",
        "Permission:admin"
    ]
]);

Route::get("/api/users/{id}", [
    "controller" => "Users",
    "action" => "show",
    "middlewares" => [
        "Auth",
        "Permission:admin"
    ]
]);

Route::put("/api/users/{id}", [
    "controller" => "Users",
    "action" => "update",
    "middlewares" => [
        "Auth"
    ]
]);

Route::delete('/api/users/{id}', [
    "controller" => "Users",
    "action" => "destroy",
    "middlewares" => [
        "Auth"
    ]
]);


// Menus Routes ---------------------------------------------------------------
Route::get('/api/menus', [
    "controller" => "Menus",
    "action" => "index",
    /* auth handle by controller */
]);

Route::get('/api/menu/{id}', [
    "controller" => "Menus",
    "action" => "show",
    "middlewares" => [
         "Auth",
         "Permission:admin"
    ]
]);

Route::post('/api/menu', [
    "controller" => "Menus",
    "action" => "create",
    "middlewares" => [
        "Auth",
        "Permission:admin"
    ]
]);

Route::put('/api/menu/{id}', [
    "controller" => "Menus",
    "action" => "update",
    "middlewares" => [
        "Auth",
        "Permission:admin"
    ]
]);

Route::delete('/api/menu/{id}', [
    "controller" => "Menus",
    "action" => "delete",
    "middlewares" => [
        "Auth",
        "Permission:admin"
    ]
]);

// Pages Routes ---------------------------------------------------------------
Route::get('/api/pages', [
    "controller" => "Pages",
    "action" => "index",
]);

Route::post('/api/pages/resolve', [
    "controller" => "Pages",
    "action" => "resolvePath"
]);

Route::get('/api/pages/latest', [
    "controller" => "Pages",
    "action" => "latestArticle",
]);

Route::get('/api/pages/popular', [
    "controller" => "Pages",
    "action" => "popularArticle",
]);

Route::get('/api/pages/random', [
    "controller" => "Pages",
    "action" => "randomArticle",
]);

Route::get('/api/pages/home', [
    "controller" => "Pages",
    "action" => "home",
]);

Route::get('/api/pages/{slug}', [
    "controller" => "Pages",
    "action" => "show",
    "middlewares" => [
        "Auth",
        "Permission:admin"
    ]
]);

Route::post('/api/pages', [
    "controller" => "Pages",
    "action" => "create",
    "middlewares" => [
        "Auth",
        "Permission:admin"
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
        "Permission:admin"
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
        "Auth",
        "Permission:admin"
    ]
]);


// Installer Routes ---------------------------------------------------------------


Route::post('/api/install', [
    "controller" => "Installer",
    "action" => "create",
]);

// Analytics Routes ---------------------------------------------------------------

Route::get('/api/analytics/top-article', [
    "controller" => "Analytics",
    "action" => "top_articles",
    "middlewares" => [
        "Auth",
        "Permission:admin"
    ]
]);

Route::get('/api/analytics/stat-logs', [
    "controller" => "Analytics",
    "action" => "stat_logs",
    "middlewares" => [
        "Auth",
        "Permission:admin"
    ]
]);

Route::get('/api/analytics/stat-comments', [
    "controller" => "Analytics",
    "action" => "stat_comments",
    "middlewares" => [
        "Auth",
        "Permission:admin"
    ]
]);

// History Routes ---------------------------------------------------------------
Route::post('/api/history/', [
    "controller" => "Histories",
    "action" => "retrieveAll",
    "middlewares" => [
        "Auth",
        "Permission:admin"
    ]
]);

Route::put('/api/history/back/{id}', [
    "controller" => "Histories",
    "action" => "back",
    "middlewares" => [
        "Auth",
        "Permission:admin"
    ]
]);
