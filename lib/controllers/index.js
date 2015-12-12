var _ = require('underscore');
var app = require('Genesis');
module.exports = function (options){
	if(_.isUndefined(app.Controllers[options.toLowerCase()])){
		throw new Error('Controller : The page '+options+' does\'nt exist.');
	}
	return app.Controllers[options.toLowerCase()];
};