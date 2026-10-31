import { getPosts } from '#lib/server/posts.js';

export function load() {
	return { latestNews: getPosts().slice(0, 3) };
}
