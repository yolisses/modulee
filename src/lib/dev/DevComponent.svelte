<script>
	import { getRequiredContext } from '$lib/global/getRequiredContext';
	import { devContextKey } from './devContext';

	const devContext = getRequiredContext(devContextKey);
</script>

<div>
	dev component
	{devContext.dev}
</div>
