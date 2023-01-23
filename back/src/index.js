const express = require("express");
const cors = require("cors");
const app = express();
const authRouter = require("./routes/auth");
const postRouter = require("./routes/posts");

app.use(cors());

app.use(express.json({ limit: "50mb" }));

app.use(
  express.urlencoded({
    limit: "50mb",
    extended: true,
    parameterLimit: 1000000000,
  })
);
app.use((req, res, next) => {
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});

app.listen(3001, () => {
  console.log("Running on 3000");
});

app.use("/api/auth", authRouter);
app.use("/api/post", postRouter);
