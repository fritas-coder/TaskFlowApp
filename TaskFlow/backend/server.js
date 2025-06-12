const express = require("express");
const colors = require("colors");
const connectDB = require("./config/db");
const app = express();
const dotenv = require("dotenv");
dotenv.config();
const PORT = process.env.PORT || 5000;
const {errorHandler} = require('./middleware/errorMiddleware')
connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/tasks", require("./routes/taskRoutes"));
app.use(errorHandler)
app.listen(PORT, () => {
  console.log(`server listining on port ${PORT}`.cyan.underline);
});
