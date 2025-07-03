<script lang="ts">
	import UserPage from '$lib/user/UserPage.svelte';
	import type { PageData } from './$types';

	interface Props {
		data: PageData;
	}

	const { data }: Props = $props();

	getRequiredContext(homeNavbarSelectionContextKey).homeNavbarSelection = 'user';
</script>

<UserPage userData={data.userData} />
