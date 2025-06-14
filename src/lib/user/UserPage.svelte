<script lang="ts">
	import ListPageLayout from '$lib/ui/ListPageLayout.svelte';
	import EditUserButton from './EditUserButton.svelte';
	import GuestUserWarn from './GuestUserWarn.svelte';
	import LogoutButton from './LogoutButton.svelte';
	import UserContent from './UserContent.svelte';
	import type { UserData } from './UserData';
	import { getUserDataContext } from './userDataContext';

	interface Props {
		userData: UserData;
	}

	const { userData }: Props = $props();
	const userDataContext = getUserDataContext();
	const isCurrentUser = $derived(userData.id === userDataContext.userData?.id);
</script>

<ListPageLayout title={userData.name}>
	{#snippet topChildren()}
		{#if isCurrentUser}
			{#if !userData.isGuest}
				<LogoutButton />
			{/if}
			<EditUserButton />
		{/if}
	{/snippet}
	<div>
		{userData.username}
	</div>
	{#if userData.bio}
		<p>{userData.bio}</p>
	{/if}
	{#if isCurrentUser && userData.isGuest}
		<GuestUserWarn />
	{/if}
	<div>
		<UserContent userId={userData.id} />
	</div>
</ListPageLayout>
