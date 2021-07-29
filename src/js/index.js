import UIkit from 'uikit';
import Icons from 'uikit/dist/js/uikit-icons';
import Swiper, {
  Navigation,
  Pagination,
  EffectFade,
  Keyboard,
  Controller,
} from 'swiper';

import { variables } from './components/variables';

import { teaserHover, formFileInput, burgerToggle } from './components/helpers';
import { casesSlider } from './components/swiper';
import { validateForms } from './components/forms';
import { sectionHover } from './components/section-hover';

Swiper.use([Navigation, Pagination, EffectFade, Keyboard, Controller]);

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
});
