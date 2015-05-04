var Backbone = require('Backbone');
var ModuleModel = require('../models/ModuleModel');

module.exports = Backbone.Collection.extend({
	model: ModuleModel
});