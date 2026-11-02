import { redirect } from '@sveltejs/kit';
import { endUserSession } from '#lib/server/auth.js';

export function POST({ cookies }) {
	endUserSession(cookies);
	redirect(303, '/news');
}
