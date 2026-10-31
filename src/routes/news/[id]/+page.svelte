<script>
	import Photo from '#lib/components/Photo.svelte';

	let { data, form } = $props();
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

	<section class="section comments" aria-labelledby="comments-title">
		<h2 id="comments-title">Comments</h2>
		{#if !data.databaseConfigured}
			<p class="notice">Connect Neon to save and display comments.</p>
		{:else}
			{#if form?.commentSuccess}
				<p class="notice" role="status">Your comment was posted.</p>
			{/if}
			{#if form?.commentError}
				<p class="notice" role="alert">{form.commentError}</p>
			{/if}

			<ul class="comment-list">
				{#each data.comments as comment (comment.id)}
					<li>
						<p class="muted">{comment.name} · {comment.date}</p>
						<p>{comment.text}</p>
					</li>
				{:else}
					<li>No comments yet. Be the first to comment.</li>
				{/each}
			</ul>

			<form method="POST" action="?/comment">
				<label for="comment-name">Your name</label>
				<input id="comment-name" name="name" maxlength="80" autocomplete="name" required />

				<label for="comment-text">Comment</label>
				<textarea id="comment-text" name="text" maxlength="2000" required></textarea>

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

	.photo {
		border-radius: var(--radius);
		overflow: hidden;
		margin-bottom: 1.5rem;
	}

	.comment-list {
		list-style: none;
		margin: 0 0 2rem;
		padding: 0;
	}

	.comment-list li {
		border-bottom: 1px solid var(--card-border);
		padding: 1rem 0;
	}

	.comment-list p {
		margin: 0;
	}

	.back-bottom {
		margin-top: 3rem;
	}
</style>
