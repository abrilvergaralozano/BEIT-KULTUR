import { fail, redirect } from '@sveltejs/kit';
import { createPost, getPosts } from '#lib/server/posts.js';
import { isVolunteer } from '#lib/server/auth.js';
import { isDatabaseConfigured } from '#lib/server/db.js';
import { isAiConfigured } from '#lib/server/ai.js';

export async function load({ cookies }) {
	return {
		posts: await getPosts(),
		isVolunteer: await isVolunteer(cookies),
		databaseConfigured: isDatabaseConfigured(),
		aiConfigured: isAiConfigured()
	};
}

export const actions = {
	create: async ({ request, cookies }) => {
		if (!await isVolunteer(cookies)) {
			return fail(401, { createError: 'Your volunteer session has ended. Please sign in again.' });
		}
		if (!isDatabaseConfigured()) {
			return fail(503, { createError: 'Set DATABASE_URL to publish posts to Neon.' });
		}

		const formData = await request.formData();
		const title = String(formData.get('title') ?? '').trim();
		const summary = String(formData.get('summary') ?? '').trim();
		const text = String(formData.get('text') ?? '').trim();

		if (!title || !summary || !text) {
			return fail(400, { createError: 'Add a title, short summary and article before publishing.' });
		}

		if (title.length > 120 || summary.length > 280 || text.length > 10000) {
			return fail(400, { createError: 'The title, summary or article is too long.' });
		}

		const post = await createPost({ title, summary, text });
		redirect(303, `/news/${post.id}`);
	}
};
