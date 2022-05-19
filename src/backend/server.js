var express = require('express')
const bodyParser = require('body-parser');
const cors = require('cors')
const db = require('./connection')
const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


// routes
// var Assessment = require("./routes/assessments");
var CreateRouter = require("./routes/Create");
var AddRouter = require("./routes/Add");
var GetRouter = require("./routes/Get")
// var UpdateRouter = require("./routes/Update")

// setup API endpoints
// app.use("/Assessment", Assessment);
app.use("/create", CreateRouter);
app.use("/add", AddRouter);
app.use("/get", GetRouter);
// app.use("/update", UpdateRouter);



app.listen(4000);
