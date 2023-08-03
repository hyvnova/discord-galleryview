

function make_carousel(container_id = "carousel_preview") {
    let container = document.getElementById(container_id);

    // create and insert buttons (prev, next)
    container.innerHTML += `
<div class="relative container mt-2 w-full flex flex-col justify-center items-center max-w-screen-md mx-auto">
    <!--Carousel items-->
    <div id="carousel_item" class="container max-w-screen-md mx-auto px-4 overflow-hidden relative w-auto after:clear-both after:block after:content-['']">
    </div>

    <!--Carousel controls - prev item-->
    <button
        id="carousel_prev"
        class="absolute bottom-0 left-0 top-0 z-[0] flex w-[15%] items-center justify-center border-0 bg-none p-0 text-center text-white opacity-50 transition-opacity duration-150 ease-[cubic-bezier(0.25,0.1,0.25,1.0)] hover:text-white hover:no-underline hover:opacity-90 hover:outline-none focus:text-white focus:no-underline focus:opacity-90 focus:outline-none motion-reduce:transition-none"
        type="button">
        <span class="inline-block h-8 w-8">
            <i class="fas fa-chevron-left"></i>
        </span>
        <span
            class="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">Previous</span>
    </button>
    <!--Carousel controls - next item-->
    <button
        id="carousel_next" class="absolute bottom-0 right-0 top-0 z-[0] flex w-[15%] items-center justify-center border-0 bg-none p-0 text-center text-white opacity-50 transition-opacity duration-150 ease-[cubic-bezier(0.25,0.1,0.25,1.0)] hover:text-white hover:no-underline hover:opacity-90 hover:outline-none focus:text-white focus:no-underline focus:opacity-90 focus:outline-none motion-reduce:transition-none"
        type="button">
        <span class="inline-block h-8 w-8">
            <i class="fas fa-chevron-right"></i>
        </span>
        <span
            class="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">Next</span>
    </button>
</div>
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
        img.classList.add("relative", "float-left", "-mr-[100%]", "max-w-1/2", "h-auto");

        // add to array
        carousel_images.push(img);
    });

    let carousel_item = container.querySelector("#carousel_item");

    // insert first image
    carousel_item.appendChild(carousel_images[current_image_index]);

    // prepare buttons
    let prev_button = container.querySelector("#carousel_prev");
    let next_button = container.querySelector("#carousel_next");


    // add event listeners
    prev_button.addEventListener("click", () => {
        // remove current image
        carousel_item.removeChild(carousel_images[current_image_index]);

        // add previous image
        current_image_index = current_image_index - 1 < 0 ? carousel_images.length - 1 : current_image_index - 1;
        carousel_item.appendChild(carousel_images[current_image_index]);
    });

    next_button.addEventListener("click", () => {
        // remove current image
        carousel_item.removeChild(carousel_images[current_image_index]);

        // add next image
        current_image_index = current_image_index + 1 >= carousel_images.length ? 0 : current_image_index + 1;
        carousel_item.appendChild(carousel_images[current_image_index]);
    });

}


function use_carousel() {
    //get height
    gallery.innerHTML = `<div id="gallery_carousel" class="container max-w-screen-md mx-auto overflow-hidden flex items-center justify-center"></div>
    `;

    make_carousel("gallery_carousel");
}
