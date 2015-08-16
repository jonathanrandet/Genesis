var testCtrl = require('Controller')('test');

testCtrl.initPage(actionTest);
testCtrl.addAction('action',  comportment);

function actionTest(page, app){
	console.log(app.params);
	console.log(page.name);
	page.setModel('sansnom');
	alert('Bienvenu sur mon site !');
}

function comportment (e, page, app){
	// Ici quelque chose
	console.log('Je suis un champion');
	console.log(app.params);
	console.log(page.name);
}

console.log('Mon controller', testCtrl);
