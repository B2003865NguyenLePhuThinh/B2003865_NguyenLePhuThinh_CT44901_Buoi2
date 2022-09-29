const express = require("express");
const cors = require("cors");

const app = express();

const bodyParser = require('body-parser');
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    extended: true
}));

app.use (cors());
app.use(express.json());

const contactsRouter = require("./app/routes/contact.route")
const ApiError = require ("./app/api-error");

app.get("/", (req,res) => {
    res.json({messaage: "Welcome to Contact Book Application"});
});


app.use("/api/contacts",contactsRouter);

//handle 404 response
app.use((req,res,next) => {
    return next(new ApiError(404,"Resource not found"));
});

app.use((err,req,res,next) => {
    console.log(err)
    return res.status(err.statusCode || 500)
    .json({message : err.message || "Internal Server Error",});
});

module.exports = app;