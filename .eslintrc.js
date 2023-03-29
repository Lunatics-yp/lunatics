module.exports = {
	parser: '@typescript-eslint/parser',
	plugins: ['@typescript-eslint'],
	extends: [
		'eslint:recommended',
		'plugin:@typescript-eslint/eslint-recommended',
		'plugin:@typescript-eslint/recommended'
	],
	parserOptions: {
		ecmaVersion: 11
	},
	env: {
		browser: true,
		es2020: true,
		node: true
	},
	ignorePatterns: [
		'**/dist/*',
		'/node_modules',
		'/tmp',
		'/server.js'
	],
	rules: {
		'max-len': ['error', 100],
		'max-params': ['error', 3],
		'indent': ['error', 'tab'],
		'no-unused-vars': 'off',
		'@typescript-eslint/no-unused-vars': ['off'], //error
		'@typescript-eslint/no-inferrable-types': ['off'],
		'@typescript-eslint/ban-ts-comment': 'warn',
		'@typescript-eslint/semi': 'error',
		'@typescript-eslint/quotes': ['error', 'single'],
		'@typescript-eslint/comma-dangle': ['error', 'never'],
		'@typescript-eslint/object-curly-spacing': ['error', 'never'],
		'@typescript-eslint/member-delimiter-style': [
			'warn',
			{
				'multiline': {
					'delimiter': 'semi',
					'requireLast': true
				},
				'singleline': {
					'delimiter': 'semi',
					'requireLast': false
				}
			}
		]
	}
};
