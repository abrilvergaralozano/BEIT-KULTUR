<script>
	import { onMount } from 'svelte';
	import Photo from '#lib/components/Photo.svelte';
	import { events } from '#lib/data/events.js';

	let { data } = $props();
	let backgroundVideo;
	let autoplayVideo = $state(false);

	const filters = ['All', 'Music', 'Poetry', 'Film', 'Festivals', 'Exhibitions'];
	let filter = $state('All');

	let shown = $derived(
		filter === 'All' ? events : events.filter((event) => event.category === filter)
	);

	onMount(() => {
		document.body.classList.add('page-background-active');
		const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');
		const updateVideoPlayback = () => {
			autoplayVideo = !motionPreference.matches;
			if (motionPreference.matches) {
				backgroundVideo.pause();
			} else {
				backgroundVideo.play().catch((error) => {
					if (error?.name === 'AbortError') return;
					console.error('Unable to play the Events background video.', error);
				});
			}
		};

		updateVideoPlayback();
		motionPreference.addEventListener('change', updateVideoPlayback);

		return () => {
			motionPreference.removeEventListener('change', updateVideoPlayback);
			document.body.classList.remove('page-background-active');
			backgroundVideo.pause();
		};
	});
</script>

<svelte:head>
	<title>Events – Beit Kultur</title>
</svelte:head>

<div class="events-page">
	<div class="page-background" aria-hidden="true">
		<video
			class="background-video"
			bind:this={backgroundVideo}
			autoplay={autoplayVideo}
			muted
			loop
			playsinline
			preload="metadata"
			poster="/images/events-background-poster.jpg"
		>
			<source src="/videos/events-background.mp4" type="video/mp4" />
		</video>
	</div>

<h1>Events</h1>
<p class="intro">
	Music, poetry, film, festivals and exhibitions by artists from the global majority.
</p>

<section class="box weather" aria-labelledby="weather-title">
	<h2 id="weather-title">Weather today in Stockholm</h2>
	{#if data.temperature !== null}
		<p class="temperature">{data.temperature} °C</p>
	{:else}
		<p>The weather is not available right now.</p>
	{/if}
	<p class="muted">Forecast from SMHI</p>
</section>

<section class="section" aria-label="Filter events">
	<div class="filters">
		{#each filters as name}
			<button
				type="button"
				class="button button-second"
				aria-pressed={filter === name}
				onclick={() => (filter = name)}>{name}</button
			>
		{/each}
	</div>

	<p aria-live="polite" class="count">
		{shown.length === 0
			? 'No events of this type right now.'
			: `Showing ${shown.length} ${shown.length === 1 ? 'event' : 'events'}`}
	</p>

	<ul class="events">
		{#each shown as event (event.slug)}
			<li class="card event">
				<p class="date"><span>{event.day}</span> <span>{event.month}</span></p>
				<div class="image"><Photo file={event.image} /></div>
				<div class="card-body">
					<span class="tag">{event.category}</span>
					<h2>{event.title}</h2>
					<p class="muted">{event.time} · {event.place} · {event.price}</p>
					<a href="/events/{event.slug}" class="link">
						Read more<span class="visually-hidden"> about {event.title}</span>
					</a>
				</div>
			</li>
		{/each}
	</ul>
</section>
</div>

<style>
	.events-page {
		position: relative;
		isolation: isolate;
	}

	.page-background {
		position: fixed;
		z-index: -1;
		inset: 0;
		width: 100vw;
		height: 100vh;
		overflow: hidden;
		background: var(--bg);
		pointer-events: none;
	}

	.page-background::after {
		position: absolute;
		inset: 0;
		background: rgba(250, 248, 242, 0.72);
		content: '';
	}

	.background-video {
		position: fixed;
		inset: 0;
		display: block;
		width: 100vw;
		height: 100vh;
		object-fit: cover;
	}

	.weather {
		max-width: 28rem;
		margin-inline: auto;
	}

	.weather h2 {
		font-size: 1.25rem;
	}

	.temperature {
		font-size: 3rem;
		font-weight: 900;
		line-height: 1;
	}

	.weather .muted {
		margin: 0;
	}

	.filters {
		display: flex;
		flex-wrap: wrap;
		gap: 0.75rem;
	}

	.filters .button {
		padding: 0.25rem 0.4rem 0.25rem 1.25rem;
	}

	.filters .button[aria-pressed='true'] {
		border-width: 3px;
	}

	.count {
		font-weight: 600;
		margin: 1.5rem 0;
	}

	.events {
		display: flex;
		flex-direction: column;
		gap: 1.5rem;
		list-style: none;
		margin: 0;
		padding: 0;
	}

	.event {
		display: grid;
		grid-template-columns: 6rem 16rem 1fr;
		align-items: stretch;
	}

	.date {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		margin: 0;
		background: var(--box);
		font-weight: 900;
		font-size: 1.25rem;
		line-height: 1.2;
	}

	.image :global(img),
	.image :global(.placeholder) {
		height: 100%;
	}

	h2 {
		font-size: 1.375rem;
		margin: 0.75rem 0 0.5rem;
	}

	.card-body .muted {
		margin-bottom: 0.25rem;
	}

	@media (max-width: 800px) {
		.event {
			grid-template-columns: 1fr;
		}

		.date {
			flex-direction: row;
			gap: 0.5rem;
			justify-content: flex-start;
			padding: 0.75rem 1.25rem;
		}
	}
</style>
