var express = require("express");
var bodyParser = require('body-parser');

var app = express();
var urlEncodedParser = bodyParser.urlencoded({extended : true});

//routes
var cart = require('./routes/cart');

app.set("view engine","jade");

app.use(express.static("static"));

//route to cart
app.use('/catalog', cart);

app.get("/", (req,res) => {
	res.render("home");
});

app.listen(8080, () => { console.log ("Server running on http://localhost:8080")});