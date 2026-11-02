import { getSessionUser } from '#lib/server/auth.js';

export async function load({ cookies }) {
	const user = await getSessionUser(cookies);
	return {
		isVolunteer: user?.role === 'volunteer',
		isAdmin: user?.role === 'admin'
	};
}
