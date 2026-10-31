import { error } from '@sveltejs/kit';
import { posts } from '#lib/data/news.js';

export function load({ params }) {
	const post = posts.find((post) => String(post.id) === params.id);
	if (!post) error(404, 'We could not find this post.');
	return { post };
}
