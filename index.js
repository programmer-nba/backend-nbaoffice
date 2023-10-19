require("dotenv").config();
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
app.use(bodyParser.json({ limit: '50mb', type: 'application/json' }));
app.use(bodyParser.urlencoded({ extended: true }));
const cors = require('cors');

mongoose.set('strictQuery', true);
mongoose.connect(process.env.DB,{ useNewUrlParser: true });

app.use(express.json());
app.use(cors());

// app.use('/nba-office', require("./routes/index"));


//Thailand
// app.use("/dekrub-shop/thailand", require("./routes/thailand"));

const port = process.env.PORT || 9100;

app.listen(port,() => {
    console.log(`API Runing PORT ${port}`);
});