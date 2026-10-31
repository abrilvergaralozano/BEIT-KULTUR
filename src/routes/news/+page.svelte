<script>
	import Photo from '#lib/components/Photo.svelte';
	import { posts } from '#lib/data/news.js';

	let searchText = $state('');
	let query = $state('');

	let shown = $derived(
		posts.filter((post) =>
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

<!-- Logged in volunteers will see a "+ Add post" button here instead -->
<p>Volunteer? <a href="/login" class="link">Log in to add a post</a></p>

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
