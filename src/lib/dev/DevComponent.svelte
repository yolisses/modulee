<script lang="ts">
	import { getContext } from 'svelte';

	const devValue: any = getContext('devValue');
</script>

<div>
	{devValue.foo}
</div>
