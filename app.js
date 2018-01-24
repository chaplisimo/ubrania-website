var express = require("express");
var fs = require("fs");
var bodyParser = require('body-parser');

var app = express();

app.set("view engine","jade");

app.use(express.static("static"));

var urlEncodedParser = bodyParser.urlencoded({extended = true});

app.get("/", (req,res) => {
	res.render("home");
});

app.post("/catalog", (req,res) => {
	var theData;
	theData = fs.readFileSync(__dirname +'/data/dataString.js')
	//console.log(theData.toString());
	res.render("catalog",{data : JSON.parse(theData)});
});

app.post("/addToCart", urlEncodedParser, (req,res)=>{
	if(!req.body){
		return res.sendStatus(400);
	}else{
		
	}
});

app.listen(8080, () => { console.log ("Server running on http://localhost:8080")});