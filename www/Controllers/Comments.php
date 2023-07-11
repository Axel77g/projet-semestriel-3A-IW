<?php

namespace App\Controllers;

use App\Core\Validator;
use App\Models\Comment;
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
        return $comment;
    }

    public function create()
    {
        $payload = request()->json();

        $validator = new Validator($payload, [
            'content' => 'required',
            'author_id' => 'required',
            'article_id' => 'required',
            'comment_id' => 'required',
        ]);

        $comment = new Comment();

        $comment->setContent($payload['content']);
        $comment->setAuthorId($payload['author_id']);
        $comment->setArticleId($payload['article_id']);

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

        $comment->destroy();

        return $comment;
    }
}
