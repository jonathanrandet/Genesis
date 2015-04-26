/**
 * Object that contain all descriptions of module. It should have a unique className in project, 
 * fields descriptions, rules of validations...
 * @type {Object}
 */
var config = {
		/**
		 * This is the module name. It is recommended that this name be the same that the module directory name. 
		 * It must be unique.
 		 * @type {String}
		 */
		className: 'Auteur',

		/**
		 * This is the field list of module.
		 * @type {Array}
		 */
		fields: [ 
			{
				/**
				 * The html type of the field.
				 * @type {String}
				 * @Accepted values {text, number, checkbox, radio, date, select, textarea}
				 * @Default value {text}
				 */
				type: '',

				/**
				 * This attribut indicates whether the field is required.
				 * @type {Boolean}
				 * @Default value {false}
				 */
				required: true,

				/**
				 * This attribut indicates whether the field should be visible in the creation and update forms.
				 * @type {Boolean}
				 * @Default value {true}
				 */
				formDisplay: true,

				/**
				 * This attribut indicates whether the field should be visible in the data list.
				 * @type {Boolean}
				 * @Default value {true}
				 */
				listDisplay: true,

				/**
				 * List of CSS classes to add to the field.
				 * @type {Array}
				 */
				classes: ['class1', 'class2'],

				/**
				 * The column name that will be displayed for this field in the data list.
				 * @type {String}
				 * @Default value {html name}
				 */
				displayName : 'DisplayName_001',

				/**
				 * The HTML name of the field. This attribute is required and should be unique by module. 
				 * @type {String}
				 */
				name:'nom',

				/**
				 * List of HTML attributes for the field.
				 * @type {Object}
				 */
				attributes: {
				},

				/**
				 * List of data attributes for the field.
				 * @type {Object}
				 */
				dataAttributes: {
					content:'Mon content' //for data-content
				} 
			}
		],

		/**
		 * The text of the creation form's submit button.
		 * @type {String}
		 * Default value {Add}
		 */
		addSubmitText: 'Ajouter', // Bouton de validation ajouté automatiquement et grisé tant que les champs requis sont pas remplis.

		/**
		 * The text of the update form's submit button.
		 * @type {String}
		 * Default value {Update}
		 */
		editSubmitText: 'Modifier',


		/**
		 * List of search options.
		 * @type {Array}
		 */
		search: [
		],

		/**
		 * Rules of validation forms. Genesis use jquery.validate. http://jqueryvalidation.org/validate
		 * @type {Object}
		 */
		validate: {
		}
};


module.exports = config;
