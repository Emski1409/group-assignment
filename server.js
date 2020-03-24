const createError = require("http-errors");
const express = require("express");
const cors = require("cors");
const db = require("./data");

let testersRouter=require("./routes/testers");
let questionsRouter=require("./routes/questions");
let staffsRouter=require("./routes/staffs")
let searchRouter = require("./routes/search");

let server = express();

// interpret JSON body of requests
server.use(express.json());

// interpret url-encoded queries
server.use(express.urlencoded({ extended: false }));

// allow CORS
server.use(cors());

// allow CORS preflight for all routes
server.options("*", cors());

server.use("/testers", testersRouter);
server.use("/questions", questionsRouter);
server.use("/staffs",staffsRouter)
server.use("/search", searchRouter);

// handle errors last
server.use(function(err, req, res, next) {
    res.status = err.status || 500;
    res.send(err);
});

// connect to the database and start the server running
db.initialiseDatabase(false, null);
server.listen(8888, function() {
    console.log("server listening");
});
