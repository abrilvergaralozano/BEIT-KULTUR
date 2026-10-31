<script>
	import Photo from '#lib/components/Photo.svelte';

	let { data } = $props();
	let post = $derived(data.post);
</script>

<svelte:head>
	<title>{post.title} – Beit Kultur</title>
</svelte:head>

<a href="/news" class="link">← Back to all news</a>

<article>
	<p class="muted">{post.date} · {post.author}</p>
	<h1>{post.title}</h1>
	<p class="intro">{post.summary}</p>

	<div class="photo"><Photo file={post.image} ratio="16 / 9" /></div>

	{#each post.text as paragraph}
		<p>{paragraph}</p>
	{/each}
</article>

<a href="/news" class="link back-bottom">← Back to all news</a>

<style>
	article {
		max-width: 48rem;
		margin-top: 1.5rem;
	}

	.photo {
		border-radius: var(--radius);
		overflow: hidden;
		margin-bottom: 1.5rem;
	}

	.back-bottom {
		margin-top: 3rem;
	}
</style>
