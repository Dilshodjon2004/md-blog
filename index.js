const express = require("express");
const expressEdge = require("express-edge");
const mongoose = require("mongoose");
const Post = require("./models/post");
const fileUpload = require("express-fileupload");
const expressSession = require("express-session");
const connectMongo = require("connect-mongo");
const connectFlash = require("connect-flash");

const homePageController = require("./controllers/homePage");
const getPostsController = require("./controllers/getPosts");
const postsNewController = require("./controllers/postsNew");
const createPostController = require("./controllers/createPost");
const createUserController = require("./controllers/createUser");
const storeUserController = require("./controllers/userStore");
const loginController = require("./controllers/login");
const loginStoreController = require("./controllers/loginStore");
const logoutController = require("./controllers/logout");

const validateCreatePostMiddleware = require("./middleware/validationMiddleware");
const authMiddleware = require("./middleware/auth");
const redirectIfAuth = require("./middleware/redirect");

const app = express();
const mongoUrl =
  "mongodb+srv://dilshodbekgulomov:dilshodbek1704@cluster0.syg1ctm.mongodb.net/node-blog";

mongoose.connect(mongoUrl);

app.use(
  expressSession({
    secret: "dilshod",
    resave: false,
    saveUninitialized: false,
    store: connectMongo.create({ mongoUrl: mongoUrl }),
  })
);
app.use(fileUpload());
app.use(express.static("public"));
app.use(expressEdge);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(connectFlash());

app.set("views", `${__dirname}/views`);

app.use("*", (req, res, next) => {
  app.locals.auth = req.session.userId;
  next();
});

app.get("/", homePageController);
app.get("/post/:id", getPostsController);
app.get("/posts/new", authMiddleware, postsNewController);
app.post(
  "/posts/create/",
  authMiddleware,
  validateCreatePostMiddleware,
  createPostController
);
app.get("/reg", redirectIfAuth, createUserController);
app.post("/auth/reg", storeUserController);
app.get("/login", redirectIfAuth, loginController);
app.post("/auth/log", loginStoreController);
app.get("/logout", authMiddleware, logoutController);
app.use((req, res) => res.render("not_found"));

app.listen(5000, () => {
  console.log("Server has been started on Port 5000...");
});
