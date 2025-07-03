<script>
	import SignInPage from '$lib/user/SignInPage.svelte';

	getRequiredContext(homeNavbarSelectionContextKey).homeNavbarSelection = 'user';
</script>

<SignInPage />
