<?php
namespace App\Controllers;

use App\Core\Controller;
use App\Errors\NotFoundError;
use App\Models\Comment;

class Comments extends Controller{

    public function list(){
        $comments = Comment::all();
        $json = [];
        foreach($comments as $comment){
            $comment->getContent();
            $json[] = ["id" => $comment->id, "content" => $comment->getContent()];
        }

        echo json_encode($json);
    }

    public function getById($params){
        $comment = Comment::fetch($params['id']);
        if(!$comment) throw new NotFoundError();
        echo $comment->toJson();
    }

    public function create(){
        $payload = request()->json();

        $comment = new Comment();
        $comment->setContent($payload['content']);
        $comment->save();

        echo $comment->toJson();
    }

    public function update(){
        $payload = request()->json();

        $comment = Comment::fetch($payload['id']);
        if(!$comment) throw new NotFoundError();
        unset($payload['id']);

        $comment->set($payload);
        $comment->save();

        echo $comment->toJson();

    }

    public function delete(){

        $payload = request()->json();

        $comment = Comment::fetch($payload['id']);

        if(!$comment) throw new NotFoundError();

        $comment->delete();

        echo json_encode(["message"=>"Comment deleted"]);
    }

}