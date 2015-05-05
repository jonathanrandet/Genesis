var Backbone = require('backbone');

var CurrentUser = require('./CurrentUserModel');
var ModuleCollection = require('../ModuleCollection');

module.exports = Backbone.Model.extend({
	initialize: initialize 
});

function initialize(data){
	this.CurrentUser = new CurrentUser();
	this.Modules = new ModuleCollection();
}