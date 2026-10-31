<script>
	import Photo from '#lib/components/Photo.svelte';

	let { data } = $props();
	let event = $derived(data.event);
</script>

<svelte:head>
	<title>{event.title} – Beit Kultur</title>
</svelte:head>

<a href="/events" class="link">← Back to all events</a>

<article>
	<div class="photo"><Photo file={event.image} ratio="16 / 9" /></div>

	<span class="tag">{event.category}</span>
	<h1>{event.title}</h1>

	<dl class="details">
		<div>
			<dt>Date</dt>
			<dd>{event.day} {event.month}</dd>
		</div>
		<div>
			<dt>Time</dt>
			<dd>{event.time}</dd>
		</div>
		<div>
			<dt>Place</dt>
			<dd>[ADDRESS], Stockholm</dd>
		</div>
		<div>
			<dt>Price</dt>
			<dd>{event.price}</dd>
		</div>
	</dl>

	<section class="section">
		<h2>About the event</h2>
		<p>[ABOUT THE EVENT AND THE ARTIST]</p>
	</section>

	<section class="section box">
		<h2>Access information</h2>
		<dl class="access">
			<dt>Entrance</dt>
			<dd>[STEP-FREE OR STAIRS]</dd>
			<dt>Toilets</dt>
			<dd>[ACCESSIBLE TOILET YES / NO]</dd>
			<dt>Sound and light</dt>
			<dd>[LOUD MUSIC, FLASHING LIGHTS?]</dd>
			<dt>Quiet space</dt>
			<dd>[YES / NO]</dd>
		</dl>
		<p>Questions about access? <a href="/about#contact" class="link">Contact us</a></p>
	</section>
</article>

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

	h1 {
		margin-top: 0.75rem;
	}

	.details {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: 1rem 2rem;
		margin: 0;
	}

	dt {
		font-weight: 800;
	}

	dd {
		margin: 0;
	}

	.access dd {
		margin-bottom: 1rem;
	}

	.box p:last-child {
		margin-bottom: 0;
	}

	@media (max-width: 600px) {
		.details {
			grid-template-columns: 1fr;
		}
	}
</style>
