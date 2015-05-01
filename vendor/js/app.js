window.$ = jQuery;
var moment = require('moment');
var backbone = require('backbone');
backbone.$ = jQuery;

var Vue = require('./vue');

var app = new Vue({});


console.log($);
console.log(jQuery('body').validate());
console.log(moment().format('DD/MM/YYYY'));
console.log(backbone.$('body').validate());

var tata = require('../../lib/models/ModuleModel');

var toto = new tata();

//app.forTest();

//$('#test').tooltip('toggle');