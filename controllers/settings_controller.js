//settings_controller.js

var settings;

var Article = require('../models/Article').Article;

//Loki.js DB
var db = require("../dbmanager/db_articles");

exports.index = function(req,res){
	res.render("settings",{settings : settings});
};

exports.articleList = function(req,res){
	var articles = db.db_articulos.find({});
	console.log(articles);
	res.render("article_list",{articles : articles});
};

exports.articleNew = function(req,res){
	res.render("article_add");
};

exports.articleAdd = function(req,res){
	var article = new Article();
	
	article.name = req.body.articleName;
	article.price = req.body.price;
	article.onSale = req.body.onSale;
	article.onSalePrice = req.body.onSalePrice;
	article.description = req.body.description;
	article.sizes = req.body.sizes;
	
	db.db_articulos.insert(article);
	
	db.db.saveDatabase();

	res.render("article_add",{
							message:"El artículo se cargo correctamente",
							strongMessage:"Éxito."
							});
	//console.log(article);
};
