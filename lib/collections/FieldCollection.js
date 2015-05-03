var Backbone = require('Backbone');
var FieldModel = require('../models/FieldModel');

module.exports = Backbone.Collection.extend({
	model: FieldModel
});