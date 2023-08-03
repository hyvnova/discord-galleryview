
function make_carousel(container_id = "carousel_preview", height = null) {
    let container = document.getElementById(container_id);
    let image_height = height ? height : document.getElementById("carousel_image_height").value + "vh";

    // create and insert buttons (prev, next)
    container.innerHTML += `
        <div id="carousel_image_container" class="w-auto h-full overflow-hidden"></div>

        <button id="prev" class="w-12 h-12 rounded-full bg-gray-200 hover:bg-gray-300 transition-all duration-300 ease-in-out flex justify-center items-center">
        <i class="fas fa-chevron-left text-gray-700"></i>
    </button>

    <button id="next" class="w-12 h-12 rounded-full bg-gray-200 hover:bg-gray-300 transition-all duration-300 ease-in-out flex justify-center items-center">
        <i class="fas fa-chevron-right text-gray-700"></i>
    </button>

    `;


    // prepare images
    let carousel_images = [];
    let current_image_index = 0;

    images.forEach((image) => {
        // create image object
        let img = new Image();
        img.src = image[0];
        img.alt = image[1];
        img.name = image[1];
        img.classList.add("w-full", "rounded-lg", "object-cover", "object-center");
        img.style.height = image_height;

        // add to array
        carousel_images.push(img);
    });

    // insert first image
    container.querySelector("#carousel_image_container").appendChild(carousel_images[current_image_index]);

    // add event listeners to buttons
    container.querySelector("#prev").addEventListener("click", () => {
        // remove current image
        container.querySelector("#carousel_image_container").innerHTML = "";

        // get previous image
        current_image_index = current_image_index - 1 < 0 ? carousel_images.length - 1 : current_image_index - 1;

        // insert previous image
        container.querySelector("#carousel_image_container").appendChild(carousel_images[current_image_index]);

    });

    container.querySelector("#next").addEventListener("click", () => {
        // remove current image
        container.querySelector("#carousel_image_container").innerHTML = "";

        // get next image
        current_image_index = current_image_index + 1 >= carousel_images.length ? 0 : current_image_index + 1;

        // insert next image
        container.querySelector("#carousel_image_container").appendChild(carousel_images[current_image_index]);

    });


    // save height 
    localStorage.setItem("carousel_image_height", height);
}


function use_carousel() {
    //get height
    let height = localStorage.getItem("carousel_image_height") ? localStorage.getItem("carousel_image_height") : `${document.getElementById("carousel_image_height").value}%`;

    gallery.innerHTML = `<div id="gallery_carousel" class="container mt-2 w-10/12  flex justify-center items-center max-h-full">
    </div>
    `

    make_list("gallery_carousel", height);
}
