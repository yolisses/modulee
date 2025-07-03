<script lang="ts">
	import { getRequiredContext } from '$lib/global/getRequiredContext';
	import { homeNavbarSelectionContextKey } from '$lib/home/homeNavbarSelectionContext';
	import EditUserPage from '$lib/user/EditUserPage.svelte';
	import type { PageData } from './$types';

	interface Props {
		data: PageData;
	}

	const { data }: Props = $props();
	getRequiredContext(homeNavbarSelectionContextKey).homeNavbarSelection = 'user';
</script>

<EditUserPage userData={data.userData} />
