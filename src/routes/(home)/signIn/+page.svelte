<script>
	import { getRequiredContext } from '$lib/global/getRequiredContext';
	import { homeNavbarSelectionContextKey } from '$lib/home/homeNavbarSelectionContext';
	import SignInPage from '$lib/user/SignInPage.svelte';

	getRequiredContext(homeNavbarSelectionContextKey).homeNavbarSelection = 'user';
</script>

<SignInPage />
