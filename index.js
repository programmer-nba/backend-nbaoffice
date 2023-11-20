require("dotenv").config();

const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const connection = require("./config/db");
connection();

app.use(express.json());
app.use(cors());

app.use("/nba-office", require("./routes"));

app.use("/nba-office/admin", require("./routes/admin"));

const port = process.env.PORT || 4003;
app.listen(port, console.log(`Listening on port ${port}`));
