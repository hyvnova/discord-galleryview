<script>
	import Modal from './Modal.svelte';

	let showModal = false;
</script>

<button on:click={() => (showModal = true)}>Open Modal</button>

<Modal bind:show_modal={showModal}>
	<div class="flex flex-col justify-center items-center">
		<h2 class="text-2xl font-bold text-white m-1">Under development</h2>
		<p class="text-lg text-gray-400">This feature is under development</p>
	</div>
</Modal>
