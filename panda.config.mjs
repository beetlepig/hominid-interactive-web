import { defineConfig } from '@pandacss/dev';

export default defineConfig({
	// Whether to use css reset
	preflight: true,

	// Where to look for your css declarations
	include: ['./src/**/*.{js,ts,svelte}'],

	// Files to exclude
	exclude: [],

	// Useful for theme customization
	theme: {
		extend: {
			keyframes: {
				fadein: {
					'0%': { opacity: '0' },
					'100%': { opacity: '1' }
				}
			},
			tokens: {
				fonts: {
					raleway: { value: 'var(--font-raleway)' },
					oswald: { value: 'var(--font-oswald)' }
				}
			}
		}
	},

	globalVars: {
		'--font-raleway': 'Raleway Variable, sans-serif',
		'--font-oswald': 'Oswald Variable, sans-serif'
	},

	// The output directory for your css system
	outdir: 'styled-system',

	strictTokens: true,
	strictPropertyValues: true
});
