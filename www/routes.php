<?php

use App\Core\Route;

Route::get('/api/articles', [
    "controller" => "Articles",
    "action" => "index",
]);


Route::get("/",[
    "controller" => "Main",
    "action" => "index",
]);

Route::get("/contact",[
    "controller" => "Main",
    "action" => "contact"
]);

Route::get("/admin",[
    "controller" => "Users",
    "action" => "index",
    "middlewares" => [
        "Auth",
        "Permission:admin"
    ]
]);

// Comments Routes ---------------------------------------------------------------
Route::get("/api/comments",[
    "controller" => "Comments",
    "action" => "index"
]);

Route::get("/api/comments/{id}",[
    "controller" => "Comments",
    "action" => "show"
]);

Route::post("/api/comments",[
    "controller" => "Comments",
    "action" => "create"
]);

Route::put("/api/comments/{id}",[
    "controller" => "Comments",
    "action" => "update"
]);

Route::delete("/api/comments/{id}",[
    "controller" => "Comments",
    "action" => "delete"
]);

Route::post("/api/login",[
    "controller" => "Auth",
    "action" => "login"
]);

Route::post("/api/register",[
    "controller" => "Auth",
    "action" => "register"
]);

Route::get("/verify",[
    "controller" => "Auth",
    "action" => "verify"
]);

Route::post("/api/forgot-password",[
    "controller" => "Auth", 
    "action" => "forgotPassword"
]);

Route::post("/api/update-password",[
    "controller" => "Auth",
    "action" => "updatePassword",
]);

Route::get("/users/me",[
    "controller" => "Users",
    "action" => "me",
    "middlewares" => [
        "Auth"
    ]
]);

Route::get("/api/users/{id}",[
    "controller" => "Users",
    "action" => "show",
    "middlewares" => [
        "Auth"
    ]
]);

Route::put("/users/{id}",[
    "controller" => "Users",
    "action" => "update",
    "middlewares" => [
        "Auth"
    ]
]);


Route::post("/api/users",[
    "controller" => "Users",
    "action" => "register"
]);

Route::delete('/api/users/{id}',[
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

Route::put('/api/articles/{id}', [
    "controller" => "Articles",
    "action" => "update",
    "middlewares" => [
        "Auth"
    ]
]);

Route::delete('/api/articles/{id}', [
    "controller" => "Articles",
    "action" => "delete",
    "middlewares" => [
        "Auth"
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

// Installer Routes ---------------------------------------------------------------

Route::post('/api/install', [
    "controller" => "Installer",
    "action" => "create",
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