import { fail } from '@sveltejs/kit';
import { createContactMessage } from '#lib/server/contact-messages.js';
import { isDatabaseConfigured } from '#lib/server/db.js';

function isHttpUrl(value) {
	if (!value) return true;

	try {
		const url = new URL(value);
		return url.protocol === 'https:' || url.protocol === 'http:';
	} catch {
		return false;
	}
}

export const actions = {
	default: async ({ request }) => {
		const formData = await request.formData();
		const values = {
			name: String(formData.get('name') ?? '').trim(),
			email: String(formData.get('email') ?? '').trim(),
			about: String(formData.get('about') ?? '').trim(),
			motivation: String(formData.get('motivation') ?? '').trim(),
			practice: String(formData.get('practice') ?? '').trim(),
			instagram: String(formData.get('instagram') ?? '').trim(),
			portfolio: String(formData.get('portfolio') ?? '').trim()
		};

		if (!values.name || !values.email || !values.about || !values.motivation || !values.practice) {
			return fail(400, { error: 'Please complete all required fields.', values });
		}
		if (
			values.name.length > 120 ||
			values.email.length > 254 ||
			values.about.length > 400 ||
			values.motivation.length > 500 ||
			values.practice.length > 500 ||
			values.instagram.length > 200 ||
			values.portfolio.length > 200
		) {
			return fail(400, { error: 'One or more answers are too long. Please shorten them.', values });
		}
		if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
			return fail(400, { error: 'Please enter a valid email address.', values });
		}
		if (!isHttpUrl(values.instagram) || !isHttpUrl(values.portfolio)) {
			return fail(400, {
				error: 'Instagram and portfolio links must start with http:// or https://.',
				values
			});
		}
		if (!isDatabaseConfigured()) {
			return fail(503, {
				error: 'Your message cannot be saved right now. Please try again later.',
				values
			});
		}

		const body = [
			`About the artist: ${values.about}`,
			`Why I am interested in Beit Kultur: ${values.motivation}`,
			`What I work with: ${values.practice}`,
			`Instagram: ${values.instagram || 'Not provided'}`,
			`Portfolio: ${values.portfolio || 'Not provided'}`
		].join('\n\n');

		await createContactMessage({
			name: values.name,
			email: values.email,
			topic: 'artist',
			body
		});

		return { success: true };
	}
};
