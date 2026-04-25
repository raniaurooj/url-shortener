const express = require("express");
const cookieParser = require("cookie-parser");
const path = require("path");

const { connectMongoDB } = require("./connectiondb");
const { logReqRes } = require("./middleware");
const { checkForAuthentication } = require("./middleware/auth");

const urlRouter = require("./routes/url");
const userRouter = require("./routes/user");
const staticRouter = require("./routes/staticRouter");

const app = express();
const PORT = process.env.PORT || 8000;

// Database connection
connectMongoDB(process.env.MONGO_URI || "mongodb://127.0.0.1:27017/urlShortenerDB")
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// View engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());
app.use(logReqRes("log.txt"));
app.use(checkForAuthentication);

// Routes
app.use("/url", urlRouter);
app.use("/user", userRouter);
app.use("/", staticRouter);

app.listen(PORT, () => {
  console.log(`Server started at http://localhost:${PORT}`);
});
