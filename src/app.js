const express = require('express');
const morgan = require('morgan');
const { engine } = require('express-handlebars');
const path = require('path');
const app = express();
const route = require('./routes/routes');
const db = require('./config/db/db');
const cors = require("cors");
const cookieSession = require("cookie-session");
require('dotenv').config();


if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

console.log(process.env.PORT);

var corsOptions = {
  origin: "http://localhost:3001"
};

app.use(cors(corsOptions));

app.use(
  cookieSession({
    name: "Hachitech-session",
    secret: "COOKIE_SECR", // should use as secret environment variable
    httpOnly: true
  })
);

// Connect to DB
db.connect();

// path static file
app.use(express.static(path.join(__dirname, 'public')));

app.use(express.urlencoded());
app.use(express.json());

// view log request
app.use(morgan('combined'));

//template engine
app.engine('hbs', engine({
  extname: '.hbs'
}));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources', 'views'));

// Routes init
route(app);

app.listen(process.env.PORT, () => {
  console.log(`App listening on port ${process.env.PORT}`);
});