const express = require("express");
const path = require("path");

const app = express();

app.use(express.json());

// include and initialize the rollbar library with your access token
const Rollbar = require("rollbar");
let rollbar = new Rollbar({
  accessToken: "a5e4e0eaed484191abc219191bbd8fc5",
  captureUncaught: true,
  captureUnhandledRejections: true,
});

// app.get("/", (req, res) => {
//   res.sendFile(path.join(__dirname, "../public/index.html"));
// });

// record a generic message and send it to Rollbar
rollbar.log("Hello world!");

let students = [];

app.post("/api/student", (req, res) => {
  let { name } = req.body;
  name = name.trim();

  const index = students.findIndex((studentName) => studentName === name);

  if (index === -1 && name !== "") {
    students.push(name);
    rollbar.log("Student added successfully", {
      author: "Scott",
      type: "manual entry",
    });
    res.status(200).send(students);
  } else if (name === "") {
    rollbar.error("No name given");
    res.status(400).send("must provide a name.");
  } else {
    rollbar.error("student already exists");
    res.status(400).send("that student already exists");
  }
});

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/index.html"));
  rollbar.info("html file served successfully.");
});

app.get("/style", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/styles.css"));
  rollbar.info("css file served successfully");
});

const port = process.env.PORT || 4545;

app.use(rollbar.errorHandler());

app.listen(port, () => {
  console.log(`Take us to warp ${port}`);
});
