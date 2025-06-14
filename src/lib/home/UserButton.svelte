<script lang="ts">
	import { getUserDataContext } from '$lib/user/userDataContext';
	import { faUser } from '@fortawesome/free-solid-svg-icons';
	import Fa from 'svelte-fa';

	interface Props {
		route: string;
	}

	const { route }: Props = $props();
	const userDataContext = getUserDataContext();
	const isSelected = $derived(
		route.startsWith('/(home)/account') ||
			route.startsWith('/(home)/users') ||
			route.startsWith('/(home)/signIn'),
	);
</script>

<a
	data-tab-selected={isSelected}
	class="max-md:horizontal-tab md:vertical-tab"
	href={userDataContext.userData && !userDataContext.userData.isGuest
		? '/users/' + userDataContext.userData.id
		: '/signIn'}
>
	<Fa fw icon={faUser} />
	<div class="hidden md:flex">{userDataContext.userData.name}</div>
</a>
