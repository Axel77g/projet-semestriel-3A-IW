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

