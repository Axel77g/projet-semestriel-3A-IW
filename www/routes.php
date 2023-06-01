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
    "action" => "list"
]);

Route::get("/comments/{id}",[
    "controller" => "Comments",
    "action" => "getById"
]);

Route::post("/comments",[
    "controller" => "Comments",
    "action" => "create"
]);

Route::put("/comments",[
    "controller" => "Comments",
    "action" => "update"
]);

Route::delete("/comments",[
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

