<?php

namespace App\Models;

use App\Core\Model;

class History extends Model
{
    protected int $model_id = 0;
    protected string $model = "";
    protected string $data = "";

    public function getModelId()
    {
        return $this->model_id;
    }

    public function setModelId($int)
    {
        $this->model_id = $int;
    }

    public function getModel()
    {
        return $this->model;
    }

    public function setModel($str)
    {
        $this->model = $str;
    }

    public function getData()
    {
        return json_decode($this->data, true);
    }

    public function setData(array $array)
    {
        $this->data = json_encode($array);
    }

}