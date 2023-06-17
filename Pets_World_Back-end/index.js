const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const app = express();
var cors = require("cors");
require("./databaseCreation");
const registerRoute = require("./routes/Auth_Routes/Register");
const authorizationMW = require("./core/Authorization/Authorization");
const loginRoute = require("./routes/Auth_Routes/Login");
const VetAppointmentsRoute = require("./routes/Vet/VetAppointment/VetAppointmentsRoute");
////// please don't change anything and use the middlewores //////

//connect to database
mongoose
  .connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(process.env.PORT, () => {
      console.log("Example app listening on port 8080!");
    });
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });

// first layer logging middleware
app.use((req, res, next) => {
  next();
});
app.use(express.json());
app.use(cors());
// app.use("/assets/images", express.static(path.join(__dirname, "")));

//  middelware layers of routing and authentication
app.use(VetAppointmentsRoute);
app.use(registerRoute);
app.use(loginRoute);
app.use(authorizationMW);

//  third layer no page found
app.use((req, res, next) => {
  res.status(404).json({ message: "path not found" });
});

// fourth layer for handling errors
app.use((err, req, res, next) => {
  res.status(500).json({ message: err + " " });
});
