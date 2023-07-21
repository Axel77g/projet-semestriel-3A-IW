<?php

namespace App\Services;

use App\Models\File;
use App\Models\User;

class UploadService{

    static function saveFile($file,User $user)
    {
        $fileModel = new File();

        $fileModel->setName($file["name"]);
        $fileModel->setExtension(pathinfo($file["name"], PATHINFO_EXTENSION));
        $fileModel->setMime($file["type"]);
        $fileModel->setSize($file["size"]);
    
        if(!file_exists(public_path("uploads"))){
            mkdir(public_path("uploads"));
        }
        move_uploaded_file($file["tmp_name"], public_path($fileModel->getPath()));

        $fileModel->setUserId($user->id);

        $fileModel->save();

        return $fileModel;
    }

    static function deleteFile(File $file){
        if(file_exists(public_path($file->getPath()))){
            unlink(public_path($file->getPath()));
        }

        $file->destroy();

        return true;
    }

}