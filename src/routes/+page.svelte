<script>
	import Photo from '#lib/components/Photo.svelte';
	import { events } from '#lib/data/events.js';

	// The three events on the Home page. Sundays at Beit uses a drawing here.
	const find = (slug) => events.find((event) => event.slug === slug);
	const nextEvents = [
		{ ...find('sundays-at-beit-softronic'), image: 'drawing-stage.jpg' },
		{ ...find('food-festival'), category: 'Festival' },
		{ ...find('exhibition'), category: 'Exhibition' }
	];

	// Placeholder until the posts come from the database
	const latestNews = [
		{ id: 1, date: '[DATE]', title: '[POST TITLE]' },
		{ id: 2, date: '[DATE]', title: '[POST TITLE]' },
		{ id: 3, date: '[DATE]', title: '[POST TITLE]' }
	];
</script>

<svelte:head>
	<title>Beit Kultur</title>
</svelte:head>

<section class="hero">
	<h1 class="big-logo"><span>BEIT</span><span>KULTUR</span></h1>
	<p class="tagline">A non-profit community that makes culture</p>
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
		We create culture from the grassroots, embracing intersectionality and opening spaces for
		artists from the global majority.
	</p>
	<p>
		We believe in art as a powerful channel that breaks down borders, brings people together and
		creates dialogue, while building community.
	</p>
	<p><strong>This is what Beit Kultur is.</strong></p>
	<a href="/about" class="link">Read more about us</a>
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
		font-size: clamp(4rem, 15vw, 9rem);
		line-height: 0.9;
		margin-bottom: 1.5rem;
	}

	.big-logo span:last-child {
		font-style: italic;
	}

	.tagline {
		font-size: 1.5rem;
		font-weight: 600;
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
