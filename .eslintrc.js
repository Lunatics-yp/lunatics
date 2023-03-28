module.exports = {
	parser: '@typescript-eslint/parser',
	plugins: ['@typescript-eslint'],
	extends: [
		'eslint:recommended',
		'plugin:@typescript-eslint/eslint-recommended',
		'plugin:@typescript-eslint/recommended',
	],
	"parserOptions": {
		"ecmaVersion": 11
	},
	env: {
		browser: true,
		es2020: true,
		node: true,
	},
	ignorePatterns: [
		"**/dist/*",
		"/node_modules",
		"/tmp",
		"/server.js"
	],
	"rules": {
		"max-len": [2, 100],
		"max-params": [2, 3],
		"no-unused-vars": 0,
		"@typescript-eslint/no-unused-vars": ["off"], //error
		"@typescript-eslint/no-inferrable-types": ["off"],
		'@typescript-eslint/ban-ts-comment': 1,
		"semi": 1,
		"@typescript-eslint/semi": 1
	}
};
