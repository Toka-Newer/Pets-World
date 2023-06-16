const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const app = express();
var cors = require("cors");

//connect to database
mongoose
    .connect(process.env.DB_URL)
    .then(() => {
        console.log("Connected to MongoDB");
        app.listen(process.env.PORT, () => {
            console.log("Example app listening on port 8080!");
        });
    })
    .catch((error) => {
        console.error("Error connecting to MongoDB:", error);
    });

app.use(express.json());

app.use(cors());

//  third layer no page found
app.use((req, res, next) => {
    res.status(404).json({ message: "path not found" });
});

// fourth layer for handling errors
app.use((err, req, res, next) => {
    res.status(500).json({ message: err + " " });
});
