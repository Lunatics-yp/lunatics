module.exports = {
	parser: '@typescript-eslint/parser',
	plugins: ['@typescript-eslint', 'react'],
	extends: [
		'eslint:recommended',
		'plugin:@typescript-eslint/eslint-recommended',
		'plugin:@typescript-eslint/recommended',
		'plugin:react/recommended',
	],
	parserOptions: {
		ecmaVersion: 11,
		'ecmaFeatures': {
			'jsx': true,
		},
	},
	env: {
		browser: true,
		es2020: true,
		node: true,
	},
	ignorePatterns: [
		'**/dist/*',
		'/node_modules',
		'/tmp',
		'/server.js',
	],
	rules: {
		'max-len': ['error', 100],
		'max-params': ['error', 3],
		'indent': ['error', 'tab', {'SwitchCase': 1}],
		'no-unused-vars': 'warn',
		'no-multiple-empty-lines': [
			'error',
			{'max': 1, 'maxEOF': 0},
		],
		'quotes': ['error', 'single'],
		'@typescript-eslint/no-unused-vars': 'warn',
		'@typescript-eslint/no-inferrable-types': ['off'],
		'@typescript-eslint/ban-ts-comment': 'warn',
		'@typescript-eslint/semi': 'error',
		'@typescript-eslint/quotes': ['error', 'single'],
		'@typescript-eslint/comma-dangle': ['error', 'always-multiline'],
		'@typescript-eslint/object-curly-spacing': ['error', 'never'],
		'@typescript-eslint/member-delimiter-style': [
			'warn',
			{
				'multiline': {
					'delimiter': 'semi',
					'requireLast': true,
				},
				'singleline': {
					'delimiter': 'semi',
					'requireLast': false,
				},
			},
		],
		'react/react-in-jsx-scope': 'off',
		'react/jsx-space-before-closing': ['error', 'never'],
	},
};
