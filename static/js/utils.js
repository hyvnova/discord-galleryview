const body = document.body; // shortcut to body element

// get channel id from url can be /gallery/<channel_id> or /gallery/<channel_id>/
const channel_id = window.location.pathname.split("/")[2];

const images = JSON.parse(
	document.getElementsByTagName("images-json")[0].innerHTML
).map((image_id) => {
	// image = <image_id>/<image_name>

	// return discord image url and image name
	return [`https://cdn.discordapp.com/attachments/${channel_id}/${image_id}`, image_id.split("/")[1].split(".")[0]];
});
// images = [[image_url, image_name], ...]


let open_modal_count = 0;

function open_modal(id) {
	open_modal_count++;

	let modal = document.getElementById(id);

	modal.classList.remove("hidden");

	if (!body.classList.contains("modal-open")) {
		body.classList.add("modal-open");
	}
}

function close_modal(id) {
	let modal = document.getElementById(id);

	modal.classList.add("hidden");

	if (body.classList.contains("modal-open") && open_modal_count == 1) {
		body.classList.remove("modal-open");
	}

	open_modal_count--;
}

function switch_modal(id1, id2) {
	close_modal(id1);
	open_modal(id2);
}