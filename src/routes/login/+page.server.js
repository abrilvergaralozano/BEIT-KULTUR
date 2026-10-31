import { fail, redirect } from '@sveltejs/kit';
import {
	isAuthConfigured,
	isVolunteer,
	startVolunteerSession,
	verifyCredentials
} from '#lib/server/auth.js';

export function load({ cookies }) {
	if (isVolunteer(cookies)) redirect(303, '/news');
	return { isConfigured: isAuthConfigured() };
}

export const actions = {
	default: async ({ request, cookies, url }) => {
		if (!isAuthConfigured()) {
			return fail(503, {
				error: 'Volunteer login is not configured. Follow the setup steps in README.md.'
			});
		}

		const formData = await request.formData();
		const username = String(formData.get('username') ?? '');
		const password = String(formData.get('password') ?? '');

		if (!verifyCredentials(username, password)) {
			return fail(401, { error: 'The username or password is wrong. Please try again.' });
		}

		startVolunteerSession(cookies, url.protocol === 'https:');
		redirect(303, '/news');
	}
};
