const express = require("express");
const cookieParser = require("cookie-parser");

require("dotenv").config();

const app = express();

//regular middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }))

//cookie middleware
app.use(cookieParser());

//routes
const userRouter = require("./routes/userRoutes.js");
const postRouter = require("./routes/postRoutes.js");

app.use("/api/user", userRouter);
app.use("/api/post", postRouter);

app.get("/", (req, res) => {
    res.send("Hello World");
})

app.listen(3000, () => {
    console.log("App running on http://localhost:3000");
})