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

	type Group = 'created' | 'liked';
	let group = $state<Group>('created');

	function getPath(loader: Loader<ExternalModuleData>) {
		const queryParams = new URLSearchParams();

		if (group === 'created') {
			queryParams.append('userId', userData.id);
			queryParams.append('sort', 'createdAt');
		} else if (group === 'liked') {
			queryParams.append('likedBy', userData.id);
			// TODO sort by likedAt if group is 'liked'
		}

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
		<div class="flex flex-row">
			<button
				class="horizontal-tab"
				onclick={() => {
					group = 'created';
					loader.resetState();
				}}
				class:horizontal-tab-selected={group === 'created'}
			>
				Created
			</button>
			<button
				class="horizontal-tab"
				onclick={() => {
					group = 'liked';
					loader.resetState();
				}}
				class:horizontal-tab-selected={group === 'liked'}
			>
				Liked
			</button>
		</div>
		<hr class="opacity-10" />
		<InfiniteList {loader}>
			{#snippet children(externalModuleData: ExternalModuleData)}
				<ExternalModuleItem {externalModuleData} />
			{/snippet}
		</InfiniteList>
	</div>
</ListPageLayout>
