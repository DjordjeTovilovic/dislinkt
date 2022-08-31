module.exports = {
	'env': {
		'browser': true,
		'es2021': true
	},
	'extends': [
		'eslint:recommended',
		'plugin:react/recommended'
	],
	'overrides': [
	],
	'parserOptions': {
		'ecmaVersion': 'latest',
		'sourceType': 'module'
	},
	settings: {
    react: {
      version: 'detect',
    },
  },
	'plugins': [
		'react'
	],
	'rules': {
		'react/react-in-jsx-scope': 'off',
		"react/no-unescaped-entities": "off",
		"react/prop-types": 'off',
		"no-unused-vars": "off",
	}
}
