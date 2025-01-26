<script lang="ts">
	import { faMagnifyingGlassMinus } from '@fortawesome/free-solid-svg-icons';
	import Fa from 'svelte-fa';

	let { zoom = $bindable() }: { zoom: number } = $props();

	function handleClick() {
		zoom -= 1;
	}
</script>

<button class="common-button" onclick={handleClick}>
	<Fa icon={faMagnifyingGlassMinus} />
</button>
