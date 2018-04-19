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


    //test strategy
    //1. make request to '/blog-posts'
    //2. inspect response object for correct code and keys
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



});