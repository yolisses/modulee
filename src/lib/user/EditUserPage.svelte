<script lang="ts">
	import LogoutButton from './LogoutButton.svelte';
	import type { UserData } from './UserData';
	import { getUserDataContext } from './userDataContext';

	interface Props {
		userData: UserData;
	}

	const { userData }: Props = $props();

	const userDataContext = getUserDataContext();
</script>

<h1 class="pl-2 text-xl font-medium">Account</h1>
<label>
	<div>Name</div>
	<input type="text" class="common-input" value={userData.name} />
</label>
<label>
	<div>Bio</div>
	<textarea class="common-input" value={userData.bio}></textarea>
</label>
<LogoutButton />
