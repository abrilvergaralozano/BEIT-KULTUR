<script>
	import { onMount } from 'svelte';
	import Photo from '#lib/components/Photo.svelte';
	import { events } from '#lib/data/events.js';

	let { data } = $props();
	let logoElement;
	let backgroundVideo;
	let brandWidth = $state(0);
	let autoplayVideo = $state(false);

	onMount(() => {
		document.body.classList.add('home-background-active');
		const observer = new ResizeObserver(([entry]) => {
			brandWidth = entry.contentRect.width;
		});
		observer.observe(logoElement);

		const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');
		const updateVideoPlayback = () => {
			autoplayVideo = !motionPreference.matches;
			if (motionPreference.matches) {
				backgroundVideo.pause();
			}
		};
		updateVideoPlayback();
		motionPreference.addEventListener('change', updateVideoPlayback);

		return () => {
			observer.disconnect();
			motionPreference.removeEventListener('change', updateVideoPlayback);
			document.body.classList.remove('home-background-active');
		};
	});

	// The three events on the Home page. Sundays at Beit uses a drawing here.
	const find = (slug) => events.find((event) => event.slug === slug);
	const nextEvents = [
		{ ...find('sundays-at-beit-softronic'), image: 'live-performance.jpeg' },
		{ ...find('food-festival'), category: 'Festival' },
		{ ...find('exhibition'), category: 'Exhibition' }
	];

	const latestNews = $derived(data.latestNews);
</script>

<svelte:head>
	<title>Beit Kultur</title>
</svelte:head>

<div class="home-page">
	<div class="page-background" aria-hidden="true">
		<video
			class="background-video"
			bind:this={backgroundVideo}
			autoplay={autoplayVideo}
			muted
			loop
			playsinline
			preload="metadata"
			poster="/images/home-background-poster.jpg"
		>
			<source src="/videos/home-background.mp4" type="video/mp4" />
		</video>
	</div>

<section class="hero">
	<p class="eyebrow">Stockholm · Culture · Community</p>
	<div class="brand" style={brandWidth ? `--brand-width: ${brandWidth}px` : undefined}>
		<h1 class="big-logo" bind:this={logoElement}><span>BEIT</span><span>KULTUR</span></h1>
		<p class="tagline">
			A non-profit cultural association creating space for diverse voices through the arts.
		</p>
	</div>
	<div class="buttons">
		<a href="/donate" class="button">Donate</a>
		<a href="/get-involved" class="button button-second">Get involved</a>
	</div>
	<nav class="hero-index" aria-label="Explore Beit Kultur">
		<a href="#who-we-are">About us</a>
		<a href="#next-events">Events</a>
		<a href="#latest-news">News</a>
	</nav>
</section>

<section class="box who" aria-labelledby="who-we-are">
	<h2 id="who-we-are">Who we are</h2>
	<div class="who-copy">
		<p class="who-lead">A space for diverse voices.</p>
		<p>
			Beit Kultur is a grassroots, non-profit cultural association in Stockholm, run by volunteers.
		</p>
		<p>We create culture together: live sets, poetry, film and visual art.</p>
		<p>Everyone is welcome: artists, audiences of all ages, volunteers and partners.</p>
		<p><strong>This is Beit Kultur.</strong></p>
		<a href="/about" class="link">Read about our mission</a>
	</div>
</section>

