<script lang="ts">
	import { setContext } from 'svelte';
	import DevComponent from './DevComponent.svelte';

	const devValue = { foo: 5 };

	setContext('devValue', devValue);
</script>

<DevComponent />
