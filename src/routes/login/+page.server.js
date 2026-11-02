import { fail, redirect } from '@sveltejs/kit';
import {
	authenticateUser,
	getSessionUser,
	isAuthConfigured,
	startUserSession
} from '#lib/server/auth.js';

export async function load({ cookies }) {
	const user = await getSessionUser(cookies);
	if (user) redirect(303, user.role === 'admin' ? '/admin' : '/news');
	return { isConfigured: isAuthConfigured() };
}

export const actions = {
	default: async ({ request, cookies, url }) => {
		if (!isAuthConfigured()) {
			return fail(503, { error: 'Login is not ready. Follow the setup steps in README.md.' });
		}

		const formData = await request.formData();
		const username = String(formData.get('username') ?? '');
		const password = String(formData.get('password') ?? '');

		const user = await authenticateUser(username, password);
		if (!user) {
			return fail(401, { error: 'The username or password is wrong. Please try again.' });
		}

		startUserSession(cookies, user, url.protocol === 'https:');
		redirect(303, user.role === 'admin' ? '/admin' : '/news');
	}
};
