const body = document.body; // shortcut to body element

const images = JSON.parse(
  document.getElementsByTagName("images-json")[0].innerHTML
); // Array of Array of url and name Ex. [[url, name], [url, name], ...]

let open_modal_count = 0;

function open_modal(id) {
  open_modal_count++;

  let modal = document.getElementById(id);

  modal.classList.remove("hidden");

  if (body.classList.contains("modal-open")) {
    body.classList.remove("modal-open");
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