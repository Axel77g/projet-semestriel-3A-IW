<?php

namespace App\Controllers;

use App\Core\Validator;
use App\Models\Comment;
use App\Core\Controller;
use App\Errors\NotFoundError;
use App\Errors\Unauthorized;
use App\Errors\ValidatorError;
use App\Policies\CommentPolicy;
use App\Services\CommentServices;

class Comments extends Controller
{

    public function index()
    {   
        $query = request()->getQuery();

        if($query->has('page_id')){
           
            $comments = Comment::findMany([
                'page_id'=> (int) $query->get('page_id'),
                'status'=> 'validated',
                'comment_id'=> null
            ]);
            
            $comments = $comments->map(function($child){
                return CommentServices::getCommentConversation($child);
            });

            return $comments;
        }else{
            $authUser = request()->auth()->user();
            if(!$authUser) throw new Unauthorized();
            CommentPolicy::index($authUser);
            $comments = Comment::all();
            return $comments;
        }

    }

    public function show($params)
    {
        $comment = Comment::fetch($params['id']);
        if (!$comment) throw new NotFoundError();

        $comment->author = $comment->getAuthor();
        $comment->comment = $comment->getComment();
        $comment->comments = $comment->getComments();

        return $comment;
    }

    public function create()
    {
        $payload = request()->json();

        $validator = new Validator();
        $validator->validate($payload, [
            'content' => 'required',
            'author_id' => 'required',
            'page_id' => 'required',
        ]);

        if ($validator->hasErrors()) {
            throw new ValidatorError($validator->getErrors());
        }

        $comment = new Comment();

        $comment->setContent($payload['content']);

        $comment->setAuthorId($payload['author_id']);
        $comment->setPageId($payload['page_id']);


        if (isset($payload['comment_id']))
            $comment->setCommentId($payload['comment_id']);

        $comment->save();

        return $comment;
    }

    public function update($params)
    {
        $payload = request()->json();

        $comment = Comment::fetch($params['id']);
        if (!$comment) throw new NotFoundError();

        $comment->set($payload);
        $comment->save();

        return $comment;
    }

    public function delete($params)
    {

        $comment = Comment::fetch($params['id']);
        if (!$comment) throw new NotFoundError();
        
        $answersCount = Comment::findMany([
            'comment_id' => $params['id']
        ])->count();


        if($answersCount > 0){
            $comment->setContent("Ce commentaire a été supprimé");

            $comment->save();
        }else{
            $comment->destroy();
        }

        return $comment;
    }
}
