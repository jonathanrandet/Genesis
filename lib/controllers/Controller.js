var _ = require('underscore');

var Controller = function (options){
	if(!_.isUndefined(options) && !_.isUndefined(options.pageName)){
		this.name = options.pageName;
	}
	if(!_.isUndefined(options) && !_.isUndefined(options.app)){
		this.app = options.app;
	}
	this.initPage 	= initPage;
	this.addAction 	= addAction;
};

function initPage(action){
	if(!_.isUndefined(this.name) && _.isString(this.name) && !_.isUndefined(action) && _.isFunction(action)){
		if(!_.isUndefined(this.app.Pages[this.name.toLowerCase()])){
			var actionName = 'init'+this.name;
			actionName = actionName.toLowerCase();
			this[actionName] = action;		
		}
		else{
			throw new Error('initPage : The page '+this.name+' doesn\'t exist');
		}
	}
	else{
		throw new Error('initPage : The function need action parameter.');
	}
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


module.exports = Controller;