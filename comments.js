//Create web server
const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const { Comment } = require('../../models');
const { asyncHandler } = require('../../utils');

// GET /api/comments/:id
router.get('/:id(\\d+)', asyncHandler(async (req, res) => {
    const comment = await Comment.findByPk(req.params.id);
    if (comment) {
        res.json({ comment });
    } else {
        res.status(404).json({ message: 'Comment not found.' });
    }
}));

// POST /api/comments
router.post('/', asyncHandler(async (req, res) => {
    const comment = await Comment.create(req.body);
    res.status(201).json({ comment });
}));

// PUT /api/comments/:id
router.put('/:id(\\d+)', asyncHandler(async (req, res) => {
    const comment = await Comment.findByPk(req.params.id);
    if (comment) {
        await comment.update(req.body);
        res.json({ comment });
    } else {
        res.status(404).json({ message: 'Comment not found.' });
    }
}));

// DELETE /api