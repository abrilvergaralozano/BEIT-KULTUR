import { defineEnvVars } from '@sveltejs/kit/env';

export const variables = defineEnvVars({
	DATABASE_URL: {
		description: 'Private Neon PostgreSQL connection string.',
		schema: (value) => value || undefined
	},
	GEMINI_API_KEY: {
		description: 'Private Google Gemini API key for the volunteer post-summary helper.',
		schema: (value) => value || undefined
	},
	VOLUNTEER_USERNAME: {
		description: 'Username used for volunteer sign-in.',
		schema: (value) => value || undefined
	},
	VOLUNTEER_PASSWORD: {
		description: 'Password used for volunteer sign-in.',
		schema: (value) => value || undefined
	},
	ADMIN_USERNAME: {
		description: 'Initial admin username used to bootstrap the first admin account.',
		schema: (value) => value || undefined
	},
	ADMIN_PASSWORD: {
		description: 'Initial admin password used to bootstrap the first admin account.',
		schema: (value) => value || undefined
	},
	SESSION_SECRET: {
		description: 'Random secret used to sign volunteer session cookies.',
		schema: (value) => {
			if (!value) return undefined;
			if (value.length < 32) throw new Error('SESSION_SECRET must contain at least 32 characters.');
			return value;
		}
	}
});
