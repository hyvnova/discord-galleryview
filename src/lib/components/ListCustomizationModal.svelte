<script lang="ts">
	import Modal from '$lib/components/Modal.svelte';
	import TextHeader from './TextHeader.svelte';
	import ApplyButton from './ApplyButton.svelte';

	export let show_modal: Boolean;
	export let images_data: { url: string; name: string }[];

	import image_height from '$lib/stores/image_height';
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import Image from './Image.svelte';
</script>

<Modal bind:show_modal>
	<div class="h-[80%] min-h-[40%] w-10/12 mx-auto justify-center items-center p-1">
		<div class="flex flex-col h-full bg-gray-800 rounded-lg shadow-lg py-4 w-full overflow-y-auto">
			<!-- Option customization (height) -->
			<TextHeader title="Customize List" description="Select images height in ems" />

			<div class="flex flex-row justify-center items-center w-full">
				<div class="flex flex-row justify-center items-center">
					<input
						bind:value={$image_height}
						type="number"
						min="20"
						max="200"
						step="5"
						class="rounded-lg shadow-md bg-gray-800 text-white mt-3 mx-2 py-5 px-1 max-w-md"
					/>
				</div>
			</div>

			<ApplyButton
				on_click={() => {
					show_modal = false;

					let { id } = $page.params;

					// get mode from url. Ex: /[id]/grid
					let mode = $page.url.pathname.split('/').pop();

					if (mode !== 'list') {
						goto(`/${id}/list`);
					}
				}}
			/>

			<!-- Preview list gallery -->
			<div class="container mt-2 shadow-md">
				<div class="flex flex-col justify-center items-center w-10/12 h-full mx-auto">
					{#each images_data as image}
						<div class="container md:p-1 max-h-96 self-center mx-auto my-8">
							<Image {image} style="max-height: {$image_height}vh; max-width: 100%; mx-auto" />
						</div>
					{/each}
				</div>
			</div>
		</div>
	</div>
</Modal>
