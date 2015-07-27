var BaseView = require('./BaseView');
var _ = require('underscore');

module.exports = BaseView.extend({
	initialize: initialize,
	toTemplateBindings: toTemplateBindings,
	getConfig: getConfig,
	render: render
});

function initialize(data){
	this.type = 'add';
	this.getConfig();
	this.setDOMElement();
	this.template = this.model.templates.addview;
	this.ParentView = this.model.ParentView;
}

function getConfig(){
	var config = {};
	_.each(this.model.config, function(value, key){
		if(!_.isObject(value)){
			config[key] = value;
		}
	});
	this.config = config;
}

function render(element){	//$$$*** Voir si cette fonction diffère selon les Views 
	var html = this.template(this.toTemplateBindings());
	
	if(_.isUndefined(element)){
		$(this.$el.selector).html(html);
		//this.$el.html(html);
	}
	else{
		$(this.ParentView.$el.selector+' '+element+' '+this.$el.selector).html(html);	//$$$*** Voir pour le parentView
		//$(this.ParentView.$(element).find(this.$el).html(html);	//$$$*** Voir pour le parentView
	}
}

function toTemplateBindings(){
	var json = this.model.FieldList;
	json.module = this.config;
	return json;
}



// function addModel(){
// 	var fields = this.ParentView.model.get('fields');
// 	var jsonTxt = '{';
// 	var that = this;
// 	_.each(fields, function(field, key){
// 		var tata = new Field(field);
// 		//console.log(tata);
// 		//console.log(tata.checkRequired()+ " taratata AddView: addModel");
// 		jsonTxt = jsonTxt +'"'+field.displayName+'": "'+that.$('[name='+field.name+']').val()+'",';
// 	});
// 	jsonTxt = jsonTxt.substring(0,jsonTxt.length-1);
// 	jsonTxt = jsonTxt + '}';
// 	json = JSON.parse(jsonTxt);
	
// 	this.ParentView.DataCollection.add(json);
// 	console.log(this.ParentView.DataCollection);
// 	this.$el.find('form input').val(''); // Si la validation est ok
// }
