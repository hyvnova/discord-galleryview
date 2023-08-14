<script lang="ts">
	import FocusModal from './FocusModal.svelte';

	export let image: { url: string; name: string };
	export let class_name: string = 'rounded-lg shadow-md mx-auto select-none';
	export let style: string = 'select-none';

	let show_modal = false;
</script>

<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
<!-- svelte-ignore a11y-click-events-have-key-events -->
<img
	on:click={() => {
		show_modal = true;
	}}
	alt={image.name}
	src={image.url}
	class={class_name}
	{style}
	loading="lazy"
/>
<FocusModal bind:show_modal>
	<!-- Image must fit height-->
	<class class="container p-1 h-[90vh] mx-auto">
		<img
			alt={image.name}
			src={image.url}
			class="select-none w-auto h-full mx-auto"
			loading="lazy"
		/>
	</class>
</FocusModal>
