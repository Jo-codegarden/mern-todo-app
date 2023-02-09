
const express = require ("express");
const mongoose = require ("mongoose");
const cors = require ("cors");
const dotenv = require ("dotenv");
const morgan = require ("morgan");

const router = require('./router')

dotenv.config();

const app = express(); // will start an express server that you can start configuring
const PORT = process.env.PORT || 8080;

mongoose.set("strictQuery", false);

app.use(express.json());
app.use(cors());
app.use(morgan('tiny'));
app.use(router);


mongoose.connect(process.env.MONGO_URI).then(() => {
    app.listen(PORT);
    console.log("Connected to MongoDB shell");
});