<script lang="ts">
	import { getContext } from 'svelte';

	const devValue = getContext('devValue');
</script>

<div>
	{devValue.foo}
</div>
