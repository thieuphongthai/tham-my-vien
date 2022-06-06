const express = require('express');
const morgan = require('morgan');
const { engine } = require('express-handlebars');
const path = require('path');
const app = express();
const port = 3001;

// path static file
app.use(express.static(path.join(__dirname, 'public')));

// view log request
app.use(morgan('combined'));

//template engine
app.engine('hbs', engine({
  extname: '.hbs'
}));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources/views'));
console.log(path.join(__dirname, 'resources/views'));

app.get('/', (req, res) => {
  res.render('login', {layout: false});
});

app.get('/home', (req, res) => {
  res.render('home');
});

app.get('/news', (req, res) => {
    res.render('news');
  });

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});