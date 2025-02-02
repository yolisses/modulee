<script lang="ts">
	import { greet } from 'modulee-engine-wasm';

	function handleClick() {
		greet();
	}
</script>

<button class="common-button" onclick={handleClick}> Greet </button>
