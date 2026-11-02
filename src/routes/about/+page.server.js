import { fail } from '@sveltejs/kit';
import { contactTopics } from '#lib/data/contact-topics.js';
import { createContactMessage } from '#lib/server/contact-messages.js';
import { isDatabaseConfigured } from '#lib/server/db.js';

export const actions = {
	contact: async ({ request }) => {
		const formData = await request.formData();
		const values = {
			name: String(formData.get('name') ?? '').trim(),
			email: String(formData.get('email') ?? '').trim(),
			topic: String(formData.get('topic') ?? ''),
			message: String(formData.get('message') ?? '').trim()
		};

		if (!values.name || !values.email || !values.message) {
			return fail(400, { contactError: 'Add your name, email and message.', values });
		}
		if (values.name.length > 120 || values.email.length > 254 || values.message.length > 2000) {
			return fail(400, { contactError: 'One or more fields are too long.', values });
		}
		if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
			return fail(400, { contactError: 'Enter a valid email address.', values });
		}
		if (!contactTopics.some((topic) => topic.value === values.topic)) {
			return fail(400, { contactError: 'Choose a topic from the list.', values });
		}
		if (!isDatabaseConfigured()) {
			return fail(503, {
				contactError: 'Contact messages cannot be saved yet. Please try again later.',
				values
			});
		}

		await createContactMessage({
			name: values.name,
			email: values.email,
			topic: values.topic,
			body: values.message
		});

		return { contactSuccess: true };
	}
};
