<script lang="ts">
	import Dev2Component from './Dev2Component.svelte';
	import { setDev2Context } from './dev2Context';
	import DevComponent from './DevComponent.svelte';
	import { setDevContext } from './devContext';

	const devContext = $state({ dev: 1 });
	setDevContext(devContext);

	const dev2Context = $state({ dev2: 2 * devContext.dev });
	setDev2Context(dev2Context);

	$effect(() => {
		dev2Context.dev2 = 2 * devContext.dev;
	});

	function handleClick1() {
		devContext.dev += 1;
	}

	function handleClick2() {
		dev2Context.dev2 += 1;
	}
</script>

<div>
	dev {devContext.dev}
</div>
<div>
	dev2 {dev2Context.dev2}
</div>

<button onclick={handleClick1}> increase dev </button>
<button onclick={handleClick2}> increase dev2 </button>

<DevComponent />
<Dev2Component />
