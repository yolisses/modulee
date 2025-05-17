<script lang="ts">
	import { faHeart } from '@fortawesome/free-solid-svg-icons';
	import Fa from 'svelte-fa';

	let liked = $state(false);

	function handleCLick() {
		liked = !liked;
	}
</script>

<button class="common-button" onclick={handleCLick}>
	<Fa fw icon={faHeart} color={liked ? 'oklch(63.7% 0.237 25.331)' : undefined} />
	{liked ? 'Liked' : 'Like'}
</button>
