import UIkit from 'uikit';
import Icons from 'uikit/dist/js/uikit-icons';

import { variables } from './components/variables';

import { teaserHover, formFileInput, burgerToggle } from './components/helpers';
import { casesSlider } from './components/swiper';
import { validateForms } from './components/forms';
import { sectionHover } from './components/section-hover';

window.UIkit = UIkit; // fix not difined bug

// loads the Icon plugin
UIkit.use(Icons);

// some svg magic. SVG to shadow root
function requireAll(r) {
  r.keys().forEach(r);
}

requireAll(require.context('../svg/', true, /\.svg$/));

// set default offset of scroll
UIkit.mixin(
  {
    data: {
      offset: variables.scrollOffset,
    },
  },
  'scroll'
);

// DOCUMENT READY
document.addEventListener('DOMContentLoaded', () => {
  // COMMON SCRIPTS
  teaserHover();
  casesSlider();
  burgerToggle();
  // INITIALIZE SWIPERS

  // form file input stuff
  document.querySelectorAll('.form').forEach((form) => {
    form.reset();
  });
  validateForms();
  formFileInput();

  // HOVER
  sectionHover();

  // show preview video when hovering over the case teaser
  document.querySelectorAll('.cases__item').forEach((item) => {
    const video = item.querySelector('video');
    if (video) {
      item.addEventListener('mouseenter', () => {
        item.querySelector('img').style.opacity = 0;
        video.currentTime = 0;
        video.play();
      });
      item.addEventListener('mouseleave', () => {
        item.querySelector('img').style.opacity = 1;
        setTimeout(function() {
          item.querySelector('video').pause();
        }, 500); //pause only after the video is hidden by image
      });
    }
  });
});
