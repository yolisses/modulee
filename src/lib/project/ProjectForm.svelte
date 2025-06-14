<script lang="ts">
	import { enhance } from '$app/forms';
	import type { ProjectData } from './ProjectData';

	interface Props {
		projectData: ProjectData;
	}

	let form: HTMLFormElement;
	const { projectData }: Props = $props();

	function handleBlur() {
		form.submit();
	}
</script>

<form class="contents" method="post" use:enhance action="?/patch" bind:this={form}>
	<label class="flex flex-col">
		Name
		<input
			type="text"
			name="name"
			onblur={handleBlur}
			value={projectData.name}
			class="rounded border border-white/10 bg-transparent p-2"
		/>
	</label>
	<div>
		Type
		<div class="flex flex-row gap-2" onchange={handleBlur}>
			<label class="common-button">
				<input
					id="effect"
					type="radio"
					value="effect"
					name="moduleType"
					checked={projectData.moduleType === 'effect'}
				/>
				Effect
			</label>
			<label class="common-button">
				<input
					type="radio"
					id="instrument"
					name="moduleType"
					value="instrument"
					checked={projectData.moduleType === 'instrument'}
				/>
				Instrument
			</label>
			<label class="common-button">
				<input
					type="radio"
					id="utility"
					value="utility"
					name="moduleType"
					checked={projectData.moduleType === 'utility'}
				/>
				Utility
			</label>
		</div>
	</div>
	<label class="flex flex-col">
		Description
		<textarea
			name="description"
			onblur={handleBlur}
			value={projectData.description}
			class="rounded border border-white/10 bg-transparent p-2"
		></textarea>
	</label>
</form>
