<script lang="ts">
	import Modal from '$lib/components/Modal.svelte';
	import TextHeader from './TextHeader.svelte';
	import ApplyButton from './ApplyButton.svelte';
	import { browser } from '$app/environment';

	// @ts-ignore
	import Carousel from 'svelte-carousel';
	let carousel;

	export let show_modal: Boolean;
	export let images_data: { url: string; name: string }[];

	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import Image from './Image.svelte';

	import carousel_particles from '$lib/stores/carousel_particles';
</script>

<Modal bind:show_modal>
	<div class="h-[80%] min-h-[40%] w-10/12 mx-auto justify-center items-center p-1">
		<div class="flex flex-col h-full bg-gray-800 rounded-lg shadow-lg py-4 w-full overflow-y-auto">
			<!-- Option customization (height) -->
			<TextHeader
				title="Customize Carousel"
				description="Select number of images to show at once"
			/>

			<div class="flex flex-row justify-center items-center w-full">
				<div class="flex flex-row justify-center items-center">
					<input
						bind:value={$carousel_particles}
						type="number"
						min="1"
						max="7"
						step="1"
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

					if (mode !== 'carousel') {
						goto(`/${id}/carousel`);
					}
				}}
			/>

			<!-- Preview carousel -->
			{#key $carousel_particles}
				{#if browser}
					<Carousel bind:this={carousel} particlesToShow={$carousel_particles}>
						{#each images_data as image}
							<!-- Images should be completely visible within the screen without scrolling while mantaining aspect ratio -->
							<div class="container mx-auto w-auto max-h-[80vh]">
								<Image {image} style="max-height: 80vh; max-width: 100%; object-fit: contain;" />
							</div>
						{/each}
					</Carousel>
				{/if}
			{/key}
		</div>
	</div>
</Modal>
