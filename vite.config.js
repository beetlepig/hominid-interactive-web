import { paraglideVitePlugin } from '@inlang/paraglide-js';
import { sveltekit } from '@sveltejs/kit/vite';
import { threeMinifier } from '@yushijinhun/three-minifier-rollup';
import Icons from 'unplugin-icons/vite';
import { defineConfig } from 'vite';
import devtoolsJson from 'vite-plugin-devtools-json';

export default defineConfig({
	plugins: [
		{ ...threeMinifier(), enforce: 'pre' },
		sveltekit(),
		devtoolsJson(),
		Icons({
			compiler: 'svelte'
		}),
		paraglideVitePlugin({
			project: './project.inlang',
			outdir: './src/lib/paraglide'
		})
	],
	server: {
		fs: {
			allow: ['styled-system']
		}
	}
});
