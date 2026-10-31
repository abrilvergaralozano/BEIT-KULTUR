<script>
	import '#lib/styles/global.css';
	import favicon from '#lib/assets/favicon.svg';
	import Header from '#lib/components/Header.svelte';
	import Footer from '#lib/components/Footer.svelte';

	let { children, data } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<a href="#main" class="skip-link">Skip to main content</a>

<Header isVolunteer={data.isVolunteer} />

<main id="main" tabindex="-1">
	{@render children()}
</main>

<Footer />
