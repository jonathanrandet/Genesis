var Backbone = require('backbone');
var _ = require('underscore');

var App = require('Genesis');
var LocalDb = require('../../lib/models/LocalDb');
var RemoteDb = require('../../lib/models/RemoteDb');
var Templates = require('../../lib/manifest');

var modules = Templates.modules;

module.exports = function (options){
	options = options.toLowerCase();
	var Class = Backbone.Model.extend({
		name : name(),
		fieldList: fieldList(),
		config: config(),
		idField: getIdField(),
		tableName: getTableName(),
		isNew: isNew,
		localSave: localSave,
		remoteSave: remoteSave
	});

	function name(){
		if(_.isUndefined(modules[options])){
			throw new Error('Class : Module '+options+' does\'nt exist.');
		}
		if(_.isUndefined(modules[options].config.className)){
			throw new Error('Class : The attribute className in the '+options+' config file is missing.');
		}
		return modules[options].config.className;
	}

	function fieldList(){
		if(_.isUndefined(modules[options])){
			throw new Error('Class : Module '+options+' does\'nt exist.');
		}
		return modules[options].config.fields;
	}

	function config(){
		if(_.isUndefined(modules[options])){
			throw new Error('Class : Module '+options+' does\'nt exist.');
		}
		return modules[options].config;
	}

	function getIdField(){
		if(_.isUndefined(modules[options])){
			throw new Error('Class : Module '+options+' does\'nt exist.');
		}
		var idField = '';
		_.each(modules[options].config.fields, function(field){
			if(!_.isUndefined(field.index) && field.index.toLowerCase() === 'primary'){
				if(!_.isUndefined(field.name)){
					idField = field.name.toLowerCase();
				}
				else{
					throw new Error('Class : The name of the primary key in '+options+' config file is missing.');
				}
			}
		});
		if(idField === ''){
			throw new Error('Class : The primary key in '+options+' config file is missing.');
		}

		return idField;
	}

	function getTableName(){	
		// Si l'attribut tableName n'existe pas dans le config, on prend le nom du module en minuscule
		if(_.isUndefined(modules[options])){
			throw new Error('Class : Module '+options+' does\'nt exist.');
		}
		var tableName = modules[options].config.className.toLowerCase();
		if(!_.isUndefined(modules[options].config.tableName)){
			tableName = modules[options].config.tableName.toLowerCase();
		}
		return tableName;
	}

	function isNew(){
		var bisOk = false;
		if(!_.isUndefined(this.idField)){
			bisOk = _.isUndefined(this.get(this.idField));
		}
		else{
			throw new Error('isNew : Module '+options+' need \'idField\' parameter in the config file');
		}
		return bisOk;
	}

	function localSave(onSuccess, onErrors){
		var model = this.attributes;
		var field = '', value = '';
		var sql;
		var bisOk = false;
		if(this.isNew()){
			_.each(model, function(val, key){
				if(val !== null && val !== undefined){
					field += key+', ';
					value += '"'+addslashes(val)+'", ';
				}
			});
			field = field.substring(0, field.length-2);
			value = value.substring(0, value.length-2);
			sql = 'INSERT OR IGNORE INTO '+this.tableName+' ( '+field+' ) VALUES ( '+value+' )';
		}
		else{
			_.each(model, function(val, key){
				if(val !== null && val !== undefined){
					value += key+' = "'+addslashes(val)+'", ';
				}
			});
			value = value.substring(0, value.length-2);
			sql = 'UPDATE '+this.tableName+' SET '+value+' WHERE '+this.idField+' = '+this.get(this.idField);
		}

		var db = new LocalDb();
		db.executeQuery(sql, onSuccess, onErrors);
	}

	function remoteSave(isNew, onSuccess, onErrors){
/*		var model = this.attributes;
		var field = '', value = '';
		var sql;
		var bisOk = false;
		if(isNew){
			_.each(model, function(val, key){
				if(val !== null && val !== undefined){
					field += key+', ';
					value += '"'+addslashes(val)+'", ';
				}
			});
			field = field.substring(0, field.length-2);
			value = value.substring(0, value.length-2);
			sql = 'INSERT OR IGNORE INTO '+this.tableName+' ( '+field+' ) VALUES ( '+value+' )';
		}
		else{
			_.each(model, function(val, key){
				if(val !== null && val !== undefined){
					value += key+' = "'+addslashes(val)+'", ';
				}
			});
			value = value.substring(0, value.length-2);
			sql = 'UPDATE '+this.tableName+' SET '+value+' WHERE '+this.idField+'_srv = '+this.get(this.idField+'_srv');
		}

		var db = new DbManager({name: 'MediaSalon'});
		result = db.executeQuery(sql, onSuccess, onErrors);*/
	}


	return Class;
};

function addslashes(str) {
	if(_.isString(str)){
		str = str.replace(/"/g,'""');
	}
	return str;
}


/*function deleteModel(onSuccess, onErrors){
	//var sql = 'DELETE FROM '+this.tableName+' WHERE '+this.idField+' = '+this.get(this.idField);
	var sql = 'UPDATE '+this.tableName+' SET to_delete = 1 WHERE '+this.idField+' = '+this.get(this.idField);
	var db = new DbManager({name: 'MediaSalon'}); 
	db.executeQuery(sql, onSuccess, onErrors);
}*/
