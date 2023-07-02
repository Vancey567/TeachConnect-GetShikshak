require("dotenv").config();

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const morgan = require("morgan");
const helmet = require("helmet");
const path = require("path");
const fileupload = require("express-fileupload");

// Routes Imports
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");
const adminRoutes = require("./routes/admin");
const advertiseRoutes = require("./routes/advertise");
const dashboardRoutes = require("./routes/dashboard");
const tutorRoutes = require("./routes/tutor");

// const url = require('url')

// const __dirname = path.dirname()

// DATABASE CONNECTION
const PORT = process.env.PORT || 6001;

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch((err) => {
    console.error(err);
  });

// MIDDLEWARES
const app = express();
app.use(express.json());

app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(express.static(path.join(__dirname, "public")));

app.use(
  fileupload({
    useTempFiles: true,
  })
);

// ROUTES
app.use("/auth", authRoutes);
app.use("/user", userRoutes);
app.use("/admin", adminRoutes);
app.use("/advertise", advertiseRoutes);
app.use("/dashboard", dashboardRoutes);
app.use("/tutor", tutorRoutes);


// LISTENING TO SERVER
app.listen(PORT, () => {
  console.log(`Listining on PORT ${PORT}`);
});
