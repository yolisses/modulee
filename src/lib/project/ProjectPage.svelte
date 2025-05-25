<script lang="ts">
	import { enhance } from '$app/forms';
	import ListPageLayout from '$lib/ui/ListPageLayout.svelte';
	import CreateExternalModuleButton from './CreateExternalModuleButton.svelte';
	import DownloadProjectButton from './download/DownloadProjectButton.svelte';
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

<ListPageLayout title="Project">
	<div class="flex flex-col items-stretch gap-2">
		<form class="contents" method="post" use:enhance bind:this={form}>
			<label class="flex flex-col">
				Name
				<input
					type="text"
					onblur={handleBlur}
					value={projectData.name}
					class="rounded border border-white/10 bg-transparent p-2"
				/>
			</label>
			<label class="flex flex-col">
				Description
				<textarea
					onblur={handleBlur}
					value={projectData.description}
					class="rounded border border-white/10 bg-transparent p-2"
				></textarea>
			</label>
			<div>
				Type
				<div class="flex flex-row gap-2" onblur={handleBlur}>
					<label>
						<input
							id="effect"
							type="radio"
							name="moduleType"
							checked={projectData.moduleType === 'effect'}
						/>
						Effect
					</label>
					<label>
						<input
							type="radio"
							id="instrument"
							name="moduleType"
							checked={projectData.moduleType === 'instrument'}
						/>
						Instrument
					</label>
					<label>
						<input
							type="radio"
							id="utility"
							name="moduleType"
							checked={projectData.moduleType === 'utility'}
						/>
						Utility
					</label>
				</div>
			</div>
		</form>
		<div class="flex flex-col">
			<DownloadProjectButton {projectData} />
			<CreateExternalModuleButton {projectData} />
		</div>
	</div>
</ListPageLayout>
