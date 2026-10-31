<script>
	import Photo from '#lib/components/Photo.svelte';

	let { data, form } = $props();
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

{#if data.isVolunteer && data.databaseConfigured}
	<section class="box add-post" id="add-post" aria-labelledby="add-post-title">
		<h2 id="add-post-title">Add a post</h2>
		{#if form?.createError}
			<p class="notice" role="alert">{form.createError}</p>
		{/if}
		<form method="POST" action="?/create">
			<label for="post-title">Title</label>
			<input id="post-title" name="title" maxlength="120" required />

			<label for="post-summary">Short summary</label>
			<textarea id="post-summary" name="summary" maxlength="280" required></textarea>

			<label for="post-text">Article</label>
			<textarea id="post-text" name="text" rows="8" required></textarea>

			<button type="submit" class="button">Publish post</button>
		</form>
	</section>
{:else if data.isVolunteer}
	<p class="notice">Connect Neon to publish new posts.</p>
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
		margin-top: 2rem;
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
