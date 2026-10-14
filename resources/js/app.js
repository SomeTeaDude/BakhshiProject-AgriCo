import './bootstrap';
import './livewire-datepicker-datepicker';

import PhotoSwipeLightbox from 'photoswipe/lightbox';
import 'photoswipe/style.css';

// tall-toast
import ToastComponent from "../../vendor/usernotnull/tall-toasts/resources/js/tall-toasts";
import PhotoSwipe from "photoswipe";

Alpine.plugin(ToastComponent);

import videojs from 'video.js';

window.videojs = videojs;

// photoswipe
document.addEventListener('DOMContentLoaded', () => {
    const lightbox = new PhotoSwipeLightbox({
        gallery: '.gallery',
        children: 'a',
        pswpModule: PhotoSwipe,
    });

    lightbox.init();
});

import 'video.js/dist/video-js.css';

// Forest
import '@videojs/themes/dist/forest/index.css';
