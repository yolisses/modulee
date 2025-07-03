<script>
	import { getRequiredContext } from '$lib/global/getRequiredContext';
	import { dev2ContextKey } from './dev2Context';

	const dev2Context = getRequiredContext(dev2ContextKey);
</script>

<div>
	dev2 component
	{dev2Context.dev2}
</div>
