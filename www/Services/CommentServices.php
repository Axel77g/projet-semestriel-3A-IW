<?php

namespace App\Services;

class CommentServices{
    static function getCommentConversation($comment){
        $comment->author = $comment->getAuthor();
        $comment->answers = $comment->getComments();
        $comment->answers->map(function($child){
            return CommentServices::getCommentConversation($child);
        });
        return $comment;
    }
}