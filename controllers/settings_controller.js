//settings_controller.js

var settings;
var _measures = [];

var Article = require('../models/Article').Article;
var Measure = require('../models/Measure').Measure;

//Loki.js DB
var db = require("../dbmanager/db_articles");

exports.index = function(req,res){
	res.render("settings",{settings : settings});
};

exports.articleList = function(req,res){
	var articles = db.db_articulos.find({});
	console.log(articles);
	console.log(articles[0].sizes);
	res.render("article_list",{articles : articles});
};

exports.articleNew = function(req,res){
	res.render("article_add");
};

exports.articleAdd = function(req,res){
	var errMsg = [];
	var warnMsg = [];
	var article = new Article();
	
	article.name = req.body.articleName;
	article.price = req.body.price;
	article.onSale = req.body.onSale;
	article.onSalePrice = req.body.onSalePrice;
	article.description = req.body.description;
	article.sizes = _measures;
	if(_measures.length == 0){
		for(size in req.body.sizes){
			article.sizes.push(new Measure({size : size}));
		};
	}
	
	console.log(_measures);
	
	if(article.name == ""){
		errMsg.push("El Nombre del Artículo es Obligatorio");
	}
	if(!article.price){
		errMsg.push("El Precio del Artículo es Obligatorio");
	}
	if(article.onSale && !article.onSalePrice){
		errMsg.push("El Precio de Oferta es Obligatorio si el Artículo esta en oferta");
	}

	if(article.sizes.length == 0){
		warnMsg.push("El artículo no tiene talles asignados");
	}
	if(!article.sizes.measures || article.sizes.measures.length == 0){
		warnMsg.push("El artículo no tiene las medidas de los talles asignadas");
	}
	
	if(errMsg.length != 0){
		res.render("article_add",{
				warnMsg : warnMsg,
				errMsg : errMsg,
				alertType : "alert-danger",
				});
	}else{
		_measures = [];
		
		db.db_articulos.insert(article);
		
		db.db.saveDatabase();

		res.render("article_add",{
								message:"El artículo se cargo correctamente",
								strongMessage:"Éxito.",
								alertType : "alert-success",
								warnMsg : warnMsg
								});
	}
};

exports.articleMeasuresAdd = function(req, res){
	var exists = true;
	var editMode = req.body.editMode;
	var size = _measures.find(function(e) { return e.size === req.body.size; });
	if (!size) {
		size = new Measure();
		size.size = req.body.size;
		exists = false;
	}
	if (size.measures.filter(function(e) { return e.measureName === req.body.measureName; }).length > 0) {
		if(editMode!="false"){
			var aMeasure = size.measures.find(function(e) { return e.measureName === editMode; });
			aMeasure.measureName = req.body.measureName;
			aMeasure.measureValue = req.body.measureValue;
		}else{
			res.render("article_add",{
								message:"La medida ya existe",
								strongMessage:"Oops!",
								alertType : "alert-danger",
								measures : size.measures
								});
			return;
		}
	}else{
		size.measures.push({
							measureName : req.body.measureName,
							measureValue : req.body.measureValue
						});
	}
	if(!exists){
		_measures.push(size);
	}
	res.render("article_add",{
							message:"La medida fue agregada correctamente",
							strongMessage:"Exito.",
							alertType : "alert-success",
							measures : size.measures
							});
}

exports.articleMeasuresList = function(req, res){
	var measures = null;
	if(req.body.size != -1){
		var size = _measures.find(function(e) { return e.size === req.body.size; });
		measures = size ? size.measures : null;
	}
	res.render("article_add",{
							measures : measures
							});
}

exports.articleMeasuresEdit = function(req, res){
	var size = _measures.find(function(e) { return e.size === req.body.size; });
	var aMeasure = size.measures[req.body.index];
	res.render("article_add",{
							measure : aMeasure,
							editMode : aMeasure.measureName
							});
}

exports.articleMeasuresRemove = function(req, res){
	var size = _measures.find(function(e) { return e.size === req.body.size; });
	size.measures.splice(req.body.index,1);
	res.render("article_add",{
							message:"La medida fue eliminada correctamente",
							strongMessage:"Exito.",
							alertType : "alert-success",
							measures : size.measures
							});
}