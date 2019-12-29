const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");

require("dotenv").config();

//Defining the PORT
const port = process.env.PORT || 5000;

//Using middlewares
app.use(cors());
app.use(express.json());

//Database Connection
const uri = process.env.ATLAS_URI;
mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
});
const connection = mongoose.connection;
connection.once("open", () =>
  console.log("Database Connection Successful!")
);

//Routers
const spRouter = require('./routes/sellprice');
const cpRouter = require('./routes/costprice');
app.use('/sp',spRouter);
app.use('/cp',cpRouter);

//Listening to the PORT
app.listen(port, () => {
  console.log(`Server Started at PORT ${port}`);
});
