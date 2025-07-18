<script lang="ts">
	import { faTimes } from '@fortawesome/free-solid-svg-icons';
	import Fa from 'svelte-fa';

	function handleClick() {
		window.history.back();
	}
</script>

<button onclick={handleClick} class="common-button">
	<Fa icon={faTimes} />
	Close
</button>
