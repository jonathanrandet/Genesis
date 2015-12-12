var Backbone = require('backbone');
var _ = require('underscore');

var App = require('Genesis');
var DataCollection = require('../collections/DataCollection');


module.exports = Backbone.Model.extend({
  	initialize: initialize,
  	createTable: createTable,
  	//reinitDb: reinitDb,
  	selectQuery: selectQuery,
  	executeQuery: executeQuery
});

function initialize(){
	if(!_.isUndefined(App.params.localDbName)){
		var size = 2000000;
		var version = App.params.localDbVersion || '1.0';

		if( !_.isUndefined(App.params.localDbSize) && parseInt(App.params.localDbSize) > 2000000){
			size = App.params.localDbSize;
		}

		this.base = window.openDatabase(App.params.localDbName, version, App.params.localDbName, size); 

		this.datas = new DataCollection();
		this.lastId = 0;
	}
	else{
		throw new Error('LocalDb : localDbName is missing in the app config file.');
	}
}

function createTable(Sql, Success, Errors){
	
	// Creation de la table
	this.base.transaction(function(tx){
		tx.executeSql(Sql);
	}, function(err){
		console.error(err.message+' Query : '+Sql);
		if(_.isFunction(Errors)){ Errors(); }
	},function(){
		console.info('Ok : '+Sql);
		if(_.isFunction(Success)){ Success(); }
	});
}

/*function reinitDb(Success, Errors){
	var that = this;
	var data = {name: 'MediaSalon'};
	this.base.transaction(function(tx){
		tx.executeSql('DROP TABLE IF EXISTS config');
		tx.executeSql('DROP TABLE IF EXISTS prospect');
		tx.executeSql('DROP TABLE IF EXISTS vendeur');
		tx.executeSql('DROP TABLE IF EXISTS produit');
		tx.executeSql('DROP TABLE IF EXISTS activite');
		tx.executeSql('DROP TABLE IF EXISTS tache');
	}, function(err){
		console.error(err.message);
		if(_.isFunction(Errors)){ Errors(); }
	},function(){
		App.createLocalDb(Success);
	});
}*/

function selectQuery(sqlCode, success, error){
	// Execution de la requete de selection
	var that = this;
	that.lastId = 0;
	var bIsOk = false;
	if(!_.isUndefined(sqlCode) && sqlCode !== ''){
		this.base.transaction(function(tx){
			// Exécution de la requête
			tx.executeSql(sqlCode, [], function(tx, results){
				// Ici on récupère les données de la requête
				_.each(results.rows,function(value, key){
					that.datas.add(results.rows.item(key));
				});
			});
		}, error, success);
	}
	else{
		throw new Error('LocalDb : SqlCode parameter is missing in selectQuery');
	}
	return bIsOk;
}

function executeQuery(sqlCode, success, errors){
	//	Execution de la requête
	var that = this;
	that.lastId = 0;
	var bIsOk = false;
	if(!_.isUndefined(sqlCode) && sqlCode !== ''){
		this.base.transaction(function(tx){
			// Exécution de la requete
			tx.executeSql(sqlCode, [], function(tx, datas){
				if(sqlCode.toLowerCase().indexOf('insert') > -1 && sqlCode.toLowerCase().indexOf('insert') < 2){
					that.lastId = datas.insertId;
				}
				bIsOk = true;
			});

		}, function(err){
			bIsOk = false;
			console.error(err.message+' Query : '+sqlCode);
			if(_.isFunction(errors)){errors(err);}

		}, function(){
			if(_.isFunction(success)){success(that.lastId);}
		});
	}
	else{
		throw new Error('LocalDb : SqlCode parameter is missing in executeQuery');
	}
	return bIsOk;
} 

