<script lang="ts">
	import Fa from 'svelte-fa';
	import {
		faCog,
		faHome,
		faBars,
		faTableCellsLarge,
		faHorse
	} from '@fortawesome/free-solid-svg-icons';

	import Modal from '$lib/components/Modal.svelte';
	import ModeOption from '$lib/components/ModeOption.svelte';
	import TextHeader from '$lib/components/TextHeader.svelte';
	import ListCustomizationModal from '$lib/components/ListCustomizationModal.svelte';
	import type { LayoutServerData } from './$types';
	import GridCustomizationModal from '$lib/components/GridCustomizationModal.svelte';
	import CarouselCustomizationModal from '$lib/components/CarouselCustomizationModal.svelte';

	let open_modals = {
		gallery_mode: false,
		grid_customization: false,
		list_customization: false,
		carousel_customization: false
	};

	export let data: LayoutServerData;
	let { channel_name, images_data } = data;
</script>

<!-- Gallery mode modal: Change view mode -->
<Modal bind:show_modal={open_modals.gallery_mode}>
	<div class="h-auto w-10/12 mx-auto justify-center items-center p-1">
		<div class="bg-gray-800 rounded-lg shadow-lg px-4 py-8 w-full">
			<TextHeader title="Gallery Mode" description="Select a display mode to view the gallery" />

			<!--Option container (Max 3 Option per container )-->
			<div class="flex flex-row justify-center items-center mt-4 w-full">
				<!-- List mode  -->
				<ModeOption
					name="List"
					icon={faBars}
					on_click={() => {
						open_modals.gallery_mode = false;
						open_modals.list_customization = true;
					}}
				/>

				<!-- Grid mode -->
				<ModeOption
					name="Grid"
					icon={faTableCellsLarge}
					on_click={() => {
						open_modals.gallery_mode = false;
						open_modals.grid_customization = true;
					}}
				/>

				<!-- Carousel mode -->
				<ModeOption
					name="Carousel"
					icon={faHorse}
					on_click={() => (
						open_modals.gallery_mode = false,
						open_modals.carousel_customization = true
					)}
				/>
			</div>
		</div>
	</div>
</Modal>

<ListCustomizationModal bind:show_modal={open_modals.list_customization} {images_data} />

<GridCustomizationModal bind:show_modal={open_modals.grid_customization} {images_data} />

<CarouselCustomizationModal bind:show_modal={open_modals.carousel_customization} {images_data} />



<!-- Nav -->
<nav class="flex flex-row justify-between items-center p-2 mt-2 mb-4 mx-2">
	<!-- Go home -->
	<div class="flex flex-row justify-center items-center">
		<a href="/" class="ml-1 bg-indigo-800 border-indigo-800 border-2 rounded-lg hover:scale-110 transition duration-300 ease-in-out">
			<Fa icon={faHome} class="text-white text-md font-bold" />
		</a>
	</div>

	<!-- Channel name -->
	<div class="flex flex-row justify-center items-center ">
		<p class="text-white text-lg font-bold mx-2">{channel_name}</p>
	</div>

	<!-- Open config -->
	<div class="flex flex-row justify-center items-center">
		<button
			on:click={() => (open_modals.gallery_mode = true)}
			class="text-white text-md font-bold bg-indigo-800 border-indigo-800 border-2 rounded-lg p-2 hover:scale-110 transition duration-300 ease-in-out"
		>
			<Fa icon={faCog} />
		</button>
	</div>
</nav>

<slot />
