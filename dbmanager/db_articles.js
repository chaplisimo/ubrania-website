//db_articles.js
var loki = require('lokijs');

var db = new loki('./articles.db');
var articulos;
db.loadDatabase({},function(err){
	if(err){
		console.log("ERROR IN DB:" +err);
	}else{
		console.log("database loaded.");
		articulos = db.getCollection('articulos') ? db.getCollection('articulos') : db.addCollection('articulos');
		console.log(articulos.count());
		exports.db_articulos = articulos;
	}
});

exports.db = db;
