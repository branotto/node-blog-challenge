const express = require('express');
const router = express.Router();

const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

const {BlogPosts} = require('./models');


//Add some blog posts to start
BlogPosts.create('title', 'content', 'author', 'publishDate');
BlogPosts.create('title', 'content', 'author', 'publishDate');
BlogPosts.create('title', 'content', 'author', 'publishDate');

//when root is called using GET, return all
//current blog posts
router.get('/', (req, res) => {
    res.json(BlogPosts.get());
});