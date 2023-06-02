<?php

use App\Core\Route;

Route::get("/",[
    "controller" => "Main",
    "action" => "index"
]);

Route::get("/contact",[
    "controller" => "Main",
    "action" => "contact"
]);


Route::get("/admin/login",[
    "controller" => "Admin",
    "action" => "login"
]);

Route::get("/admin",[
    "controller" => "Admin",
    "action" => "index",
    "middlewares" => [
        "Auth"
    ]
]);

Route::get("/comments",[
    "controller" => "Comments",
    "action" => "index"
]);

Route::get("/comments/{id}",[
    "controller" => "Comments",
    "action" => "show"
]);

Route::post("/comments",[
    "controller" => "Comments",
    "action" => "create"
]);

Route::put("/comments/{id}",[
    "controller" => "Comments",
    "action" => "update"
]);

Route::delete("/comments/{id}",[
    "controller" => "Comments",
    "action" => "delete"
]);

Route::get("/login",[
    "controller" => "Auth",
    "action" => "login"
]);

Route::get("/register",[
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

Route::get("/users/{id}",[
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

Route::delete('/users/{id}',[
    "controller" => "Users",
    "action" => "delete",
    "middlewares" => [
        "Auth"
    ]
]);


// Roles Routes
Route::post('/roles/create', [
    "controller" => "Roles",
    "action" => "create",
    "middlewares" => [
        "Auth"
    ]
]);

Route::put('/roles/{id}', [
    "controller" => "Roles",
    "action" => "update",
    "middlewares" => [
        "Auth"
    ]
]);

Route::delete('/roles/{id}', [
    "controller" => "Roles",
    "action" => "destroy",
    "middlewares" => [
        "Auth"
    ]
]);

// Articles Routes ----------------------------------------------
Route::get('/articles', [
    "controller" => "Articles",
    "action" => "index",
]);

Route::get('/articles/{id}', [
    "controller" => "Articles",
    "action" => "show",
]);

Route::post('/articles', [
    "controller" => "Articles",
    "action" => "create",
    "middlewares" => [
        "Auth"
    ]
]);

Route::put('/articles/{id}', [
    "controller" => "Articles",
    "action" => "update",
    "middlewares" => [
        "Auth"
    ]
]);

Route::delete('/articles/{id}', [
    "controller" => "Articles",
    "action" => "delete",
    "middlewares" => [
        "Auth"
    ]
]);

// Article Comment Routes ---------------------------------------------------------------

Route::get('/article-comments', [
    "controller" => "ArticleComments",
    "action" => "index",
]);

Route::get('/article-comments/{id}', [
    "controller" => "ArticleComments",
    "action" => "show",
]);

Route::post('/article-comments', [
    "controller" => "ArticleComments",
    "action" => "create",
    "middlewares" => [
        "Auth"
    ]
]);

Route::put('/article-comments/{id}', [
    "controller" => "ArticleComments",
    "action" => "update",
    "middlewares" => [
        "Auth"
    ]
]);

Route::delete('/article-comments/{id}', [
    "controller" => "ArticleComments",
    "action" => "delete",
    "middlewares" => [
        "Auth"
    ]
]);
