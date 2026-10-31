import { error } from '@sveltejs/kit';
import { getPostById } from '#lib/server/posts.js';

export function load({ params }) {
	const post = getPostById(params.id);
	if (!post) error(404, 'We could not find this post.');
	return { post };
}
