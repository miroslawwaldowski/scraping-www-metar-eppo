const puppeteer = require("puppeteer");
const $ = require("cheerio");
const url = "https://pl.allmetsat.com/metar-taf/polska.php?icao=EPPO";
const fs = require("fs");
const express = require("express");
const app = express();
const cors = require("cors");

require("dotenv").config();

app.use(cors());
app.use(express.json());

var logger = fs.createWriteStream("log.txt", {
  flags: "a", // 'a' means appending (old data will be preserved)
});

function readWeb() {
  puppeteer
    .launch()
    .then(function (browser) {
      return browser.newPage();
    })
    .then(function (page) {
      return page.goto(url).then(function () {
        return page.content();
      });
    })
    .then(function (html) {
      console.log("-------------------------");
      $(".c1b > div:nth-child(5)  > b:nth-child(1)", html).each(function () {
        var delta = Number($(this).text());
        var time = new Date(Date.now() - delta * 60000).toISOString();
        logger.write("");
        logger.write(time + " ; ");
      });
      $(".c1b > div:nth-child(7)  > b:nth-child(1)", html).each(function () {
        console.log($(this).text());
        logger.write($(this).text() + " ; ");
      });
      $(".c1b > div:nth-child(8)  > b:nth-child(1)", html).each(function () {
        console.log($(this).text());
        logger.write($(this).text() + " ; ");
      });
      $(".c1b > div:nth-child(9)  > b:nth-child(1)", html).each(function () {
        console.log($(this).text());
        logger.write($(this).text() + " \n");
      });

      console.log(time2);
    })
    .catch(function (err) {
      //handle error
    });
}

// app.get("/", function (req, res) {
//   res.sendFile(__dirname + "/log.txt");
// });

app.get("/", function (req, res) {
  res.send("hello world");
});

setInterval(readWeb, 1 * 60000);

app.listen(process.env.PORT || 5000, () => {
  console.log(`server has started on port ${process.env.PORT}`);
});
