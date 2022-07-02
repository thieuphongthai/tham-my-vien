const express = require("express");
const morgan = require("morgan");
const methodOverride = require("method-override");
const { engine } = require("express-handlebars");
const path = require("path");
const app = express();
const route = require("./routes/routes");
const db = require("./config/db/db");
const cors = require("cors");
const cookieSession = require("cookie-session");
const bcrypt = require('bcryptjs');

require("dotenv").config();

if (process.env.NODE_ENV !== "production") {
	require("dotenv").config();
}

// Cung cấp middleware trên Express để kích hoạt CORS
var corsOptions = {
	origin: "http://localhost:3001",
};

// Method Override
app.use(methodOverride("_method"));

// Kiểm tra trước khi đến lớp bảo mật
app.use(cors(corsOptions));

// Lưu trữ dữ liệu trên client mà không yêu cầu csdl ở server
app.use(
	cookieSession({
		name: "Hachitech-session",
		secret: `${process.env.SECURITY_KEY}`,
		httpOnly: true,
		secure: true,
	})
);

// Kết nối tới cơ sở dữ liệu
db.connect();

// Cấu hình đường dẫn tệp tin tĩnh
app.use(express.static(path.join(__dirname, "public")));

// Phân tích cú pháp yêu cầu của các loại nội dung
app.use(express.urlencoded());
app.use(express.json());

// Xem những yêu cầu được ghi chép lại
app.use(morgan("combined"));

// Mẫu thiết kế giao diện
app.engine(
	"hbs",
	engine({
		extname: ".hbs",
		helpers: {
			sum: (a, b) => a + b,
			cutString: (str, num) => {
				var newStr = str.toString();
				return newStr.length > num ?  "..." + newStr.slice(num, newStr.length) : newStr;
			},
			cutPassword: (str, num) => {
				if (str !== undefined) {
					return str.length > num ?  str.slice(0, num) + '...' : str;
				}

			}
		},
	})
);

// Cấu hình đuôi tệp tin
app.set("view engine", "hbs");
// Cấu hình đường dẫn đến tệp tin chứa giao diện người dùng
app.set("views", path.join(__dirname, "resources", "views"));

app.use(function (req, res, next) {
	res.header(
		"Access-Control-Allow-Headers",
		"x-access-token, Origin, Content-Type, Accept"
	);
	next();
});

// Khởi tạo các tuyến đường
route(app);

app.listen(process.env.PORT, () => {
	console.log(`Ứng dụng đang chạy trên port ${process.env.PORT}`);
});
