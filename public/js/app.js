// import required modules
const express = require('express');
const path    = require('path');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const postRoutes  = require('./posts');

// create express app
const app = express();

// configure view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '../../views'));

// middleware
app.use(express.static(path.join(__dirname, '../')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

// routes
app.use('/posts', postRoutes);
app.get('/', (req, res) => res.redirect('/posts'));

// start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Listening on http://localhost:${PORT}`);
});