<section id="next-events" class="home-section" aria-labelledby="next-events-heading">
	<h2 id="next-events-heading">Next events</h2>
	<ul class="cards">
		{#each nextEvents as event}
			<li class="card">
				<div class="card-image">
					<Photo file={event.image} />
				</div>
				<div class="card-body">
					<p class="muted">{event.day} {event.month} · {event.category}</p>
					<h3>{event.title}</h3>
					<a href="/events/{event.slug}" class="link">
						Read more<span class="visually-hidden"> about {event.title}</span>
					</a>
				</div>
			</li>
		{/each}
	</ul>
	<a href="/events" class="link">See all events</a>
</section>

<section id="latest-news" class="home-section" aria-labelledby="latest-news-heading">
	<h2 id="latest-news-heading">Latest news</h2>
	<ul class="news">
		{#each latestNews as post}
			<li>
				<p class="muted">{post.date}</p>
				<a href="/news/{post.id}">{post.title}</a>
			</li>
		{/each}
	</ul>
	<a href="/news" class="link">All news</a>
</section>
</div>

<style>
	.home-page {
		position: relative;
		isolation: isolate;
	}

	.page-background {
		position: fixed;
		z-index: -1;
		inset: 0;
		overflow: hidden;
		background: var(--bg);
		pointer-events: none;
	}

	.page-background::after {
		position: absolute;
		inset: 0;
		background: rgba(250, 248, 242, 0.62);
		content: '';
	}

	.background-video {
		display: block;
		width: 100%;
		height: 100%;
		object-fit: cover;
	}

	:global(body.home-background-active main) {
		background-image: none;
	}

	:global(body.home-background-active header) {
		background-color: var(--text);
	}

	:global(body.home-background-active footer) {
		position: relative;
		z-index: 1;
		background-color: var(--text);
	}

	section {
		margin-bottom: 4rem;
	}

	.hero {
		padding: 1rem 0 2rem;
		margin-bottom: 2rem;
	}

	.hero-index {
		display: flex;
		flex-wrap: wrap;
		gap: 0.5rem 2rem;
		margin-top: 2rem;
		border-top: 1px solid var(--card-border);
	}

	.hero-index a {
		display: inline-flex;
		align-items: center;
		gap: 0.5rem;
		min-height: 44px;
		text-decoration: none;
	}

	.hero-index a:hover {
		text-decoration: underline;
	}

	.eyebrow {
		margin-bottom: 1rem;
		font-size: 0.875rem;
		font-weight: 800;
		letter-spacing: 0.08em;
		text-transform: uppercase;
	}

	.big-logo {
		display: flex;
		flex-direction: column;
		font-size: clamp(2.8rem, 15vw, 9rem);
		line-height: 0.9;
		margin-bottom: 0.25rem;
		width: max-content;
	}

	.big-logo span:last-child {
		font-style: italic;
	}

	.brand {
		width: var(--brand-width, max-content);
		max-width: 100%;
		margin-bottom: 1.5rem;
	}

	.tagline {
		width: 100%;
		max-width: none;
		font-size: clamp(0.875rem, 2vw, 1.125rem);
		font-weight: 600;
		line-height: 1.4;
		text-align: left;
		margin: 0;
	}

	.buttons {
		display: flex;
		flex-wrap: wrap;
		gap: 1rem;
	}

	.who {
		display: grid;
		grid-template-columns: minmax(12rem, 0.75fr) minmax(0, 1.25fr);
		gap: 1rem clamp(1.5rem, 5vw, 4rem);
		align-items: start;
		background: var(--text);
		color: var(--bg);
	}

	.who h2 {
		grid-column: 1;
		font-size: clamp(2.5rem, 5vw, 4rem);
		font-weight: 800;
	}

	.who-copy {
		grid-column: 2;
		grid-row: 1 / span 2;
	}

	.who-copy p {
		max-width: 58ch;
	}

	.who-copy p:last-of-type {
		margin-bottom: 0.5rem;
	}

	.who-copy .who-lead {
		max-width: 16ch;
		font-size: clamp(1.75rem, 3.5vw, 2.75rem);
		font-weight: 700;
		line-height: 1.15;
	}

	.who .link {
		color: var(--lime);
	}

	.who a:focus-visible {
		outline-color: var(--lime);
	}

	.home-section > h2,
	.who > h2 {
		padding-bottom: 0.75rem;
		border-bottom: 1px solid var(--card-border);
	}

	.link {
		display: inline-flex;
		align-items: center;
		min-height: 44px;
	}

	.cards {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 1.5rem;
		list-style: none;
		margin: 0 0 1.5rem;
		padding: 0;
	}

	.card-body {
		padding: 1.25rem;
	}

	.card-image {
		position: relative;
		overflow: hidden;
		background: var(--text);
	}

	.card-image :global(img),
	.card-image :global(.placeholder) {
		transition: transform 250ms ease;
	}

	.card:hover .card-image :global(img) {
		transform: scale(1.025);
	}

	.card-body p {
		margin-bottom: 0.5rem;
	}

	.card-body .muted {
		font-size: 0.875rem;
		font-weight: 700;
		letter-spacing: 0.04em;
		text-transform: uppercase;
	}

	.card h3 {
		letter-spacing: -0.025em;
	}

	.news {
		list-style: none;
		margin: 0 0 1.5rem;
		padding: 0;
	}

	.news li {
		display: grid;
		grid-template-columns: minmax(8rem, 0.4fr) minmax(0, 1fr);
		align-items: center;
		border-bottom: 1px solid var(--card-border);
		padding: 0.75rem 0;
	}

	.news p {
		margin: 0;
		font-size: 0.875rem;
		font-weight: 700;
		letter-spacing: 0.04em;
		text-transform: uppercase;
	}

	.news a {
		display: inline-flex;
		align-items: center;
		min-height: 44px;
		font-size: 1.25rem;
		font-weight: 800;
	}

	@media (max-width: 800px) {
		.cards {
			grid-template-columns: 1fr;
		}

		.who {
			grid-template-columns: 1fr;
		}

		.who h2,
		.who-copy {
			grid-column: 1;
			grid-row: auto;
		}
	}

	@media (max-width: 600px) {
		.buttons {
			flex-direction: column;
		}

		.hero-index {
			gap: 0.25rem 1rem;
		}

		.news li {
			grid-template-columns: 1fr;
			gap: 0.25rem;
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.card-image :global(img),
		.card-image :global(.placeholder) {
			transition: none;
		}

		.card:hover .card-image :global(img) {
			transform: none;
		}
	}
</style>
