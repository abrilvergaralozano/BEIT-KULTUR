<script>
	import { onMount } from 'svelte';
	import Photo from '#lib/components/Photo.svelte';
	import { events } from '#lib/data/events.js';

	let { data } = $props();
	let logoElement;
	let brandWidth = $state(0);

	onMount(() => {
		const observer = new ResizeObserver(([entry]) => {
			brandWidth = entry.contentRect.width;
		});
		observer.observe(logoElement);
		return () => observer.disconnect();
	});

	// The three events on the Home page. Sundays at Beit uses a drawing here.
	const find = (slug) => events.find((event) => event.slug === slug);
	const nextEvents = [
		{ ...find('sundays-at-beit-softronic'), image: 'drawing-stage.jpg' },
		{ ...find('food-festival'), category: 'Festival' },
		{ ...find('exhibition'), category: 'Exhibition' }
	];

	const latestNews = $derived(data.latestNews);
</script>

<svelte:head>
	<title>Beit Kultur</title>
</svelte:head>

<section class="hero">
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
</section>

<div class="big-photo">
	<Photo file="event-crowd.jpg" ratio="16 / 9" />
</div>

<section class="box who" aria-labelledby="who-we-are">
	<h2 id="who-we-are">Who we are</h2>
	<p>
		Beit Kultur is a grassroots, non-profit cultural association in Stockholm, run by volunteers.
	</p>
	<p>We create culture together: live sets, poetry, film and visual art.</p>
	<p>Everyone is welcome: artists, audiences of all ages, volunteers and partners.</p>
	<p><strong>This is Beit Kultur.</strong></p>
	<a href="/about" class="link">Read about our mission</a>
</section>

<section aria-labelledby="next-events">
	<h2 id="next-events">Next events</h2>
	<ul class="cards">
		{#each nextEvents as event}
			<li class="card">
				<Photo file={event.image} />
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

<section aria-labelledby="latest-news">
	<h2 id="latest-news">Latest news</h2>
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

<style>
	section {
		margin-bottom: 4rem;
	}

	.hero {
		padding: 1rem 0 0;
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

	.big-photo {
		border-radius: var(--radius);
		overflow: hidden;
		margin-bottom: 4rem;
	}

	.who p {
		max-width: none;
	}

	.who p:last-of-type {
		margin-bottom: 1.5rem;
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

	.card-body p {
		margin-bottom: 0.5rem;
	}

	.news {
		list-style: none;
		margin: 0 0 1.5rem;
		padding: 0;
	}

	.news li {
		border-bottom: 1px solid var(--card-border);
		padding: 1rem 0;
	}

	.news p {
		margin: 0;
	}

	.news a {
		display: inline-flex;
		align-items: center;
		min-height: 44px;
		font-size: 1.25rem;
		font-weight: 800;
	}

	/* Small screens: everything in one column */
	@media (max-width: 800px) {
		.cards {
			grid-template-columns: 1fr;
		}
	}

	@media (max-width: 600px) {
		.buttons {
			flex-direction: column;
		}
	}
</style>
