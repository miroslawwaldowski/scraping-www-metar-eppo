const puppeteer = require("puppeteer");
const $ = require("cheerio");
const url = "https://pl.allmetsat.com/metar-taf/polska.php?icao=EPPO";
const pool = require("./db/db");

async function readWeb() {
  console.log("readWeb");
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
  var temperature;
  var humidity;
  var pressure;
  var time_stamp;
  $(".c1b > div:nth-child(5)  > b:nth-child(1)", html).each(function () {
    var delta = Number($(this).text());
    time_stamp = new Date(Date.now() - delta * 60000).toISOString();
  });
  $(".c1b > div:nth-child(7)  > b:nth-child(1)", html).each(function () {
    temperature = $(this).text();
  });
  $(".c1b > div:nth-child(8)  > b:nth-child(1)", html).each(function () {
    humidity = $(this).text();
  });
  $(".c1b > div:nth-child(9)  > b:nth-child(1)", html).each(function () {
    pressure = $(this).text();
  });

  await pool.query(
    "INSERT INTO eppo (time_stamp, temperature, humidity, pressure) VALUES($1, $2, $3, $4) RETURNING *",
    [time_stamp, temperature, humidity, pressure]
  );

  browser.close();
}

readWeb();
