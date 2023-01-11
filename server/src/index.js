
const express = require ("express");
const mongoose = require ("mongoose");
const cors = require ("cors");
const dotenv = require ("dotenv");
const morgan = require ("morgan");

const router = require('./router')

dotenv.config();

const app = express(); // will start an express server that you can start configuring

mongoose.set("strictQuery", false);

app.use(express.json());
app.use(cors());
app.use(morgan('tiny'));
app.use(router);

//console.log(process.env.MONGO_URI); //call enviromant variable from .env

//TODO: configure app


mongoose.connect(process.env.MONGO_URI).then(() => {
    app.listen(8080);
    console.log("Connected to MongoDB shell");
});