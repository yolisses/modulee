<script lang="ts">
	import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
	import Fa from 'svelte-fa';

	function handleClick() {
		history.back();
	}
</script>

<button class="common-button" onclick={handleClick} title="Previous page (Alt+←)">
	<Fa icon={faArrowLeft} />
</button>
