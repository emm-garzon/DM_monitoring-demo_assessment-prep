const express = require("express");
const path = require("path");

const app = express();

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/index.html"));
});

// include and initialize the rollbar library with your access token
const Rollbar = require("rollbar");
let rollbar = new Rollbar({
  accessToken: "a5e4e0eaed484191abc219191bbd8fc5",
  captureUncaught: true,
  captureUnhandledRejections: true,
});

// record a generic message and send it to Rollbar
rollbar.log("Hello world!");

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "..public/index.html"));
  rollbar.info("html file served successfully.");
});

const port = process.env.PORT || 4545;

app.listen(port, () => {
  console.log(`Take us to warp ${port}`);
});
