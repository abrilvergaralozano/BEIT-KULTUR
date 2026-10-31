<script>
	// An image from static/images/ with its alt text.
	// If the file is missing, it shows a grey box instead of a broken image.
	import { altText } from '#lib/data/images.js';

	let { file, ratio = '4 / 3' } = $props();

	let missing = $state(!file);
</script>

{#if missing}
	<div class="placeholder" style:aspect-ratio={ratio} role="img" aria-label={altText[file] ?? 'Image coming soon'}>
		<span aria-hidden="true">Image coming soon</span>
	</div>
{:else}
	<img
		src="/images/{file}"
		alt={altText[file]}
		style:aspect-ratio={ratio}
		onerror={() => (missing = true)}
	/>
{/if}

<style>
	img,
	.placeholder {
		width: 100%;
		object-fit: cover;
		border-radius: inherit;
	}

	.placeholder {
		display: flex;
		align-items: center;
		justify-content: center;
		background: var(--card-border);
		color: var(--muted);
		font-weight: 600;
	}
</style>
