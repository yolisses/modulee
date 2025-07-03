<script lang="ts">
	import { getRequiredContext } from '$lib/global/getRequiredContext';
	import { userDataContextKey } from '$lib/user/userDataContext';
	import { faUser } from '@fortawesome/free-solid-svg-icons';
	import Fa from 'svelte-fa';
	import { homeNavbarSelectionContextKey } from './homeNavbarSelectionContext';

	const userDataContext = getRequiredContext(userDataContextKey);
	const homeNavbarSelectionContext = getRequiredContext(homeNavbarSelectionContextKey);
</script>

<a
	data-tab-selected={homeNavbarSelectionContext.homeNavbarSelection === 'user'}
	class="max-md:horizontal-tab md:vertical-tab"
	href={userDataContext.userData && !userDataContext.userData.isGuest
		? '/users/' + userDataContext.userData.id
		: '/signIn'}
>
	<Fa fw icon={faUser} />
	<div class="max-md:hidden">{userDataContext.userData.name}</div>
</a>
