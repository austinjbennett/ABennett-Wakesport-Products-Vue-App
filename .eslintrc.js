module.exports = {
	root: true,
	env: {
		node: true,
	},
	extends: ['plugin:vue/essential', '@vue/airbnb'],
	parserOptions: {
		parser: 'babel-eslint',
	},
	rules: {
		'no-console': [1, { allow: ['error'] }],
		'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
		'arrow-body-style': [0, 'as-needed'],
		indent: [2, 'tab', { SwitchCase: 1 }],
		'no-tabs': [1, { allowIndentationTabs: true }],
		'space-before-function-paren': 2,
		'no-underscore-dangle': 1,
		'no-new': 1,
		'max-len': [1, { code: 200, tabWidth: 1 }],
		'no-param-reassign': [1, { props: false }],
	},
	plugins: ['graphql'],
};
