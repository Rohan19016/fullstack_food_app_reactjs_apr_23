const functions = require("firebase-functions");
const admin = require ("firebase-admin");
require("dotenv").config();

const serviceAccountKey = require("./serviceAccountKey.json");

const express = require("express");
const app = express();

//body parser for our json data

app.use(express.json());

// cross origin
const cors = require("cors");
app.use(cors({origin : true}));
app.use((req, res, next) => {
    res.set("Access-Control-Allow-Origin", "*");
    next();
});

//firebase credentials
admin.initializeApp({
    credential: admin.credential.cert(serviceAccountKey),
  });
//api endpoints
app.get("/", (req, res) => {
    return res.send("hello");
});

const userRoute = require("./routes/user");
app.use("/api/users", userRoute);


  exports.app = functions.https.onRequest(app);