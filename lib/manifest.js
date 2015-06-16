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
	header: require('../app/tpl/Header-SanSNOM.hbs'),
	structure: require('../app/tpl/model-sansNom.hbs'),
	name: 'sansnom'
}, 
tata: {
	header: require('../app/tpl/Header-tata.hbs'),
	footer: require('../app/tpl/Footer-tata.hbs'),
	nav: require('../app/tpl/NaV-tata.hbs'),
	structure: require('../app/tpl/model-tata.hbs'),
	name: 'tata'
}, 
default: {
	header: require('../app/tpl/Header.hbs'),
	footer: require('../app/tpl/Footer.hbs'),
	nav: require('../app/tpl/Nav.hbs'),
	structure: require('../app/tpl/model.hbs'),
	name: 'default'
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