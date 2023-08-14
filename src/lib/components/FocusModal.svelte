<script lang="ts">
	export let show_modal: Boolean;

	let dialog: HTMLDialogElement;

	$: if (dialog && show_modal) dialog.showModal();
	$: if (dialog && !show_modal) dialog.close();
</script>

<!-- svelte-ignore a11y-click-events-have-key-events a11y-no-noninteractive-element-interactions -->
<dialog
	bind:this={dialog}
	on:close={() => show_modal = false}
	class="fixed w-full h-full inset-0 z-10 flex justify-center items-center outline-none"
	on:click={() => show_modal = false}
>
	<!-- svelte-ignore a11y-no-static-element-interactions -->
	<div
		on:click={() => {
			dialog.close();
		}}
		class="flex flex-col justify-center items-center container"
	>
		<slot />
	</div>
</dialog>

<style>
	dialog {
		max-width: 32em;
		border-radius: 0.2em;
		padding: 0;
		background: rgba(48, 28, 78, 0.3);
	}
	dialog::backdrop {
		background: rgba(0, 0, 0, 0.3);
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
</style>
