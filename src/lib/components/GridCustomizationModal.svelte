<script lang="ts">
	import Modal from '$lib/components/Modal.svelte';
	import TextHeader from './TextHeader.svelte';
	import ApplyButton from './ApplyButton.svelte';

	export let show_modal: Boolean;
	export let images_data: { url: string; name: string }[];

	import grid_columns from '$lib/stores/grid_columns';
	import { page } from '$app/stores';
	import { redirect } from '@sveltejs/kit';
	import { goto } from '$app/navigation';
	import Image from './Image.svelte';

</script>

<!-- Grid customization modal -->
<Modal bind:show_modal>
	<div class="h-auto min-h-[40%] w-10/12 mx-auto justify-center items-center p-1">
		<div class="bg-gray-800 rounded-lg shadow-lg px-2 py-4 w-full flex flex-col">
			<!-- Option customization (rows) -->
			<TextHeader title="Customize Grid" description="Select number of columns" />

			<div class="flex flex-row justify-center items-center w-full">
				<div class="flex flex-row justify-center items-center">
					<label for="grid_columns" class="text-white">Columns: </label>
					<input
						name="grid_columns"
						type="number"
						min="3"
						max="10"
						bind:value={$grid_columns}
						class="rounded-lg shadow-md bg-gray-800 text-white mt-3 mx-2 py-5 px-1 max-w-md"
					/>
				</div>
			</div>

			<ApplyButton
				on_click={() => {
					show_modal = false;

					let { id } = $page.params;
					
					// get mode from url. Ex: /[id]/grid
					let mode = $page.url.pathname.split("/").pop();

					if (mode !== "grid") {
						goto(`/${id}/grid`);
					}
				}}
			/>

			<!-- Preview grid -->
			<div class="container h-max w-1/3">
				<div
					class="grid gap-1 w-auto max-h-[80%] overflow-y-scroll"
					style="grid-template-columns: repeat({$grid_columns}, 1fr);"
				>
					{#each images_data as image}
						<div class="w-full md:p-1">
							<div class="container md:p-1 max-h-96 self-center mx-auto my-8">
								<Image image={image} class_name="block h-full w-full rounded-lg object-cover object-center" />
							</div>
							
						</div>
					{/each}
				</div>
			</div>
		</div>
	</div>
</Modal>
