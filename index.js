require("dotenv").config();

const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db/db");

app.use(cors());
app.use(express.json());

app.get("/", async (req, res) => {
  try {
    const sql = "SELECT * FROM eppo";
    const all = await pool.query(sql);
    res.json(all.rows);
  } catch (err) {
    console.log(err.massage);
  }
});

app.listen(process.env.PORT || 5000, () => {
  console.log(`server has started on port ${process.env.PORT}`);
});
