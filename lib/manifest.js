module.exports = {
Auteur: {
	config: require('../modules/Auteur/config'),
	templates: {
		addview: require('../modules/Auteur/tpl/AddTemplate.hbs'),
		editview: require('../modules/Auteur/tpl/EditTemplate.hbs'),
		listview: require('../modules/Auteur/tpl/ListTemplate.hbs'),
		searchview: require('../modules/Auteur/tpl/SearchTemplate.hbs')
	}
}
};