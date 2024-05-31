const express = require("express");
const https = require("https");
const fs = require("fs");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const authRoute = require("./routes/auth");
const userRoute = require("./routes/user");
const placeRoute = require("./routes/place");

dotenv.config();

mongoose.connect(process.env.DATABASE_ACCESS).then(() => {
  console.log("Database connected");
});

app.use(cors());
app.use(cookieParser());
app.use(express.json());

// Routes
app.use("/v1/auth", authRoute);
app.use("/v1/user", userRoute);
app.use("/v1/place", placeRoute);

// HTTPS credentials
const httpsOptions = {
  key: fs.readFileSync('./key.pem'),
  cert: fs.readFileSync('./cert.pem')
};

const port = 8001;
https.createServer(httpsOptions, app).listen(port, () => {
  console.log("Server is running on https://localhost:" + port);
});

// HTTP
app.listen(8000, () => {
  console.log("Server is running on http://localhost:8000");
}
);