<?php

namespace App\Services;

use App\Models\File;
use App\Models\User;

class UploadService{

    static function saveFile($file,User $user){
        $fileModel = new File();

        $fileModel->setName($file["name"]);
        $fileModel->setExtension(pathinfo($file["name"], PATHINFO_EXTENSION));
        $fileModel->setMime($file["type"]);
        $fileModel->setSize($file["size"]);
    
        if(!file_exists("uploads")){
            mkdir("uploads");
        }
        move_uploaded_file($file["tmp_name"], $fileModel->getPath());

        $fileModel->setUserId($user->id);

        $fileModel->save();

        return $fileModel;
    }

    static function deleteFile(File $file){
        if(file_exists($file->getPath())){
            unlink($file->getPath());
        }

        $file->destroy();
    }

}