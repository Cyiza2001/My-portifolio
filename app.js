const express = require("express");
const mongoose = require("mongoose");
const blogRoutes = require("./routes/blogs.routes");
const userRoutes = require("./routes/user.routes");
const app = express();

//set a middleware for express json

app.use(express.json());
app.use("/api/blogs", blogRoutes);
app.use("/api/users", userRoutes);

mongoose
  .connect(
    "mongodb+srv://Alexandre:ndanyuzwe2@portfolio.b07whzb.mongodb.net/?retryWrites=true&w=majority&appName=portfolio"
  )
  .then(() => {
    console.log("Connected to the database!");
    app.listen(5000, () => {
      console.log("server is listening on the port 5000...");
    });
  })
  .catch((error) => console.log("not connected!", error));
