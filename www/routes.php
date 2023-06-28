<?php

use App\Core\Route;

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

Route::get("/api/login",[
    "controller" => "Auth",
    "action" => "login"
]);

Route::get("/api/register",[
    "controller" => "Auth",
    "action" => "register"
]);

Route::get("/users/me",[
    "controller" => "Users",
    "action" => "me",
    "middlewares" => [
        "Auth"
    ]
]);

Route::post('/api/users/register',[
    "controller" => "Users",
    "action" => "register",
]);

Route::post('/api/users/login',[
    "controller" => "Users",
    "action" => "login",
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

Route::delete('/api/users/{id}',[
    "controller" => "Users",
    "action" => "destroy",
    "middlewares" => [
        "Auth"
    ]
]);


// Roles Routes
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
Route::get('/api/articles', [
    "controller" => "Articles",
    "action" => "index",
]);

Route::get('/api/articles/{id}', [
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
