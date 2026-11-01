<script>
	import { onMount } from 'svelte';
	import Photo from '#lib/components/Photo.svelte';
	import { projects } from '#lib/data/projects.js';

	let backgroundVideo;
	let autoplayVideo = $state(false);

	onMount(() => {
		const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');
		const updateVideoPlayback = () => {
			autoplayVideo = !motionPreference.matches;
			if (motionPreference.matches) {
				backgroundVideo.pause();
			} else {
				backgroundVideo.play().catch((error) => {
					if (error?.name === 'AbortError') return;
					console.error('Unable to play the Projects background video.', error);
				});
			}
		};
		updateVideoPlayback();
		motionPreference.addEventListener('change', updateVideoPlayback);

		return () => {
			motionPreference.removeEventListener('change', updateVideoPlayback);
			backgroundVideo.pause();
		};
	});
</script>

<svelte:head>
	<title>Projects – Beit Kultur</title>
</svelte:head>

<div class="projects-page">
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
			<source src="/videos/projects-background.mp4" type="video/mp4" />
		</video>
	</div>

	<h1>Our projects</h1>
	<p class="intro">
		Projects that give artists from the global majority space to show their work in music, poetry
		and film.
	</p>

	<ul class="grid projects">
		{#each projects as project}
			<li class="card">
				<Photo file={project.image} />
				<div class="card-body">
					<p class="muted">{project.year} · {project.artForm}</p>
					<h2>{project.title}</h2>
					<p>{project.description}</p>
				</div>
			</li>
		{/each}
	</ul>

	<p class="end">
		Want to support a project? <a href="/get-involved" class="link">Get involved</a>
	</p>
</div>

<style>
	.projects-page {
		position: relative;
		isolation: isolate;
	}

	.page-background {
		position: absolute;
		z-index: -1;
		inset: 0 auto 0 calc(-1 * var(--gutter));
		width: calc(100% + 2 * var(--gutter));
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
		display: block;
		width: 100%;
		height: 100%;
		object-fit: cover;
	}

	.projects {
		margin-top: 2rem;
	}

	h2 {
		font-size: 1.375rem;
	}

	.muted {
		margin-bottom: 0.5rem;
	}

	.end {
		margin-top: 3rem;
		font-size: 1.25rem;
	}
</style>
