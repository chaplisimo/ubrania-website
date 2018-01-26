//Cart model
var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var articleSchema = require('./Article').articleSchema;

var cartSchema = new Schema({
	"user" : String,
	"articles" : [{
			"quantity" : Number,
			"article" : articleSchema
		}],
	"description" : String
})

var Cart = mongoose.model('Cart',cartSchema);

module.exports.Cart = Cart;