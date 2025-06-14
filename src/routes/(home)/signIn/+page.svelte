<script>
	import { getHomeNavbarSelectionContext } from '$lib/home/homeNavbarSelectionContext';
	import SignInPage from '$lib/user/SignInPage.svelte';

	getHomeNavbarSelectionContext().homeNavbarSelection = 'user';
</script>

<SignInPage />
