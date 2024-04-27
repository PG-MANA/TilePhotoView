import PhotoSwipeLightbox from './photoswipe-lightbox.esm.min.js';
import PhotoSwipe from './photoswipe.esm.min.js';

const lightbox = new PhotoSwipeLightbox({
  gallery: '#gallery--cropped-thumbs',
  children: 'a',
  showHideAnimationType: 'zoom',
  bgOpacity: 0.95,
  pswpModule: PhotoSwipe,
});


let first_element;
let last_element;

function disable_description(e) {
  let description = e.getElementsByClassName("description");
  if (description.length > 0) {
    description[0].style.visibility = "hidden";
  }
}

function enable_description(e) {
  let description = e.getElementsByClassName("description");
  if (description.length > 0) {
    description[0].style.visibility = "initial";
  }
}

lightbox.on('afterInit', () => {
  first_element = lightbox.pswp.currSlide.data.element;
  disable_description(first_element);
  document.body.style.overflowY = "hidden";
});
lightbox.on('close', () => {
  last_element = lightbox.pswp.currSlide.data.element;
  if (first_element !== last_element) {
    enable_description(first_element);
    disable_description(last_element);
  }
});
lightbox.on('destroy', () => {
  enable_description(last_element);
  document.body.style.overflowY = "initial";
});
lightbox.init();

