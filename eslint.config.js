import js from '@eslint/js';
import svelteParser from 'svelte-eslint-parser';
import svelte from 'eslint-plugin-svelte';
import prettier from 'eslint-config-prettier';
import globals from 'globals';
import jsdoc from 'eslint-plugin-jsdoc';

/** @type {import('eslint').Linter.FlatConfig[]} */
export default [
	js.configs.recommended,
	jsdoc.configs['flat/recommended'],
	...svelte.configs['flat/recommended'],
	prettier,
	...svelte.configs['flat/prettier'],
	{
		files: ['**/*.svelte.js', '*.svelte.js'],
		languageOptions: {
			parser: svelteParser
		}
	},
	{
		languageOptions: {
			globals: {
				...globals.browser,
				...globals.node
			}
		}
	},
	{
		ignores: ['build/', '.svelte-kit/', 'dist/']
	}
];
