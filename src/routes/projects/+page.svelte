<script>
	import Photo from '#lib/components/Photo.svelte';
	import { projects } from '#lib/data/projects.js';
</script>

<svelte:head>
	<title>Projects – Beit Kultur</title>
</svelte:head>

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

<p class="end">Want to support a project? <a href="/get-involved" class="link">Get involved</a></p>

<style>
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
