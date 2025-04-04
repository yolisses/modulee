<script lang="ts">
	import { faDoorOpen } from '@fortawesome/free-solid-svg-icons';
	import Fa from 'svelte-fa';
</script>

<form action="/api/logOut" method="POST">
	<button class="common-button">
		<Fa icon={faDoorOpen} />
		Log out
	</button>
</form>
