<?php

namespace App\Controllers;

use App\Core\Validator;
use App\Models\Comment;
use App\Models\User;
use App\Core\Controller;
use App\Errors\NotFoundError;
use App\Errors\ValidatorError;

class Comments extends Controller
{

    public function index()
    {
        $comments = Comment::all();
        return $comments;
    }

    public function show($params)
    {
        $comment = Comment::fetch($params['id']);
        if (!$comment) throw new NotFoundError();

        // $comment->getAuthorData();
        // var_dump($comment);
        // $author = $comment->getAuthorId();
        

        return $comment;
    }

    public function create()
    {
        $payload = request()->json();

        $validator = new Validator();
        $validator->validate($payload, [
            'content' => 'required',
            'author_id' => 'required',
            'article_id' => 'required',
            'comment_id' => 'required',
        ]);

        if ($validator->hasErrors()) {
            throw new ValidatorError($validator->getErrors());
        }

        $comment = new Comment();

        $comment->setContent($payload['content']);
        $comment->setAuthor($payload['author_id']);
        $comment->setPageId($payload['article_id']);

        if (isset($payload['comment_id']))
            $comment->setComment($payload['comment_id']);

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

        $comment->destroy();

        return $comment;
    }
}
