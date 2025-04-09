<script lang="ts">
	import HomePageLayout from '$lib/home/HomePageLayout.svelte';
	import EditUserButton from './EditUserButton.svelte';
	import LogoutButton from './LogoutButton.svelte';
	import type { UserData } from './UserData';
	import { getUserDataContext } from './userDataContext';

	interface Props {
		userData: UserData;
	}

	const { userData }: Props = $props();
	const userDataContext = getUserDataContext();
</script>

<HomePageLayout title={userData.name}>
	{#snippet topChildren()}
		{#if userData.id === userDataContext.userData?.id}
			<LogoutButton />
			<EditUserButton />
		{/if}
	{/snippet}
	{#if userData.bio}
		<div>
			<div>Bio</div>
			<p>{userData.bio}</p>
		</div>
	{/if}
</HomePageLayout>
