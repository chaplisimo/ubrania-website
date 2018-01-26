//article_controller.js

var fs = require("fs");

//modelo de articulo
var Article = require('../models/Article').Article;
var Cart = require('../models/Cart').Cart;

var globalCart = new Cart();

exports.index = function(req,res){
	var theData;
	theData = fs.readFileSync('./data/dataString.js')
	res.render("catalog",{	data : JSON.parse(theData),
							shoppingCart : globalCart});
};

exports.article_add = function(req,res){
	if(!req.body){
		return res.sendStatus(400);
	}else{
		var quantity = req.body.quantity;
		var anArticle = new Article({
			name : req.body.name,
			price : req.body.price,
			imageUrl : req.body.imageUrl
		});
		
		if(globalCart.articles.length > 0){
			for(var i=0;i<globalCart.articles.length;i++){
				var item = globalCart.articles[i];
				if(item.article.name == anArticle.name){
					item.quantity+=Number(quantity);
				}else{
					globalCart.articles.push({
									quantity : quantity,
									article : anArticle
								});
				}
			}
		}else{
			globalCart.articles.push({
									quantity : quantity,
									article : anArticle
								});
		}
		
		res.render("catalog",{shoppingCart : globalCart});
	}
};

exports.article_remove = function(req,res){
	if(!req.body){
		return res.sendStatus(400);
	}else{		
		globalCart.articles.splice(req.body.index,1);
		
		res.render("catalog",{shoppingCart : globalCart});
	}
};

exports.article_checkout = function(req, res){
	if(!req.body){
		return res.sendStatus(400);
	}else{		
		res.render("checkOut",{shoppingCart : globalCart});
	}
}