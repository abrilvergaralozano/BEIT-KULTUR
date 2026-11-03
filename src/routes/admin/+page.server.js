import { error, fail, redirect } from '@sveltejs/kit';
import { getSessionUser } from '#lib/server/auth.js';
import {
	createVolunteerAccount,
	getArtistMessages,
	getVolunteerMessages,
	markArtistMessageReplied,
	updateVolunteerMessageStatus
} from '#lib/server/contact-messages.js';
import { isDatabaseConfigured } from '#lib/server/db.js';

const UUID_PATTERN = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
const USERNAME_PATTERN = /^[a-z0-9][a-z0-9._-]{2,39}$/;

async function requireAdmin(cookies) {
	const user = await getSessionUser(cookies);
	return user?.role === 'admin' ? user : null;
}

export async function load({ cookies }) {
	if (!isDatabaseConfigured()) {
		error(503, 'Connect Neon before opening the admin page.');
	}

	const user = await getSessionUser(cookies);
	if (!user) redirect(303, '/login');
	if (user.role !== 'admin') error(403, 'Only admins can review volunteer requests.');

	const [messages, artistMessages] = await Promise.all([
		getVolunteerMessages(),
		getArtistMessages()
	]);

	return { messages, artistMessages };
}

export const actions = {
	markArtistReplied: async ({ request, cookies }) => {
		if (!await requireAdmin(cookies)) {
			return fail(401, { error: 'Sign in as an admin to update artist inquiries.' });
		}

		const formData = await request.formData();
		const messageId = String(formData.get('messageId') ?? '');
		if (!UUID_PATTERN.test(messageId)) {
			return fail(400, { error: 'Choose a valid artist inquiry.' });
		}

		const updated = await markArtistMessageReplied(messageId);
		if (!updated) {
			return fail(409, { error: 'This inquiry was already marked as replied.' });
		}

		return { success: 'Artist inquiry marked as replied.' };
	},

	approve: async ({ request, cookies }) => {
		if (!await requireAdmin(cookies)) {
			return fail(401, { error: 'Sign in as an admin to review volunteer requests.' });
		}

		const formData = await request.formData();
		const messageId = String(formData.get('messageId') ?? '');
		if (!UUID_PATTERN.test(messageId)) {
			return fail(400, { error: 'Choose a valid volunteer request.' });
		}

		const updated = await updateVolunteerMessageStatus(messageId, 'approved');
		if (!updated) {
			return fail(409, { error: 'This request has already been reviewed.' });
		}

		return { success: 'Request approved. You can now create the volunteer login.' };
	},

	reject: async ({ request, cookies }) => {
		if (!await requireAdmin(cookies)) {
			return fail(401, { error: 'Sign in as an admin to review volunteer requests.' });
		}

		const formData = await request.formData();
		const messageId = String(formData.get('messageId') ?? '');
		if (!UUID_PATTERN.test(messageId)) {
			return fail(400, { error: 'Choose a valid volunteer request.' });
		}

		const updated = await updateVolunteerMessageStatus(messageId, 'rejected');
		if (!updated) {
			return fail(409, { error: 'This request has already been reviewed.' });
		}

		return { success: 'Request rejected.' };
	},

	createVolunteer: async ({ request, cookies }) => {
		if (!await requireAdmin(cookies)) {
			return fail(401, { error: 'Sign in as an admin to create volunteer logins.' });
		}

		const formData = await request.formData();
		const messageId = String(formData.get('messageId') ?? '');
		const username = String(formData.get('username') ?? '').trim().toLowerCase();
		const password = String(formData.get('password') ?? '');

		if (!UUID_PATTERN.test(messageId)) {
			return fail(400, { error: 'Choose a valid volunteer request.' });
		}
		if (!USERNAME_PATTERN.test(username)) {
			return fail(400, {
				error: 'Choose a username with 3–40 letters, numbers, dots, underscores or hyphens.',
				messageId,
				username
			});
		}
		if (password.length < 12 || Buffer.byteLength(password, 'utf8') > 72) {
			return fail(400, {
				error: 'Use a password with at least 12 characters and no more than 72 bytes.',
				messageId,
				username
			});
		}

		const result = await createVolunteerAccount({ messageId, username, password });
		if (!result.created) {
			return fail(409, {
				error:
					result.reason === 'username-taken'
						? 'That username is already in use. Choose another.'
						: 'This request is no longer approved or already has a login.',
				messageId,
				username
			});
		}

		return { success: `Volunteer login created for ${result.username}.` };
	}
};
