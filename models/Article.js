var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var articleSchema = new Schema({
	"name" : String,
	"price" : Number,
	"onSale" : Boolean,
	"onSalePrice" : Number,
	"description" : String,
	"sizes" : Array,
	"imageUrl" : Array
});

var Article = mongoose.model('Article', articleSchema);

module.exports.Article = Article;
module.exports.articleSchema = articleSchema;