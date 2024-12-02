const express = require("express");
const cors = require("cors");
const { errors } = require("celebrate");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const methodOverride = require("method-override")
const bodyparser = require("body-parser");
const config = require("./config/config");
const path = require("path");
const flash = require('connect-flash')
const app = express();

const PORT = config.PORT || 3000;
const HOST = config.HOST;

app.use(flash())
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(
  session({
    secret: "API",
    cookie: {
      maxAge: 60000,
    },
    resave: true,
    saveUninitialized : true
  })
);

// CORS + BODY_PARSE
const corsOptions = {
  origin: [], // Add Client URL
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));

// parse application/json
app.use(bodyparser.json({ limit: "50mb" }));
app.use(methodOverride("_method"))

// Serve the favicon
app.use('/favicon.ico', express.static(path.join(__dirname, 'public', 'favicon.ico')));

// Set Static Folder
app.use("/public", express.static(path.join(__dirname, "/public")));

// Set the template engine as ejs
app.set("view engine", "ejs");

// Set the views directory
app.set("views", path.join(__dirname, "views"));

// Routes
app.use("/", require("./routes/index.routes"));

// Handle celebrate error
app.use(errors());

app.use("*", (req, res) => {
  res.status(404).render("../views/404",);
});

app.listen(PORT, () => {
  console.log(`Server Connected : http://${HOST}:${PORT}`);
});
