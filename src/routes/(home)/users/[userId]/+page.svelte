<script lang="ts">
	import { getHomeNavbarSelectionContext } from '$lib/home/homeNavbarSelectionContext';
	import UserPage from '$lib/user/UserPage.svelte';
	import type { PageData } from './$types';

	interface Props {
		data: PageData;
	}

	const { data }: Props = $props();

	getHomeNavbarSelectionContext().homeNavbarSelection = 'user';
</script>

<UserPage userData={data.userData} />
