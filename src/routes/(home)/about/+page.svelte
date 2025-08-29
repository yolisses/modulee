<script>
	import AboutPage from '$lib/about/AboutPage.svelte';
	import { getRequiredContext } from '$lib/global/getRequiredContext';
	import { homeNavbarSelectionContextKey } from '$lib/home/homeNavbarSelectionContext';

	getRequiredContext(homeNavbarSelectionContextKey).homeNavbarSelection = 'about';
</script>

<AboutPage />
