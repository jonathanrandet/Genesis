var app = require('Genesis');
module.exports = function (options){
	return app.Controllers[options.toLowerCase()];
};