<script>
	import { onMount } from 'svelte';
	import { page } from '$app/state';
	import Photo from '#lib/components/Photo.svelte';
	import { contactTopics } from '#lib/data/contact-topics.js';

	let { form } = $props();
	let backgroundVideo;
	let autoplayVideo = $state(false);

	onMount(() => {
		document.body.classList.add('page-background-active');
		const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');
		const updateVideoPlayback = () => {
			autoplayVideo = !motionPreference.matches;
			if (motionPreference.matches) {
				backgroundVideo.pause();
			} else {
				backgroundVideo.play().catch((error) => {
					console.error('Unable to play the About background video.', error);
				});
			}
		};

		updateVideoPlayback();
		motionPreference.addEventListener('change', updateVideoPlayback);

		return () => {
			motionPreference.removeEventListener('change', updateVideoPlayback);
			document.body.classList.remove('page-background-active');
		};
	});

	const values = [
		{
			title: 'Community',
			text: 'We bring people of all ages together through culture.',
			image: 'event-crowd.jpg'
		},
		{
			title: 'Collaboration',
			text: 'We connect artists, cultural associations and galleries to make projects together.',
			image: 'live-performance.jpeg'
		},
		{
			title: 'Inclusion',
			text: 'We make space for artists who are often left out of mainstream art spaces.',
			image: 'beit-kultur-main.jpeg'
		}
	];

	// The ?topic= in the link picks the right option, like /about?topic=member#contact
	const selectedTopic = $derived(
		form?.values?.topic ?? page.url.searchParams.get('topic') ?? 'volunteer'
	);
</script>

<svelte:head>
	<title>About – Beit Kultur</title>
</svelte:head>

<div class="about-page">
	<div class="page-background" aria-hidden="true">
		<video
			class="background-video"
			bind:this={backgroundVideo}
			autoplay={autoplayVideo}
			muted
			loop
			playsinline
			preload="metadata"
			poster="/images/about-background-poster.jpg"
		>
			<source src="/videos/about-background.mp4" type="video/mp4" />
		</video>
	</div>

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

		{#if form?.contactSuccess}
			<p class="notice" role="status">Thank you. Your message has been saved for our team.</p>
		{/if}
		{#if form?.contactError}
			<p class="notice notice-error" role="alert">
				<span aria-hidden="true">!</span>
				{form.contactError}
			</p>
		{/if}

		<form method="POST" action="?/contact">
			<label for="name">Name (required)</label>
			<input
				id="name"
				name="name"
				type="text"
				autocomplete="name"
				maxlength="120"
				value={form?.values?.name ?? ''}
				required
			/>

			<label for="email">Email (required)</label>
			<input
				id="email"
				name="email"
				type="email"
				autocomplete="email"
				maxlength="254"
				value={form?.values?.email ?? ''}
				required
			/>

			<label for="topic">What is it about?</label>
			<select id="topic" name="topic" value={selectedTopic}>
				{#each contactTopics as option}
					<option value={option.value}>{option.label}</option>
				{/each}
			</select>

			<label for="message">Message (required)</label>
			<textarea
				id="message"
				name="message"
				maxlength="2000"
				required
			>{form?.values?.message ?? ''}</textarea>

			<button type="submit" class="button">Send message</button>
		</form>
	</div>

	<div class="box details">
		<h3>Other ways to reach us</h3>
		<dl>
			<dt>Email</dt>
			<dd><a href="mailto:beitkultur@gmail.com">beitkultur@gmail.com</a></dd>
			<dt>Instagram</dt>
			<dd><a href="https://www.instagram.com/beitkultur/">@beitkultur</a></dd>
		</dl>
	</div>
</section>
</div>

<style>
	.about-page {
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
		background: rgba(250, 248, 242, 0.62);
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
		margin-inline: auto;
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

	.notice-error {
		display: flex;
		gap: 0.5rem;
		align-items: flex-start;
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
