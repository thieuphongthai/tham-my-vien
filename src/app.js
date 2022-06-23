const express = require('express');
const morgan = require('morgan');
const methodOverride = require('method-override');
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

// Cung cấp middleware trên Express để kích hoạt CORS
var corsOptions = {
  origin: "http://localhost:3001"
};

// Method Override
app.use(methodOverride('_method'));

// Kiểm tra trước khi đến lớp bảo mật
app.use(cors(corsOptions));

// Lưu trữ dữ liệu trên client mà không yêu cầu csdl ở server
app.use(
  cookieSession({
    name: "Hachitech-session",
    secret: `${process.env.SECURITY_KEY}`, // should use as secret environment variable
    httpOnly: true
  })
);

// Connect to DB
db.connect();

// path static file
app.use(express.static(path.join(__dirname, 'public')));

// Phân tích cú pháp yêu cầu của các loại nội dung
app.use(express.urlencoded());
app.use(express.json());

// view log request
app.use(morgan('combined'));

//template engine
app.engine('hbs', engine({
  extname: '.hbs',
  helpers: {
	sum: (a, b) => a + b,
	cutRole: (role) => {
		console.log(role)
		if (role !== 'Gốc') {
			return role;
		}
	}
}
}));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources', 'views'));

// Routes init
route(app);

app.listen(process.env.PORT, () => {
  console.log(`App listening on port ${process.env.PORT}`);
});