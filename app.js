//express initinalized
const express = require("express");
const app = express();
const routes = require("./routes/routes");
var bodyParser = require("body-parser");
const connectDb = require("./db/connect"); //! DB CONNECTION

require("dotenv").config(); //! ENV  SET UP

const notFound = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use("/api/V1/routes", routes);

app.use(notFound);
app.use(errorHandlerMiddleware);


//basic port declaration
const port = process.env.PORT || 3737;

const start = async () => {
  try {
    await connectDb(process.env.MONGO_URI);
    app.listen(port, console.log(`app listen on port no ${port}`));
    console.log("connected :  SERVER AND DATA BASE");
  } catch (error) {
    console.log("CONNECTION ERROR", error);
  }
};

start();
