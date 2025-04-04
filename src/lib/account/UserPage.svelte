<script lang="ts">
	import HomePageLayout from '$lib/ui/HomePageLayout.svelte';
	import type { UserData } from './UserData';

	interface Props {
		userData: UserData;
	}

	const { userData }: Props = $props();
</script>

<HomePageLayout title={userData.name}></HomePageLayout>
