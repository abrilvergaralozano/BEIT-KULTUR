<script>
	import { onMount } from 'svelte';
	import { projects } from '#lib/data/projects.js';

	let autoplayVideo = $state(false);

	onMount(() => {
		document.body.classList.add('page-background-active');
		const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');
		const projectVideos = document.querySelectorAll('.project-video');
		const updateVideoPlayback = () => {
			autoplayVideo = !motionPreference.matches;
			if (motionPreference.matches) {
				projectVideos.forEach((video) => video.pause());
			} else {
				projectVideos.forEach((video) => {
					video.play().catch((error) => {
						if (error?.name === 'AbortError') return;
						console.error('Unable to autoplay a project video.', error);
					});
				});
			}
		};
		updateVideoPlayback();
		motionPreference.addEventListener('change', updateVideoPlayback);

		return () => {
			motionPreference.removeEventListener('change', updateVideoPlayback);
			document.body.classList.remove('page-background-active');
			projectVideos.forEach((video) => video.pause());
		};
	});
</script>

<svelte:head>
	<title>Projects – Beit Kultur</title>
</svelte:head>

<div class="projects-page">
	<div class="page-background" aria-hidden="true">
		<img class="background-image" src="/images/projects-background-poster.jpg" alt="" />
	</div>

	<h1>Our projects</h1>
	<p class="intro">
		Projects that give artists from the global majority space to show their work in music, poetry
		and film.
	</p>

	<ul class="grid projects">
		{#each projects as project}
			<li class="card">
				<video
					class="project-video"
					autoplay={autoplayVideo}
					controls
					muted
					loop
					playsinline
					preload="none"
					style:aspect-ratio={project.videoRatio}
					poster="/images/{project.poster}"
					aria-label="Video for {project.title}"
				>
					<source src="/videos/projects/{project.video}" type="video/mp4" />
					Your browser does not support video playback.
				</video>
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
		background: rgba(250, 248, 242, 0.5);
		content: '';
	}

	.background-image {
		position: fixed;
		inset: 0;
		display: block;
		width: 100vw;
		height: 100vh;
		object-fit: cover;
		object-position: center;
	}

	.projects {
		margin-top: 2rem;
	}

	.project-video {
		display: block;
		width: 100%;
		background: var(--chrome);
		object-fit: cover;
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
