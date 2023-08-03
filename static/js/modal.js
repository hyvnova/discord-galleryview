// Open a modal showing focused image
function showModal(url, name) {
  let modal = document.getElementById("image_modal");

  // set modal image
  const modalImage = document.getElementById("modal_image");
  modalImage.src = url;

  // set modal image name
  const modalImageName = document.getElementById("modal_image_name");
  modalImageName.innerHTML = name;

  // show modal
  open_modal("image_modal");

  // close modal on click
  modal.onclick = function () {
    modal.classList.add("hidden");
    document.body.classList.remove("modal-open");
  };
}
