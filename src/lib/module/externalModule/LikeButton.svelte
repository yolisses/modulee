<script lang="ts">
	import { faHeart } from '@fortawesome/free-solid-svg-icons';
	import Fa from 'svelte-fa';

	let isActive = $state(false);

	function handleCLick() {
		isActive = !isActive;
	}
</script>

<button class="common-button" onclick={handleCLick}>
	<Fa fw icon={faHeart} color={isActive ? 'oklch(63.7% 0.237 25.331)' : undefined} />
	{isActive ? 'Liked' : 'Like'}
</button>
