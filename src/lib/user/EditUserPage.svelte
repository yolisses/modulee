<script lang="ts">
	import HomePageLayout from '$lib/home/HomePageLayout.svelte';
	import { faSave } from '@fortawesome/free-solid-svg-icons';
	import Fa from 'svelte-fa';
	import type { UserData } from './UserData';

	interface Props {
		userData: UserData;
	}

	const { userData }: Props = $props();
</script>

<HomePageLayout title="Profile">
	<div class="flex flex-col gap-2">
		<label>
			<div>Name</div>
			<input type="text" class="common-input w-full" value={userData.name} />
		</label>
		<label>
			<div>Bio</div>
			<textarea class="common-input w-full" rows={4} value={userData.bio}></textarea>
		</label>
		<div>
			<button class="primary-button">
				<Fa icon={faSave} />
				Save profile
			</button>
		</div>
	</div>
</HomePageLayout>
