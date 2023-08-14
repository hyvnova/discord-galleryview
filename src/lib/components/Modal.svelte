<script lang="ts">
	import { faTimes } from '@fortawesome/free-solid-svg-icons';
	import Fa from 'svelte-fa';

	export let show_modal: Boolean;

	let dialog: HTMLDialogElement;

	$: if (dialog && show_modal) dialog.showModal();
	$: if (dialog && !show_modal) dialog.close();
</script>

<!-- svelte-ignore a11y-click-events-have-key-events a11y-no-noninteractive-element-interactions -->
<dialog
	bind:this={dialog}
	on:close={() => (show_modal = false)}
	class="fixed w-full h-full inset-0 z-10 flex justify-center items-center"
>
	<!-- svelte-ignore a11y-no-static-element-interactions -->
	<div on:click|stopPropagation class="flex flex-col w-full h-full">
		<!-- svelte-ignore a11y-autofocus -->
		<button
			class="rounded-md shadow-md text-white w-auto h-10 self-center mt-8
				 border-none 
				 transform transition-transform duration-200 ease-in-out"
			style="background-color:rgba(31, 14, 59, 0.3);"
			autofocus
			on:click={() => dialog.close()}
		>
			<Fa icon={faTimes} />
		</button>
		<slot />
	</div>
</dialog>

<style>
	button:hover {
		scale: 1.2;
		border-bottom: rgb(55, 40, 190) 1px solid;
	}

	dialog {
		max-width: 32em;
		border-radius: 0.2em;
		border: none;
		padding: 0;
	}
	dialog::backdrop {
		background: rgba(0, 0, 0, 0.2);
	}
	dialog > div {
		padding: 1em;
	}
	dialog[open] {
		animation: zoom 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
	}
	@keyframes zoom {
		from {
			transform: scale(0.95);
		}
		to {
			transform: scale(1);
		}
	}
	dialog[open]::backdrop {
		animation: fade 0.2s ease-out;
	}
	@keyframes fade {
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}
	button {
		display: block;
	}
</style>
