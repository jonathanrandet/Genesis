var BaseView = require('./BaseView');
var _ = require('underscore');

module.exports = BaseView.extend({
	initialize: initialize,
	toTemplateBindings: toTemplateBindings,
	render: render
});

function initialize(data){
	this.checkParameters(data);
	this.type = 'add';
	this.setDOMElement();
}

function render(element){	//$$$*** Voir si cette fonction diffère selon les Views 
	var html = this.template(this.toTemplateBindings());
	if(_.isUndefined(element)){
		this.$el.html(html);
	}
	else{
		this.ParentView.$(element).find(this.$el).html(html);	//$$$*** Voir pour le parentView
	}
}

function toTemplateBindings(){
	var json = this.model.FieldList;
	json.module = this.model.toJSON();
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
