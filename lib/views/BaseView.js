var Backbone = require('backbone');
var _ = require('underscore');
//var Handlebars = require('handlebars');
Backbone.$ = jQuery;

module.exports = Backbone.View.extend({
  	checkParameters: checkParameters,
  	setDOMElement: setDOMElement,
  	clear: clear
});

function setDOMElement(element){
	if(_.isUndefined(element)){
		if( !_.isUndefined(this.model) && !_.isUndefined(this.model.name) && !_.isUndefined(this.type)){
			this.setElement('[data-template = "'+this.model.name+'-'+this.type+'"]');
		}
	}
	else{
		this.setElement(element);
	}
}

function render(){
	if(!_.isUndefined(this.template)){
		var html = this.template(this.toTemplateBindings());
		this.$el.html(html);
	}
}

function clear(){
	if(this.el){
		this.$el.html('');
	}
}

function checkParameters(data){
	if(data){
		if(data.template){
			this.template = data.template;
		}
		if(data.collection){
			this.collection = data.collection;
		}
		if(data.model){
			this.model = data.model;
		}
		if(data.module){
			this.Module = data.module;
			this.ParentView = data.module.ParentView;
		}
		if(data.parentView){
			this.ParentView = data.parentView;
		}
	}
	else{
		throw new error('initialize : need config and template');
	}
}


