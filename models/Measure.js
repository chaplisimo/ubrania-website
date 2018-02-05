var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var measureSchema = new Schema({
	"size" : String,
	"measures" : Array,
});

var Measure = mongoose.model('Measure', measureSchema);

module.exports.Measure = Measure;
module.exports.measureSchema = measureSchema;