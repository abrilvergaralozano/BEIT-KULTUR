import { isVolunteer } from '#lib/server/auth.js';

export function load({ cookies }) {
	return { isVolunteer: isVolunteer(cookies) };
}
