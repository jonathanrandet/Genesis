module.exports = {
 modules: {
	Auteur: {
	config: require('../modules/Auteur/config'),
	templates: {
		addview: require('../modules/Auteur/tpl/AddTemplate.hbs'),
		editview: require('../modules/Auteur/tpl/EditTemplate.hbs'),
		listview: require('../modules/Auteur/tpl/ListTemplate.hbs'),
		searchview: require('../modules/Auteur/tpl/SearchTemplate.hbs')
	}
}
},
models: {
	sansnom: {
	name: 'sansnom',
	structure: require('../app/tpl/model-sansNom.hbs'),
	header: require('../app/tpl/Header.hbs'),
	footer: require('../app/tpl/Footer.hbs'),
	nav: require('../app/tpl/Nav.hbs')
}, 
tata: {
	name: 'tata',
	structure: require('../app/tpl/model-tata.hbs'),
	header: require('../app/tpl/Header-tata.hbs'),
	footer: require('../app/tpl/Footer-tata.hbs'),
	nav: require('../app/tpl/NaV-tata.hbs')
}, 
default: {
	name: 'default',
	structure: require('../app/tpl/model.hbs'),
	header: require('../app/tpl/Header.hbs'),
	footer: require('../app/tpl/Footer.hbs'),
	nav: require('../app/tpl/Nav.hbs')
},
}, 
pages: {
	accueil: {
	name: 'accueil',
	url: 'accueil',
	template: require('../app/tpl/accueil.hbs')
},
test: {
	name: 'test',
	url: 'test',
	template: require('../app/tpl/test.hbs')
}
} 
};