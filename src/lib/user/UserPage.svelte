<script lang="ts">
	import type { ExternalModuleData } from '$lib/module/externalModule/ExternalModuleData';
	import ExternalModuleItem from '$lib/module/externalModule/ExternalModuleItem.svelte';
	import InfiniteList from '$lib/module/externalModule/InfiniteList.svelte';
	import { Loader } from '$lib/module/externalModule/Loader.svelte';
	import ListPageLayout from '$lib/ui/ListPageLayout.svelte';
	import EditUserButton from './EditUserButton.svelte';
	import GuestUserWarn from './GuestUserWarn.svelte';
	import LogoutButton from './LogoutButton.svelte';
	import type { UserData } from './UserData';
	import { getUserDataContext } from './userDataContext';

	interface Props {
		userData: UserData;
	}

	const { userData }: Props = $props();
	const userDataContext = getUserDataContext();
	const isCurrentUser = $derived(userData.id === userDataContext.userData?.id);

	function getPath(loader: Loader<ExternalModuleData>) {
		const queryParams = new URLSearchParams();
		queryParams.append('userId', userData.id);
		queryParams.append('sort', 'createdAt');
		if (loader.cursor) queryParams.append('cursor', loader.cursor);
		const path = `/api/externalModules?${queryParams.toString()}`;
		return path;
	}
	const loader = new Loader(getPath);
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
		<h2 class="font-semibold">External modules</h2>
		<InfiniteList {loader}>
			{#snippet children(externalModuleData: ExternalModuleData)}
				<ExternalModuleItem {externalModuleData} />
			{/snippet}
		</InfiniteList>
	</div>
</ListPageLayout>
