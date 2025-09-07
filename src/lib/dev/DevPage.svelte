<script>
	function handleClick() {
		console.log('here');
	}
</script>

<div class="h-[300px] w-[300px] overflow-auto border">
	<div class="h-[600px] w-[600px] touch-pan-x touch-pan-y">
		<button onclick={handleClick}>click me</button>
	</div>
</div>
