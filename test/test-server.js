const chai = require('chai');
const chaiHttp = require('chai-http');

const {app, runServer, closeServer} = require('../server');


//allow expect style syntax
const expect = chai.expect;


//allow HTTP requests in our tests
chai.use(chaiHttp);

describe('Blog Posts', function()
{

    //activate the server before running tests
    before(function()
    {
        return runServer();
    });

    //close the server after testing completes
    after(function()
    {
        return closeServer();
    });


    // test strategy
    // 1. make request to '/blog-posts'
    // 2. inspect response object for correct code and keys
    it('should list posts on GET', function()
    {
        //return a Promise object
        return chai.request(app)
        .get('/blog-posts')
        .then(function(res)
        {
            expect(res).to.have.status(200);
            expect(res).to.be.json;
            expect(res.body).to.be.a('array');

            //create 3 posts on app load
            expect(res.body.length).to.be.at.least(1);

            //each item should be an object w/ key/value pairs
            //'id', 'title', 'author', 'content'
            const expectedKeys = ['id', 'title', 'author', 'content', 'publishDate'];
            res.body.forEach(function(item)
            {
                expect(item).to.be.a('object');
                expect(item).to.include.keys(expectedKeys);
            });
        });
    });

    // test strategy
    // 1. make a POST request with a new blog post
    // 2. inspect rsponse object for status code and object w/ 'id'
    it('should add a blog-post on POST', function()
    {
        const newPost = 
            {
                title : 'Training for excellence',
                author : 'Snape',
                content : 'great content here'
            };
        return chai.request(app)
        .post('/blog-posts')
        .send(newPost)
        .then(function(res)
        {
            expect(res).to.have.status(201);
            expect(res).to.be.json;
            expect(res.body).to.be.a('object');
            expect(res.body).to.include.keys('id', 'author', 'title', 'content', 'publishDate');
            expect(res.body.id).to.not.equal(null);
            expect(res.body.title).to.equal(newPost.title);
            expect(res.body.author).to.equal(newPost.author);
            expect(res.body.content).to.equal(newPost.content);
        });
    });

    // test strategy
    // 1. initialize updated blog post
    // 2. request a blog post with GET
    // 3. add the 'id' to our updated blog post
    // 4. PUT request
    // 5. inspect response object
    it('should update blog posts on PUT', function()
    {
        const updatedBlog =
        {
            title : 'even better writing',
            author : 'Batman',
            content : 'mind blowing content'
        };

        return chai.request(app)
        .get('/blog-posts')
        .then(function(res)
        {
            updatedBlog.id = res.body[0].id;
            return chai.request(app)
            .put(`/blog-posts/${updatedBlog.id}`)
            .send(updatedBlog);
        })
        .then(function(res)
        {
            expect(res).to.have.status(204);
        });
    });

    // test strategy
    // 1. Get blog post ID
    // 2. DELETE the post and ensure correct response code
    it('should delete blog post on DELETE', function()
    {
        return chai.request(app)
        .get('/blog-posts')
        .then(function(res)
        {
            return chai.request(app)
            .delete(`/blog-posts/${res.body[0].id}`);
        })
        .then(function(res)
        {
            expect(res).to.have.status(204);
        });
    });

});