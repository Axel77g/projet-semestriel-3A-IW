<?php 

namespace App\Controllers;

use App\Core\Controller;
use App\Models\History;
use App\Errors\NotFoundError;

class Histories extends Controller{

    public function back($params)
    {
        $id = $params["id"];
    
        $history = History::fetch($id);
        if(!$history)
            throw new NotFoundError();
        $model = $history->getModel();
        $model = $model::fetch($history->getModelId());
        $model->set($history->getData());
        return $model;

    }


    public function retrieveAll($params){
        $payload = request()->json();
        $history = History::findMany([
            "model_id" => $payload["model_id"],
            "model" => $payload["model"]
        ]);

        if(!$history){
            throw new NotFoundError();
        }
        return $history;
    }

    }

    
