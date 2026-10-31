<script>
	import { page } from '$app/state';
	import Photo from '#lib/components/Photo.svelte';

	const values = [
		{
			title: 'Community',
			text: 'We bring people of all ages together through culture.',
			image: 'drawing-street-dance.jpg'
		},
		{
			title: 'Collaboration',
			text: 'We connect artists, cultural associations and galleries to make projects together.',
			image: 'drawing-hanging-art.jpg'
		},
		{
			title: 'Inclusion',
			text: 'We make space for artists who are often left out of mainstream art spaces.',
			image: 'drawing-gallery.jpg'
		}
	];

	// The ?topic= in the link picks the right option, like /about?topic=member#contact
	const topics = [
		{ value: 'volunteer', label: 'I want to volunteer' },
		{ value: 'artist', label: 'I am an artist' },
		{ value: 'member', label: 'I want to become a member' },
		{ value: 'association', label: 'My association or gallery' },
		{ value: 'other', label: 'Something else' }
	];

	let topic = $state(page.url.searchParams.get('topic') ?? 'volunteer');
	let sent = $state(false);

	// Test mode: the message is not sent anywhere yet.
	function handleSubmit(event) {
		event.preventDefault();
		sent = true;
	}
</script>

<svelte:head>
	<title>About – Beit Kultur</title>
</svelte:head>

<h1>About Beit Kultur</h1>

<div class="mission">
	<section class="box">
		<h2>Our mission</h2>
		<p>
			With an intersectional approach, we open spaces for artists from the global majority and
			queer artists to share their work.
		</p>
		<p>
			We believe art can break down borders, bring people together and create dialogue, while
			building community.
		</p>
		<p>We work with artists, associations and galleries to make projects together.</p>
		<p>Want to be part of it? <a href="/get-involved">Get involved</a></p>
	</section>

	<section class="box">
		<h2>Our aim</h2>
		<p>Mainstream art spaces mostly cater to white artists.</p>
		<p>We want to change the lack of representation for artists from the global majority.</p>
		<p>We are a grassroots movement, and everyone at Beit Kultur is a volunteer.</p>
	</section>
</div>

<section class="section">
	<h2>Our values</h2>
	<ul class="grid">
		{#each values as value}
			<li class="card">
				<Photo file={value.image} />
				<div class="card-body">
					<h3>{value.title}</h3>
					<p>{value.text}</p>
				</div>
			</li>
		{/each}
	</ul>
</section>

<section class="section">
	<h2>Questions</h2>
	<div class="questions">
		<details>
			<summary>Who can show their work at Beit Kultur?</summary>
			<p>Artists from the global majority (BIPOC), in music, poetry, film and other art forms.</p>
		</details>
		<details>
			<summary>Who runs Beit Kultur?</summary>
			<p>Volunteers. We are a grassroots movement.</p>
		</details>
		<details>
			<summary>How can I help?</summary>
			<p>
				You can volunteer, become a member or donate. See <a href="/get-involved">Get involved</a>.
			</p>
		</details>
		<details>
			<summary>Can my association or gallery work with you?</summary>
			<p>
				Yes. We want to work with other cultural associations. Send us a message
				<a href="#contact">below</a>.
			</p>
		</details>
	</div>
</section>

<section class="section contact" id="contact">
	<div>
		<h2>Contact us</h2>

		{#if sent}
			<p class="notice" role="status">
				Thank you for your message. Test mode: messages are not sent yet.
			</p>
		{:else}
			<form onsubmit={handleSubmit}>
				<label for="name">Name (required)</label>
				<input id="name" name="name" type="text" autocomplete="name" required />

				<label for="email">Email (required)</label>
				<input id="email" name="email" type="email" autocomplete="email" required />

				<label for="topic">What is it about?</label>
				<select id="topic" name="topic" bind:value={topic}>
					{#each topics as option}
						<option value={option.value}>{option.label}</option>
					{/each}
				</select>

				<label for="message">Message (required)</label>
				<textarea id="message" name="message" required></textarea>

				<button type="submit" class="button">Send message</button>
			</form>
		{/if}
	</div>

	<div class="box details">
		<h3>Other ways to reach us</h3>
		<dl>
			<dt>Email</dt>
			<dd>[EMAIL ADDRESS]</dd>
			<dt>Address</dt>
			<dd>[ADDRESS]</dd>
			<dt>Instagram</dt>
			<dd>[INSTAGRAM]</dd>
		</dl>
	</div>
</section>

<style>
	.mission {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 1.5rem;
	}

	.mission p:last-child {
		margin-bottom: 0;
	}

	.questions {
		max-width: 48rem;
	}

	details {
		border-bottom: 1px solid var(--card-border);
	}

	summary {
		display: flex;
		align-items: center;
		min-height: 44px;
		padding: 0.75rem 0;
		font-weight: 800;
		font-size: 1.25rem;
		cursor: pointer;
	}

	details p {
		margin-bottom: 1rem;
	}

	.contact {
		display: grid;
		grid-template-columns: 2fr 1fr;
		gap: 3rem;
		align-items: start;
	}

	dt {
		font-weight: 800;
	}

	dd {
		margin: 0 0 1rem;
	}

	@media (max-width: 800px) {
		.mission,
		.contact {
			grid-template-columns: 1fr;
		}
	}
</style>
