const express = require('express');
const router = express.Router();
const Blog = require('../models/blog');

router.route('/')
.get(async (req, res) => {
    try {
        const blogs = await Blog.find()
        res.json(blogs)
        console.log('Get success');
    } catch (err) {
        res.status(500).json({message: err.message})
    }
})
.post((async (req, res) => {
    const blog = new Blog({
        title: req.body.title,
        author: req.body.author,
        body: req.body.body,
        date: req.body.currentDate
    });
    try {
        const newBlog = await blog.save();
        res.status(201).json(newBlog);
        console.log('Post success');
    } catch (err) {
        console.log('Post failed');
        res.status(400).json({message: err.message});
    }
}));

router.route('/:id')
.get(getBlog, (req, res) => {
    // req params is the parameters present in the URL
    res.json(res.blog);
})
.patch(getBlog, async (req, res) => {
    if (req.body.title != null) {
        res.blog.title = req.body.title;
    }
    if (req.body.author != null) {
        res.blog.author = req.body.author;
    }
    if (req.body.body != null) {
        res.blog.body = req.body.body;
    }
    if (req.body.date != null) {
        res.blog.date = req.body.date;
    }
    try {
        const updatedBlog = await res.blog.save();
        res.status(201).json(updatedBlog);
    } catch (err) {
        res.status(400).json({message: err.message});
    }
})
.delete(getBlog, async (req, res) => {
    try {
        await res.blog.deleteOne();
        res.json({ message: 'Deleted blog' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}) 

async function getBlog(req, res, next) {
    let blog;
    try {
        blog = await Blog.findById(req.params.id);
        if (blog == null) {
            return res.status(404).json({ message: 'Blog not found' });
        }
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
    res.blog = blog;
    next();
};

// Whenever string parameter in this case 'id' is passed in, run the params function
// Middleware, runs code block before returning res to user
// Runs code in block until next()
// router.param('id', (req, res, next, id) => {
    // req is accessible by all
    // req.middleware = {middleware: `Ran for ${id}`};
    // next();
// });

module.exports = router;