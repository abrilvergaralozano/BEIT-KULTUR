<script>
	import Photo from '#lib/components/Photo.svelte';

	let { data } = $props();
	let post = $derived(data.post);

	// Placeholder until comments are saved in Neon
	const comments = [{ name: '[NAME]', date: '[DATE]', text: '[COMMENT]' }];

	let sent = $state(false);

	// Test mode: the comment is not saved yet.
	function handleSubmit(event) {
		event.preventDefault();
		sent = true;
	}
</script>

<svelte:head>
	<title>{post.title} – Beit Kultur</title>
</svelte:head>

<a href="/news" class="link">← Back to all news</a>

<article>
	<p class="muted">{post.date} · {post.author}</p>
	<h1>{post.title}</h1>

	<section class="box summary" aria-label="Summary">
		<span class="tag">Summary · made with AI</span>
		<p>{post.aiSummary}</p>
	</section>

	<div class="photo"><Photo file={post.image} ratio="16 / 9" /></div>

	{#each post.text as paragraph}
		<p>{paragraph}</p>
	{/each}

	<section class="section">
		<h2>Comments</h2>
		<ul class="comments">
			{#each comments as comment}
				<li>
					<p class="muted">{comment.name} · {comment.date}</p>
					<p>{comment.text}</p>
				</li>
			{/each}
		</ul>

		{#if sent}
			<p class="notice" role="status">Thank you. Test mode: comments are not saved yet.</p>
		{:else}
			<form onsubmit={handleSubmit}>
				<label for="comment-name">Your name</label>
				<input id="comment-name" type="text" autocomplete="name" required />

				<label for="comment-text">Comment</label>
				<textarea id="comment-text" required></textarea>

				<button type="submit" class="button">Post comment</button>
			</form>
		{/if}
	</section>
</article>

<a href="/news" class="link back-bottom">← Back to all news</a>

<style>
	article {
		max-width: 48rem;
		margin-top: 1.5rem;
	}

	.summary {
		margin-bottom: 2rem;
	}

	.summary p {
		margin: 0.75rem 0 0;
	}

	.photo {
		border-radius: var(--radius);
		overflow: hidden;
		margin-bottom: 1.5rem;
	}

	.comments {
		list-style: none;
		margin: 0 0 2rem;
		padding: 0;
	}

	.comments li {
		border-bottom: 1px solid var(--card-border);
		padding: 1rem 0;
	}

	.comments p {
		margin: 0;
	}

	.back-bottom {
		margin-top: 3rem;
	}
</style>
