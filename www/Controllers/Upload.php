<?php

namespace App\Controllers;

use App\Core\Controller;
use App\Errors\BadRequest;
use App\Errors\NotFoundError;
use App\Models\File;
use App\Policies\UploadPolicy;
use App\Services\UploadService;
use App\Utils\Collection;

class Upload extends Controller
{

    function store(){
     
        if(!isset($_SERVER["CONTENT_TYPE"]) || strpos($_SERVER["CONTENT_TYPE"], "multipart/form-data") === false){
            throw new BadRequest("The request must be multipart/form-data");
        }

        $authUser = request()->auth()->user();
        UploadPolicy::store($authUser);
        $results = [];
        foreach($_FILES as $file){
            $results[] = UploadService::saveFile($file, $authUser);
        }
        return new Collection($results);
        
        
    }

    function delete($params){
        $file = File::fetch($params["id"]);
        if(!$file) throw new NotFoundError();

        $authUser = request()->auth()->user();
        UploadPolicy::delete($file, $authUser);
        
        UploadService::deleteFile($file);
    }

}