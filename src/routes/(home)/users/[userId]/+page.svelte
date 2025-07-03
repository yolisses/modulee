<script lang="ts">
	import { getRequiredContext } from '$lib/global/getRequiredContext';
	import { homeNavbarSelectionContextKey } from '$lib/home/homeNavbarSelectionContext';
	import UserPage from '$lib/user/UserPage.svelte';
	import type { PageData } from './$types';

	interface Props {
		data: PageData;
	}

	const { data }: Props = $props();

	getRequiredContext(homeNavbarSelectionContextKey).homeNavbarSelection = 'user';
</script>

<UserPage userData={data.userData} />
