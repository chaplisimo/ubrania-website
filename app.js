var express = require("express");
var bodyParser = require('body-parser');

var app = express();
var urlEncodedParser = bodyParser.urlencoded({extended : true});

//mongodb connection
/*var mongoose = require('mongoose');
mongoose.connect('mongodb://hugo%5Fasterix%40hotmail%2Ecom:chaplide10%2E%2Es@'+
		'cluster0-shard-00-00-9hwsa.mongodb.net:27017,'+
		'cluster0-shard-00-01-9hwsa.mongodb.net:27017,'+
		'cluster0-shard-00-02-9hwsa.mongodb.net:27017/UbraniaDB?'+
		'ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&keepAlive=1'
);

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
	console.log("DB Connection Initialized");
});*/

//routes
var cart = require('./routes/cart');
var settings = require('./routes/settings');

app.set("view engine","jade");

app.use(express.static("static"));

app.use('/ubrania/',express.static("static"));

//route to cart
app.use('/catalog', urlEncodedParser);
app.use('/catalog', cart);

//route to settings
app.use('/settings', urlEncodedParser);
app.use('/settings', settings);

app.get("/", (req,res) => {
	res.render("home");
});

app.listen(8080, () => { console.log ("Server running on http://localhost:8080")});