<script>
	import Photo from '#lib/components/Photo.svelte';

	// Only real photos from our events
	const photos = [
		{ file: 'sundays-at-beit.jpg', caption: 'Sundays at Beit: Softronic live set · [YEAR]' },
		{ file: 'event-crowd.jpg', caption: '[CAPTION · EVENT · YEAR]' }
	];
</script>

<svelte:head>
	<title>Gallery – Beit Kultur</title>
</svelte:head>

<h1>Gallery</h1>
<p class="intro">Photos from our events.</p>
<p class="intro">More photos are coming soon.</p>

<ul class="photos">
	{#each photos as photo}
		<li>
			<figure>
				<div class="photo"><Photo file={photo.file} /></div>
				<figcaption>{photo.caption}</figcaption>
			</figure>
		</li>
	{/each}
</ul>

<style>
	.photos {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: 2rem;
		list-style: none;
		margin: 2rem 0 0;
		padding: 0;
	}

	figure {
		margin: 0;
	}

	.photo {
		border-radius: var(--radius);
		overflow: hidden;
	}

	figcaption {
		margin-top: 0.75rem;
		font-weight: 600;
	}

	@media (max-width: 700px) {
		.photos {
			grid-template-columns: 1fr;
		}
	}
</style>
