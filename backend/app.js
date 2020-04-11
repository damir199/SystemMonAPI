const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const devicesRoutes = require("./routes/devicedata");
const usersRoutes = require("./routes/users");
//const devicesRoutes = require("./routes/devicedata");


const app = express();

mongoose
  .connect(
    "mongodb+srv://Damir:Bea27yee1989.@cluster0-szzlz.mongodb.net/SystemMonDB?retryWrites=true&w=majority", { useNewUrlParser: true }
  )
  .then(() => {
    console.log("Connected to database!");
  })
  .catch(() => {
    console.log("Connection failed!");
  });


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use("/api/devices", devicesRoutes);
app.use("/api/users", usersRoutes);



app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, PUT, DELETE, OPTIONS"
  );
  next();
});


module.exports = app;
