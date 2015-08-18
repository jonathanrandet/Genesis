var Backbone = require('backbone');
var _ = require('underscore');

var DataCollection = require('../collections/DataCollection');


module.exports = Backbone.Model.extend({
	initialize: initialize 
});

function initialize(datas){
	this.datas = new DataCollection({});
	if(!_.isUndefined(datas) && !_.isUndefined(datas.url)){
		this.url = datas.url;
	}
	if(!_.isUndefined(datas) && !_.isUndefined(datas.params)){
		this.params = datas.params;
	}
}