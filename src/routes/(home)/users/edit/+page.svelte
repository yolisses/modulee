<script lang="ts">
	import { getHomeNavbarSelectionContext } from '$lib/home/homeNavbarSelectionContext';
	import EditUserPage from '$lib/user/EditUserPage.svelte';
	import type { PageData } from './$types';

	interface Props {
		data: PageData;
	}

	const { data }: Props = $props();
	getHomeNavbarSelectionContext().homeNavbarSelection = 'user';
</script>

<EditUserPage userData={data.userData} />
