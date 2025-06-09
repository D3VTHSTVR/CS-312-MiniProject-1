/* ===== dependencies ===== */
/* express - web framework for node.js */
/* method-override - allows us to use put/delete methods in forms */
/* ejs - templating engine for views */
/* path - node.js module for handling file paths */
const express = require('express');
const methodOverride = require('method-override');
const ejs = require('ejs');
const path = require('path');

/* ===== app setup ===== */
/* create express application instance */
const app = express();

/* ===== middleware configuration ===== */
/* parse url-encoded bodies (as sent by html forms) */
app.use(express.urlencoded({ extended: true }));

/* parse json bodies (as sent by api clients) */
app.use(express.json());

/* serve static files from the public directory */
/* this includes css, client-side js, and images */
app.use(express.static('public'));

/* set up method override middleware */
/* this allows us to use put/delete methods in forms */
/* the _method parameter in the url will be used to determine the actual method */
app.use(methodOverride('_method'));

/* ===== view engine setup ===== */
/* set the view engine to ejs */
/* this tells express to use ejs for rendering views */
app.set('view engine', 'ejs');

/* set the views directory */
/* this tells express where to find the view templates */
app.set('views', path.join(__dirname, 'views'));

/* ===== route imports ===== */
/* import the posts router */
const postsRouter = require('../../routes/posts');

/* ===== route configuration ===== */
/* use the posts router for all routes starting with /posts */
/* this includes routes for creating, reading, updating, and deleting posts */
app.use('/posts', postsRouter);

/* ===== root route ===== */
/* handle requests to the root url */
/* this is the main page of the application */
app.get('/', (req, res) => {
    res.redirect('/posts');
});

/* ===== server startup ===== */
/* start the server on port 3000 */
/* log a message to confirm the server is running */
const port = 3000;
app.listen(port, () => {
    console.log(`server is running on http://localhost:${port}`);
}); 