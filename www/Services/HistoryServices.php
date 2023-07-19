<?php
namespace App\Services;

use App\Core\Model;
use App\Models\History;

class HistoryServices{
    
        public static function remember(Model $model,array $data){
            $history = new History();
            $history->setModelId($model->getId());
            $history->setModel(get_class($model));
            $history->setData($data);
            $history->save();
        }

        public static function retreiveHistory(Model $model){
            $history = History::findMany([
                "model_id" => $model->getId(),
                "model" => get_class($model)
            ]);
            return $history;
        }
}