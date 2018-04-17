const express = require('express');
const router = express.Router();

const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

const {BlogPosts} = require('./models');


//Add some blog posts to start
BlogPosts.create('Chicken Raising', 'content', 'Fred');
BlogPosts.create('Pastured Pork', 'content', 'Barney');
BlogPosts.create('Collecting Eggs', 'content', 'BamBam');

//GET requests will return all current blog posts
router.get('/', (req, res) => {
    res.json(BlogPosts.get());
});

//POST requests will add a new item if required items are included
//and return a status code 201
//if not, log an error and return a 400 status code.
router.post('/', jsonParser, (req, res) => {
    const requiredFields = ['title', 'content', 'author'];

    for( let i = 0; i < requiredFields.length; i++)
    {
        const field = requiredFields[i];
        if(!(field in req.body))
        {
            const message = `Missing ${field} in request body.`;
            console.error(message);
            return res.status(400).send(message);
        }
    }

    const post = BlogPosts.create(req.body.title, req.body.content, req.body.author)
    res.status(201).json(post);
});


//DELETE request with an id in path will attempt to delete the blog post.
router.delete('/:id', (req, res) => {
    BlogPosts.delete(req.params.id);
    console.log(`Deleted blog post ${req.params.id}`);
    res.status(204).end();
});

router.put('/:id', jsonParser, (req, res) => {

});

module.exports = router;