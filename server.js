//node requires
const express = require('express');
const morgan = require('morgan');


//create the app
const app = express();


//require the Express Router
const blogPostRouter = require('./blogPostRouter');


//log the http layer
app.use(morgan('common'));


//use the Express Router
app.use('/blog-posts', blogPostRouter);


//create a server object
let server;


//start the server and return a Promise
function runServer()
{
  const port = process.env.PORT || 8080;

  return new Promise((resolve, reject) =>
  {
    server = app.listen(port, () =>
    {
      console.log(`Your app is listening on port ${port}`);
      resolve(server);
    }).on('error', err =>
      {
        reject(err)
      });
  });
}

//close the server and manually return a promise
function closeServer()
{
  return new Promise((resolve, reject) =>
  {
    console.log(`Closing server`);
    server.close(err =>
      {
        if (err) 
        {
          reject(err)
          return;
        }

        resolve();
      });
  });
}


// if server.js is called directly this block runs
// we also export the runServer command so other code 
//(for instance, test code) can start the server as needed.
if (require.main === module) {
  runServer().catch(err => console.error(err));
};

module.exports = {app, runServer, closeServer};