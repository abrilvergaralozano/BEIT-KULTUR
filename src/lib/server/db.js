import { neon } from '@neondatabase/serverless';
import { DATABASE_URL } from '$app/env/private';

let client;

export function isDatabaseConfigured() {
	return Boolean(DATABASE_URL);
}

export function getSql() {
	if (!DATABASE_URL) {
		throw new Error('DATABASE_URL is not set. Add your Neon connection string to .env.');
	}

	client ??= neon(DATABASE_URL);
	return client;
}
