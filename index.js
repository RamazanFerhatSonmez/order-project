"use strict";
var express = require('express');
var   swaggerUI = require("swagger-ui-express");
var   swaggerJsDoc = require("swagger-jsdoc");
var {postgresClient} = require('./config/db') ;
var session = require('express-session');


var pg = require('pg');
const app = express();
app.use(express.json());


const options = {
	definition: {
		openapi: "3.0.0",
		info: {
			title: "Library API",
			version: "1.0.0",
			description: "A simple Express Library API",
		},
		servers: [
			{
				url: "http://localhost:3000",
			},
		],
	},
	apis: ["./routes/*.js"],
};
let swaggerDocument = require('./swagger.json');
const PORT = process.env.PORT || 3000;
const specs = swaggerJsDoc(options);
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDocument));
app.use(session({secret: 'ssshhhhh',saveUninitialized: true,resave: true,cookie: { maxAge: 300000 }}));
//app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
require('./routes/webApi')(app);
require('./config/db') ;

app.use(function (req, res, next) {
    console.log(`====================***********`);
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Cache-Control, Origin, X-User-Token, X-Requested-With, Content-Type, Accept");
    if ('OPTIONS' == req.method) {
        return res.sendStatus(200);
    }
    else {
        next();
    }
});
app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
})