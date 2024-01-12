//create web server
const express = require('express');
const router = express.Router();
//load mongoose
const mongoose = require('mongoose');
//load models
const Comment = require('../../models/Comment');
const User = require('../../models/User');
const Post = require('../../models/Post');
//load passport
const passport = require('passport');

// @route GET api/comments/test
// @desc Tests comments route
// @access Public
router.get('/test', (req, res) => res.json({ msg: 'Comments Works' }));

// @route POST api/comments
// @desc Create comment
// @access Private
router.post('/', passport.authenticate('jwt', { session: false }), (req, res) => {
    const newComment = new Comment({
        text: req.body.text,
        user: req.user.id,
        post: req.body.post
    });
    newComment.save().then(comment => {
        res.json(comment);
    }).catch(err => {
        res.status(404).json({ commentnotfound: 'No comment found' });
    });
});

// @route GET api/comments
// @desc Get comments
// @access