const express = require("express");
const app = express();
const cors = require("cors");

require("dotenv").config();

app.use(cors());

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/log.txt");
  console.log("get file");
});

app.listen(process.env.PORT || 5000, () => {
  console.log(`server has started on port ${process.env.PORT}`);
});
