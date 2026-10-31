import { error, fail } from '@sveltejs/kit';
import { createComment, getComments, getPostById } from '#lib/server/posts.js';
import { isDatabaseConfigured } from '#lib/server/db.js';

export async function load({ params }) {
	const post = await getPostById(params.id);
	if (!post) error(404, 'We could not find this post.');

	return {
		post,
		comments: await getComments(post.id),
		databaseConfigured: isDatabaseConfigured()
	};
}

export const actions = {
	comment: async ({ request, params }) => {
		if (!isDatabaseConfigured()) {
			return fail(503, { commentError: 'Set DATABASE_URL to save comments to Neon.' });
		}
		if (!await getPostById(params.id)) {
			return fail(404, { commentError: 'We could not find this post.' });
		}

		const formData = await request.formData();
		const name = String(formData.get('name') ?? '').trim();
		const text = String(formData.get('text') ?? '').trim();

		if (!name || !text) {
			return fail(400, { commentError: 'Add your name and a comment before posting.' });
		}

		if (name.length > 80 || text.length > 2000) {
			return fail(400, { commentError: 'Your name or comment is too long.' });
		}

		await createComment({ postId: params.id, name, text });
		return { commentSuccess: true };
	}
};
