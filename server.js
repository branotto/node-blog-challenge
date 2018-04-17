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


app.listen(process.env.PORT || 8080, () => {
    console.log(`Your app is listening on port ${process.env.PORT || 8080}`);
  });