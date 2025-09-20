<script lang="ts">
	import { faTrash } from '@fortawesome/free-solid-svg-icons';
	import Fa from 'svelte-fa';
</script>

<form action="/externalModules?delete" class="contents" method="post">
	<button class="common-button center-content">
		<Fa icon={faTrash} />
		Delete
	</button>
</form>
