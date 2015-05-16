var Backbone = require('backbone');
Backbone.$ = jQuery;
var _ = require('underscore');

module.exports = Backbone.View.extend({
	initialize: initialize,
	show: show,
	hide: hide
});

function initialize(data){
	if(!_.isUndefined(data)){
		if(!_.isUndefined(data.name)){
			this.name = data.name;
		}
		if(!_.isUndefined(data.route)){
			this.route = data.route;
		}
		if(!_.isUndefined(data.right)){
			this.right = data.right;
		}
		else{
			this.right = 'all';
		}
	}
}

function show(){
	var that = this;
	if(this.el){
		$sections = this.$el.find('[data-template]');
		_.each($sections, function(section){
			if(_.isUndefined(that.$(section).data('generate')) || that.$(section).data('generate').toLowerCase() !== 'manual'){ // Gestion de l'affichage auto des elément généré
				var dataTemplate = that.$(section).data('template').split('-', 2);
				var module = dataTemplate[0].toLowerCase();
				var viewName = dataTemplate[1];
				that.Modules[module].getView(viewName).render(element);
			}
		});
	}
}

function hide(){}

function addSection(name,right){
/*	var data = {};
	if(_.isUndefined(name)){
		throw new error('addBlock : Your block should have a name');
	}
	else{
		data.name = name;
		data.right = _.isUndefined(right) ? 'all' : right;
	}
	this.Blocks.add(data);*/
}