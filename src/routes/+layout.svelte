<script>
	import favicon from '#lib/assets/favicon.svg';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<nav aria-label="Main menu">
	<ul>
		<li><a href="/">Home</a></li>
		<li><a href="/about">About</a></li>
		<li><a href="/get-involved">Get Involved</a></li>
		<li><a href="/events">Events</a></li>
		<li><a href="/newsletter">Newsletter</a></li>
		<li><a href="/donate">Donate</a></li>
	</ul>
</nav>

{@render children()}

<style>
	ul {
		display: flex;
		flex-wrap: wrap;
		gap: 1rem;
		list-style: none;
		margin: 0 0 2rem;
		padding: 0;
	}
</style>
