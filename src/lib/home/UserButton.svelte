<script lang="ts">
	import { getUserDataContext } from '$lib/account/userDataContext';
	import { faUser } from '@fortawesome/free-solid-svg-icons';
	import Fa from 'svelte-fa';

	interface Props {
		route: string;
	}

	const { route }: Props = $props();
	const userDataContext = getUserDataContext();
</script>

<a
	class="common-button rounded-none border-white/25"
	href={userDataContext.userData ? '/users/' + userDataContext.userData.id : '/signIn'}
	class:border-l-4={route.startsWith('/(home)/account') || route.startsWith('/(home)/users')}
>
	<Fa fw icon={faUser} />
	{userDataContext.userData ? userDataContext.userData.name : 'Account'}
</a>
