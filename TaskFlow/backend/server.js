const express = require("express");
const colors = require("colors");
const connectDB = require("./config/db");
const app = express();
require("dotenv").config();
const PORT = process.env.PORT || 5000;

connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/tasks", require("./routes/taskRoutes"));
app.listen(PORT, () => {
  console.log(`server listining on port ${PORT}`.cyan.underline);
});
