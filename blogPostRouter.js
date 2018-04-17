const express = require('express');
const router = express.Router();

const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

const {BlogPosts} = require('./models');


//Add some blog posts to start
BlogPosts.create('Chicken Raising', 'content', 'Fred');
BlogPosts.create('Pastured Pork', 'content', 'Barney');
BlogPosts.create('Collecting Eggs', 'content', 'BamBam');

//when root is called using GET, return all
//current blog posts
router.get('/', (req, res) => {
    res.json(BlogPosts.get());
});



router.post('/', jsonParser, (req, res) => {


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