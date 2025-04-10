<script lang="ts">
	import ListPageLayout from '$lib/ui/ListPageLayout.svelte';
	import { faSave } from '@fortawesome/free-solid-svg-icons';
	import Fa from 'svelte-fa';
	import type { UserData } from './UserData';

	interface Props {
		userData: UserData;
	}

	const { userData }: Props = $props();
</script>

<ListPageLayout title="Profile">
	<form class="flex flex-col gap-2" method="POST">
		<label>
			<div>Name</div>
			<input name="name" type="text" class="common-input w-full" value={userData.name} />
		</label>
		<label>
			<div>Bio</div>
			<textarea name="bio" class="common-input w-full" rows={4} value={userData.bio}></textarea>
		</label>
		<div>
			<button class="primary-button">
				<Fa icon={faSave} />
				Save profile
			</button>
		</div>
	</form>
</ListPageLayout>
