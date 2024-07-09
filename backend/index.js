const express = require("express");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const authRoute = require("./routes/auth");
const userRoute = require("./routes/user");
const placeRoute = require("./routes/place");
const place2Route = require("./routes/place2");
const typePlaceRoute = require("./routes/typePlace");
const newsRoute = require("./routes/news");
const feedbackRoute = require("./routes/feedback");
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
app.use("/v1/place2", place2Route);
app.use("/v1/type", typePlaceRoute);
app.use("/v1/news", newsRoute);
app.use("/v1/feedback", feedbackRoute);




// HTTP
app.listen(8000, () => {
  console.log("Server is running on http://localhost:8000");
}
);