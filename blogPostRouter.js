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


//DELETE request with an id in path 
//will attempt to delete the blog post.
router.delete('/:id', (req, res) => {
    BlogPosts.delete(req.params.id);
    console.log(`Deleted blog post ${req.params.id}`);
    res.status(204).end();
});


//PUT requests with an updated item will
//verify required fields are present and 
//item id in path and id in updated object match
//any errors or omissions, log error and respond with 400 code
//otherwise update the blog posts
router.put('/:id', jsonParser, (req, res) => {
    const requiredFields = ['title', 'content', 'author', 'id'];

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

    if(req.params.id !== req.body.id)
    {
        const message = 
        `Request path id (${req.params.id} and request body id (${req.body.id} must match`;

        console.error(message);
        return res.status(400).send(message);
    }

    console.log(`Updating blog post ${req.params.if}`);
    const updatedPost = BlogPosts.update({
        id : req.params.id,
        title : req.body.title,
        content : req.body.content,
        author : req.body.author
    });

    res.status(204).end();

});

module.exports = router;