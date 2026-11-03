<script>
	import { onMount } from 'svelte';
	import Photo from '#lib/components/Photo.svelte';

	let backgroundVideo;
	let autoplayVideo = $state(false);

	const ways = [
		{
			title: 'Volunteer',
			text: ['Give your time to help make events and projects happen.', '[WHAT VOLUNTEERS DO]'],
			link: { href: '/volunteer-signup', label: 'Sign up as a volunteer' }
		},
		{
			title: 'Show your work',
			text: [
				'Are you an artist from the global majority?',
				'We want to give your music, poetry or film a stage.'
			],
			link: { href: '/artist-contact', label: 'Contact us as an artist' }
		},
		{
			title: 'Become a member',
			text: ['Support us every month or year.', 'Members get our newsletter.'],
			link: { href: '/members', label: 'See membership' }
		},
		{
			title: 'Donate',
			text: ['Give once.', 'We show you where the money goes.'],
			link: { href: '/donate', label: 'Donate', lime: true }
		}
	];

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
					console.error('Unable to play the Get involved background video.', error);
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
	<title>Get involved – Beit Kultur</title>
</svelte:head>

<div class="get-involved-page">
	<div class="page-background" aria-hidden="true">
		<video
			class="background-video"
			bind:this={backgroundVideo}
			autoplay={autoplayVideo}
			muted
			loop
			playsinline
			preload="metadata"
			poster="/images/projects-background-poster.jpg"
		>
			<source src="/videos/get-involved-background.mp4" type="video/mp4" />
		</video>
	</div>

	<div class="top">
		<div>
			<h1>Get involved</h1>
			<p class="intro">Beit Kultur is run by volunteers.</p>
			<p class="intro">There are four ways you can take part.</p>
		</div>
		<div class="photo"><Photo file="event-crowd.jpg" /></div>
	</div>

	<ol class="ways">
		{#each ways as way}
			<li class="card">
				<div class="card-body">
					<h2>{way.title}</h2>
					{#each way.text as line}
						<p>{line}</p>
					{/each}
					<a
						href={way.link.href}
						class="button"
						class:button-second={!way.link.lime}>{way.link.label}</a
					>
				</div>
			</li>
		{/each}
	</ol>
</div>

<style>
	.get-involved-page {
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

	.top {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 2rem;
		align-items: center;
		margin-bottom: 3rem;
	}

	.photo {
		min-width: 0;
	}

	.intro {
		margin-bottom: 0.5rem;
	}

	.ways {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: 1.5rem;
		list-style: none;
		margin: 0;
		padding: 0;
	}

	.card-body {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		height: 100%;
		padding: 1.75rem;
	}

	h2 {
		font-size: 1.75rem;
	}

	.card-body p {
		margin-bottom: 0.5rem;
	}

	.card-body .button {
		margin-top: auto;
	}

	.card-body p:last-of-type {
		margin-bottom: 1.5rem;
	}

	@media (max-width: 800px) {
		.top,
		.ways {
			grid-template-columns: 1fr;
		}
	}
</style>
