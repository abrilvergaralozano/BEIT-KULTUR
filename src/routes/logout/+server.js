import { redirect } from '@sveltejs/kit';
import { endVolunteerSession } from '#lib/server/auth.js';

export function POST({ cookies }) {
	endVolunteerSession(cookies);
	redirect(303, '/news');
}
