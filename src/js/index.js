import gsap from 'gsap';
import sal from './vendor/sal.js';
import Splitting from 'splitting';

import { variables } from './components/variables';

import { initSections } from './components/section';
import { casesSlider } from './components/swiper';
import { validateForms, formFileInput } from './components/forms';
import { burgerToggle } from './components/header';
import { casesItemHover } from './components/cases-item-hover.js';
import followCursor from './components/follow-cursor';

// window.UIkit = UIkit; // fix not difined bug

// some svg magic. SVG to shadow root
function requireAll(r) {
  r.keys().forEach(r);
}
requireAll(require.context('../svg/', true, /\.svg$/));

sal({
  once: false,
  rootMargin: '-30px 0px -30px 0px',
  threshold: 0.005,
});

Splitting();

// DOCUMENT READY
// COMMON SCRIPTS
initSections();
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
const sectionHeaderHover = new followCursor({
  selector: '.header',
  selectorInner: '.header__bg-ball img',
});

// show preview video when hovering over the case teaser
casesItemHover();

// clients balls out
let delay = 0;
const delayDelta = 50;
const clientsItems = document.querySelectorAll('.about__clients-item');
delay = delayDelta * clientsItems.length;

document.querySelectorAll('.about__clients-item').forEach((item) => {
  item.dataset.salDelay = delay;
  delay = delay - delayDelta;
});

// heading splitting by lines

const splitHeaderTitle = document.querySelector('.header__title');
const splitHeaderTitleResults = Splitting({
  target: splitHeaderTitle,
  by: 'lines',
});

let splitHeaderTimeline = new gsap.timeline();

splitHeaderTitleResults[0].lines.forEach((line) => {
  splitHeaderTimeline.from(line, { duration: 0.3, y: 40, opacity: 0 }, '=-0.2');
});
splitHeaderTimeline.shiftChildren(1); // shift animation start to 1 second (pause at start)
