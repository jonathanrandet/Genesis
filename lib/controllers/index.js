var app = require('../../lib/views/AppView');
module.exports = function (options){
	return app.Controllers[options.toLowerCase()];
};