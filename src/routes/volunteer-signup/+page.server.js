import { fail } from '@sveltejs/kit';
import { createContactMessage } from '#lib/server/contact-messages.js';
import { isDatabaseConfigured } from '#lib/server/db.js';

const involvementOptions = [
	'a few hours a month',
	'one day a week',
	'several days a week',
	'flexible, depending on events'
];

export const actions = {
	default: async ({ request }) => {
		const formData = await request.formData();
		const values = {
			name: String(formData.get('name') ?? '').trim(),
			email: String(formData.get('email') ?? '').trim(),
			about: String(formData.get('about') ?? '').trim(),
			motivation: String(formData.get('motivation') ?? '').trim(),
			skills: String(formData.get('skills') ?? '').trim(),
			involvement: String(formData.get('involvement') ?? '')
		};

		if (!values.name || !values.email || !values.about || !values.motivation || !values.skills) {
			return fail(400, { error: 'Please complete all required fields.', values });
		}
		if (
			values.name.length > 120 ||
			values.email.length > 254 ||
			values.about.length > 400 ||
			values.motivation.length > 600 ||
			values.skills.length > 600
		) {
			return fail(400, { error: 'One or more answers are too long. Please shorten them.', values });
		}
		if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
			return fail(400, { error: 'Please enter a valid email address.', values });
		}
		if (!involvementOptions.includes(values.involvement)) {
			return fail(400, { error: 'Please choose how often you would like to help.', values });
		}
		if (!isDatabaseConfigured()) {
			return fail(503, {
				error: 'Sign-ups cannot be saved right now. Please try again later.',
				values
			});
		}

		const body = [
			`About me: ${values.about}`,
			`Why I want to volunteer: ${values.motivation}`,
			`My skills: ${values.skills}`,
			`How often I can help: ${values.involvement}`
		].join('\n\n');

		await createContactMessage({
			name: values.name,
			email: values.email,
			topic: 'volunteer',
			body
		});

		return { success: true };
	}
};
