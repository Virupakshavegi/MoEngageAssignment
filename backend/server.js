const express = require("express");
require("dotenv").config();
const mongoose = require("mongoose");

const listRoutes = require("./routes/listRoutes");
const userRoutes = require("./routes/user");

const app = express();

app.use(express.json());
app.use((req, res, next) => {
  console.log(req.path, req.method);

  next();
});

//routes
app.use("/api/lists", listRoutes);
app.use("/api/user", userRoutes);

//connect to db
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log("Connected to db &listeneing on port ", process.env.PORT);
    });
  })
  .catch((error) => {
    console.log(error);
  });
