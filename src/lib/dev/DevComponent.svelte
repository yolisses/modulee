<script>
	import { getDevContext } from './devContext';

	const devContext = getDevContext();

	$inspect(devContext.dev);
</script>

<div>
	dev component
	{devContext.dev}
</div>
