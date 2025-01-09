require("express-async-errors");
require("dotenv/config");
const express = require('express');
const app = express();
const port = 3000;

const AppError = require("./utils/AppError");

const routes = require("./routes");
app.use(express.json());
app.use(routes);

app.use((error, req, res, next) => {
  if(error instanceof AppError) {
    return res.status(error.statusCode).json({
      status: "error",
      message: error.message,
    });
  } else {
    return res.status(500).json({
      status: "error",
      message: "Internal server error",
    });
  }}
);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});