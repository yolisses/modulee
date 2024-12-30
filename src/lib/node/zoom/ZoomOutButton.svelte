<script lang="ts">
	let { zoom = $bindable() }: { zoom: number } = $props();

	function handleClick() {
		zoom -= 1;
	}
</script>

<button class="common-button" onclick={handleClick}> - </button>
