const express = require("express");
const mongoose = require('mongoose');
const dotenv = require("dotenv/config");


const server = express();
let PORT = 8000;

server.use(express.json());

mongoose.connect(process.env.DB_CONNECTION, {
    autoIndex: true,
});

server.post("/signup", (req, res) => {
    console.log(req.body)
    res.json(req.body)
})

server.listen(PORT, () => {
    console.log('listenning on port: ' + PORT);
})