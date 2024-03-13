const express = require('express');
const cors=require("cors")
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const router = require('./server/routes');
const path=require("path");
mongoose.connect("mongodb+srv://priyapandey:EkdsqKjtNEMVZGH9@cluster0.huycjj2.mongodb.net/thinkLab?retryWrites=true", { useNewUrlParser: true, useUnifiedTopology: true });
const app = express();


app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/uploads',express.static(path.join(__dirname,'uploads')));
app.use('/app',router)

app.listen(3000, () => {
  console.log('Server started on port 3000');
});