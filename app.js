const express = require('express');
const app = express();
const nunjucks = require('nunjucks');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const path = require('path');


app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extend: true}));
app.use(bodyParser.json());

// point nunjucks to the directory containing templates and turn off caching; configure returns an Environment
// instance, which we'll want to use to add Markdown support later.
var env = nunjucks.configure('views', {noCache: true});
// have res.render work with html files
app.set('view engine', 'html');
// when res.render works with html files, have it use nunjucks to do so
app.engine('html', nunjucks.render);

app.use(express.static(path.join(__dirname, '/public')));

// app.get('/public/stylesheets/style.css')

app.listen(3000, () => {console.log('Listening on 3000')});