var BaseCollection = require('./BaseCollection');
var _ = require('underscore');


module.exports = BaseCollection.extend({
	search: search
});

function search(data){
	var result = new BaseCollection(this.where(data));
	return result;
}

