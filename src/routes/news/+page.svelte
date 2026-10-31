<script>
	import Photo from '#lib/components/Photo.svelte';

	let { data, form } = $props();
	let draftTitle = $state('');
	let draftSummary = $state('');
	let draftText = $state('');
	let aiLoading = $state(false);
	let aiError = $state('');
	let aiStatus = $state('');
	let searchText = $state('');
	let query = $state('');

	let shown = $derived(
		data.posts.filter((post) =>
			(post.title + ' ' + post.summary).toLowerCase().includes(query.trim().toLowerCase())
		)
	);

	function handleSearch(event) {
		event.preventDefault();
		query = searchText;
	}

	async function generateSummary() {
		if (!draftTitle.trim() || !draftText.trim()) {
			aiError = 'Add a title and article before generating a summary.';
			aiStatus = '';
			return;
		}

		aiLoading = true;
		aiError = '';
		aiStatus = '';

		try {
			const response = await fetch('/api/ai/post-summary', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ title: draftTitle, text: draftText })
			});
			const result = await response.json().catch(() => null);

			if (!response.ok) {
				throw new Error(result?.error ?? 'The AI summary could not be generated.');
			}
			if (typeof result?.summary !== 'string' || !result.summary.trim()) {
				throw new Error('The AI service returned an empty summary.');
			}

			draftSummary = result.summary;
			aiStatus = 'Summary drafted. Review and edit it before publishing.';
		} catch (error) {
			aiError = error instanceof Error ? error.message : 'The AI summary could not be generated.';
		} finally {
			aiLoading = false;
		}
	}
</script>

<svelte:head>
	<title>News – Beit Kultur</title>
</svelte:head>

<h1>News</h1>
<p class="intro">
	News from Beit Kultur. Members also get it by email. <a href="/members">Become a member</a>
</p>

{#if !data.databaseConfigured}
	<p class="notice" role="status">
		Sample articles are shown. Connect Neon by setting DATABASE_URL to publish posts and save
		comments.
	</p>
{/if}

{#if data.isVolunteer}
	<section class="box add-post" id="add-post" aria-labelledby="add-post-title">
		<h2 id="add-post-title">Add a post</h2>
		{#if !data.databaseConfigured}
			<p class="notice">Connect Neon to publish posts. You can still draft a summary with AI.</p>
		{/if}
		{#if form?.createError}
			<p class="notice" role="alert">{form.createError}</p>
		{/if}
		<form method="POST" action="?/create">
			<label for="post-title">Title</label>
			<input id="post-title" name="title" maxlength="120" bind:value={draftTitle} required />

			<label for="post-text">Article</label>
			<textarea id="post-text" name="text" rows="8" bind:value={draftText} required></textarea>

			<label for="post-summary">Short summary</label>
			<button
				type="button"
				class="button button-second"
				disabled={!data.aiConfigured || aiLoading}
				aria-describedby="ai-summary-note"
				aria-busy={aiLoading}
				onclick={generateSummary}
			>
				{aiLoading ? 'Generating summary…' : 'Generate summary with AI'}
			</button>
			<p id="ai-summary-note">
				{#if data.aiConfigured}
					Your draft is sent to Gemini. Check the summary before publishing. You can edit it.
				{:else}
					Add a valid GEMINI_API_KEY to .env to enable AI summaries.
				{/if}
			</p>
			<textarea
				id="post-summary"
				name="summary"
				maxlength="280"
				bind:value={draftSummary}
				required
			></textarea>
			{#if aiStatus}
				<p role="status">{aiStatus}</p>
			{/if}
			{#if aiError}
				<p class="notice" role="alert">{aiError}</p>
			{/if}

			<button type="submit" class="button" disabled={!data.databaseConfigured}>Publish post</button>
		</form>
	</section>
{:else}
	<p>Volunteer? <a href="/login" class="link">Log in to add a post</a></p>
{/if}

<form role="search" class="search" onsubmit={handleSearch}>
	<label for="search">Search news</label>
	<div class="search-row">
		<input id="search" type="search" bind:value={searchText} />
		<button type="submit" class="button button-dark">Search</button>
	</div>
</form>

<p aria-live="polite" class="count">
	Showing {shown.length}
	{shown.length === 1 ? 'post' : 'posts'}
</p>

<ul class="posts">
	{#each shown as post (post.id)}
		<li class="card post">
			<Photo file={post.image} />
			<div class="card-body">
				<p class="muted">{post.date} · {post.author}</p>
				<h2><a href="/news/{post.id}">{post.title}</a></h2>
				<p>{post.summary}</p>
			</div>
		</li>
	{/each}
</ul>

<style>
	.search {
		max-width: 36rem;
		margin: 2rem auto 0;
	}

	.add-post {
		margin: 2rem 0;
	}

	.add-post h2 {
		font-size: 1.5rem;
	}

	.add-post textarea {
		max-width: 100%;
	}

	.search-row {
		display: flex;
		gap: 0.75rem;
	}

	.search-row input {
		margin: 0;
	}

	.count {
		font-weight: 600;
		margin: 1.5rem 0;
	}

	.posts {
		display: flex;
		flex-direction: column;
		gap: 1.5rem;
		list-style: none;
		margin: 0;
		padding: 0;
	}

	.post {
		display: grid;
		grid-template-columns: 18rem 1fr;
	}

	.muted {
		margin-bottom: 0.25rem;
	}

	h2 {
		font-size: 1.375rem;
	}

	h2 a {
		display: inline-flex;
		align-items: center;
		min-height: 44px;
	}

	@media (max-width: 700px) {
		.post {
			grid-template-columns: 1fr;
		}

		.search-row {
			flex-direction: column;
		}
	}
</style>
