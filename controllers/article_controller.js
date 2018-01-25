//article_controller.js

var fs = require("fs");

//modelo de articulo
var Article = require('../models/Article');

exports.index = function(req,res){
	var theData;
	theData = fs.readFileSync('./data/dataString.js')
	res.render("catalog",{data : JSON.parse(theData)});
};

exports.article_add = function(req,res){
	if(!req.body){
		return res.sendStatus(400);
	}else{
		res.send("NOT IMPLEMENTED: ADD TO CART");
	}
};

exports.article_remove = function(req,res){
	if(!req.body){
		return res.sendStatus(400);
	}else{
		res.send("NOT IMPLEMENTED: REMOVE FROM CART");
	}
};