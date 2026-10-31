import { getPosts } from '#lib/server/posts.js';

export async function load() {
	return { latestNews: (await getPosts()).slice(0, 3) };
}
