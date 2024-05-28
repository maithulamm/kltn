const express = require("express");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cokieParser = require("cookie-parser");
const authRoute = require("./routes/auth");
const userRoute = require("./routes/user");
const placeRoute = require("./routes/place");

dotenv.config();

mongoose.connect(process.env.DATABASE_ACCESS).then(() => {
  console.log("Database connected");
});

app.use(cors());
app.use(cokieParser());
app.use(express.json());

// Routes
app.use("/v1/auth", authRoute);
app.use("/v1/user", userRoute);
app.use("/v1/place", placeRoute);

const port = 8000;
app.listen(port, () => {
  console.log("Server is running on port", +port);
});
