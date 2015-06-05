var Backbone = require('backbone');
var _ = require('underscore');
Backbone.$ = jQuery;

module.exports = Backbone.Router.extend({
	routes: {
		'':'index'
	},
	initialize: initialize,
	index: index
});

function initialize(data){
	if(!_.isUndefined(data) && !_.isUndefined(data.ParentView)){
		this.ParentView = data.ParentView;
	}
	else{
		throw new Error('Initialize: Router need a parentView param');
	}
}

function index (){
	//this.ParentView.render();
	//console.log('Ca marche !!');
}

/*function generateRoute(){
	var that = this;
	_.each(this.ParentView.Modules, function(module){
		if(!_.isUndefined(module.model.get('className'))){
			var route = module.model.get('className').toLowerCase();
			var data = {
				name: route+'Add',
				route: route+'/add',
				right: 'all'
			};
			console.log(that.ParentView);
			that.ParentView.createPage(data).addBlock(route+'Add');

			data = {
				name: route+'Search',
				route: route+'/search',
				right: 'all'
			};
			that.ParentView.createPage(data).addBlock(route+'Search');

			data = {
				name: route+'List',
				route: route+'/list',
				right: 'all'
			};
			that.ParentView.createPage(data).addBlock(route+'List');

		}
		else{
			throw new Error('Your modules require className');
		}

	});
}*/