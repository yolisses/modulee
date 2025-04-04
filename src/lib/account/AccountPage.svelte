<script lang="ts">
	import LogoutButton from './LogoutButton.svelte';
	import { getUserDataContext } from './userDataContext';

	const userDataContext = getUserDataContext();
</script>

<h1 class="pl-2 text-xl font-medium">Account</h1>
<label>
	<div>Name</div>
	<input type="text" class="common-input" value={userDataContext.userData.name} />
</label>
<label>
	<div>Bio</div>
	<textarea class="common-input" value={userDataContext.userData.bio}></textarea>
</label>
<LogoutButton />
