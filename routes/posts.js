/* ===== dependencies ===== */
/* express - web framework for node.js */
/* router - express router for handling routes */
const express = require('express');
const router = express.Router();

/* ===== data storage ===== */
/* temporary in-memory array to store blog posts */
/* each post is an object with id, author, title, content, and timestamps */
let posts = [];

const sillyname = require('sillyname');

/* ===== helper functions ===== */
/* generates a unique id for new posts */
/* uses timestamp and random number to ensure uniqueness */
const generateId = () => {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

/* ===== route handlers ===== */
/* get all posts */
/* renders the index view with all posts */
/* if no posts exist, shows an empty state */
router.get('/', (req, res) => {
    // sort posts by creation timestamp in descending order (newest first)
    const sortedPosts = [...posts].sort((a, b) => b.createdAtTimestamp - a.createdAtTimestamp);
    res.render('index', { posts: sortedPosts });
});

/* create new post */
/* handles post creation form submission */
/* generates id and timestamps for the new post */
/* redirects to home page after creation */
router.post('/', (req, res) => {
    const { author, title, content, category } = req.body;
    console.log('form data:', req.body);
    
    const newPost = {
        id: generateId(),
        author,
        title,
        content,
        category,
        createdAt: new Date().toLocaleString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        }),
        createdAtTimestamp: Date.now()
    };
    
    posts.push(newPost);
    res.redirect('/');
});

/* get edit form */
/* renders the edit form for a specific post */
/* finds the post by id and passes it to the view */
/* if post not found, redirects to home page */
router.get('/:id/edit', (req, res) => {
    const post = posts.find(p => p.id === req.params.id);
    if (!post) {
        return res.redirect('/');
    }
    res.render('edit', { post });
});

/* update post */
/* handles post update form submission */
/* finds the post by id and updates its content */
/* adds an updated timestamp */
/* redirects to home page after update */
router.put('/:id', (req, res) => {
    const { author, title, content } = req.body;
    const postIndex = posts.findIndex(p => p.id === req.params.id);
    
    if (postIndex !== -1) {
        posts[postIndex] = {
            ...posts[postIndex],
            author,
            title,
            content,
            updatedAt: new Date().toLocaleString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            })
        };
    }
    
    res.redirect('/');
});

/* delete post */
/* handles post deletion request */
/* finds the post by id and removes it from the array */
/* logs the updated posts array for debugging */
/* redirects to home page after deletion */
router.delete('/:id', (req, res) => {
    const postIndex = posts.findIndex(p => p.id === req.params.id);
    console.log('delete request for post:', req.params.id);
    
    if (postIndex !== -1) {
        posts.splice(postIndex, 1);
        console.log('updated posts array:', posts);
    }
    
    res.redirect('/');
});

/* random name generator route */
router.get('/generate-name', (req, res) => {
    const randomName = sillyname();
    res.json({ name: randomName });
});

/* ===== module exports ===== */
/* export the router for use in the main application */
module.exports = router;
