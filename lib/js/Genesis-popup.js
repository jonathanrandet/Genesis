(function() {
	window.alert = function(msg){
		var popup = require('../tpl_default/alert.hbs');
		var html = popup({msg: msg});
		$('body').append(html);
		$('#Genesis-alert').modal().on('hidden.bs.modal', function (e) {
			$(this).remove();
		});
	};
})();