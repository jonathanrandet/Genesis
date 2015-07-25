var Backbone = require('backbone');
var _ = require('underscore');
//var Handlebars = require('handlebars');
Backbone.$ = jQuery;

module.exports = Backbone.View.extend({
  	//initialize: initialize,
  	//render: render,
  	//toTemplateBindings : toTemplateBindings,
/*  	quickAction: quickAction,
  	addAction: addAction,*/
  	checkParameters: checkParameters,
  	setDOMElement: setDOMElement,
  	clear: clear,
/*  	events: {
  		'click [data-click]': 'quickAction', // click
  		'keyup [data-keyup]': 'quickAction', // keyup
  		'keydown [data-keydown]': 'quickAction', // keydown
  		'focus [data-focus]': 'quickAction', // focusin
  		'blur [data-blur]': 'quickAction', // focusout
  		'mouseover [data-hover]': 'quickAction', // mouseover
  		'mouseleave [data-mouseleave]': 'quickAction', // mouseleave
  		'mouseenter [data-mouseenter]': 'quickAction', //mouseenter
  		'change [data-change]': 'quickAction' // change
  	}*/
});

function initialize(options) {
  if (options && options.template) {
    this.template = options.template;
  }
  this.render();
}

function setDOMElement(element){
	if(_.isUndefined(element)){
		if( !_.isUndefined(this.model) && !_.isUndefined(this.model.name) && !_.isUndefined(this.type)){
			this.setElement('[data-template = '+this.model.name+'-'+this.type+']');
		}
	}
	else{
		this.setElement(element);
	}
}

function render(){
	if(!_.isUndefined(this.template)){
		//var template = Handlebars.compile(this.template);
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
		if(data.parentView){
			this.ParentView = data.parentView;
		}
	}
	else{
		throw new error('initialize : need config and template');
	}
}

function toTemplateBindings() {
  if (this.model) {
    return this.model.toJSON();
  } else if (this.collection) {
    return this.collection.toJSON();
  } else {
    throw new error('toTemplateBindings: requires a either a model or to be overriden');
  }
}

function quickAction(e) {
	var type = e.type;
	if(type === 'focusin'){ type = 'focus';}
	if(type === 'focusout'){ type = 'blur';}
	var action = $(e.currentTarget).data(type);
	if (_.isFunction(this[action])) {
		this[action](e);
	}
	//e.stopPropagation();
}

function addAction(name, action){
	if(!_.isString(name)){
		throw new Error('addAction : first argument should be a string');
	}
	else if(_.isFunction(action)){
		this[name] = action;
	}
	else{
		this[name] = function(){
			console.log(action);
		};
	}
}

