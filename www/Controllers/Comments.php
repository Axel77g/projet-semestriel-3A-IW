<?php
namespace App\Controllers;

use App\Core\Controller;
use App\Errors\NotFoundError;
use App\Models\Comment;

class Comments extends Controller{

    public function index(){
        $comments = Comment::all();
        return $comments;
    }

    public function show($params){
        $comment = Comment::fetch($params['id']);
        if(!$comment) throw new NotFoundError();
        return $comment;
    }

    public function create(){
        $payload = request()->json();

        $comment = new Comment();
        $comment->setContent($payload['content']);
        $comment->save();

        return $comment;
    }

    public function update($params){
        $payload = request()->json();

        $comment = Comment::fetch($params['id']);
        if(!$comment) throw new NotFoundError();

        $comment->set($payload);
        $comment->save();

        return $comment;
    }

    public function delete($params){

        $comment = Comment::fetch($params['id']);

        if(!$comment) throw new NotFoundError();

        $comment->delete();

        echo json_encode(["message"=>"Comment deleted"]);
    }

}