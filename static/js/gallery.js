function show_gallery(mode) {
  // save gallery mode to local storage
  localStorage.setItem("galery_mode", mode);

  let gallery = document.getElementById("gallery");

  switch (mode) {
    case "grid": {
      use_grid();
    }
  }
}

window.onload = function () {
  // Get gallery mode from local storage
  let gallery_mode = localStorage.getItem("galery_mode");

  // If gallery mode is not set, show selection modal
  if (gallery_mode === null) {
    // Show mode selection modal
    open_modal("gallery_mode_modal");
  } else {
    // If gallery mode is set, show gallery
    show_gallery(gallery_mode);
  }
};
