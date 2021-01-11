const puppeteer = require("puppeteer");
const $ = require("cheerio");
const url = "https://pl.allmetsat.com/metar-taf/polska.php?icao=EPPO";
const fs = require("fs");

async function readWeb() {
  console.log("readWeb");
  var logger = fs.createWriteStream("log.txt", {
    flags: "a", // 'a' means appending (old data will be preserved)
  });
  const browser = await puppeteer.launch({
    headless: true,
    defaultViewport: null,
    args: [
      "--incognito",
      "--no-sandbox",
      "--disable-setuid-sandbox",
      "--single-process",
      "--no-zygote",
    ],
  });
  const page = await browser.newPage();
  await page.goto(url);
  const html = await page.content();
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

  browser.close();
}

readWeb();
