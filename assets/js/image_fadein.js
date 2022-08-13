function setup_image_animation() {
  let images = document.getElementsByTagName("img");
  for (let i = 0; i < images.length; i++) {
    if (images[i].complete) {
      continue;
    }
    images[i].addEventListener("load", e => {
      e.target.style.opacity = "1";
    });
    images[i].style.opacity = "0";
  }
}

window.addEventListener("DOMContentLoaded", setup_image_animation);
