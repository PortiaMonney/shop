const express = require("express");
const { dbConnect } = require("./config/dbConnect");
const productRouter = require("./routes/products.router");

const app = express();
app.use("/product", productRouter);

const start = async () => {
  await dbConnect();

  app.listen(4000, () => {
    console.log("server nup and running");
  });
};

start();
