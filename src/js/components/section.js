import sectionHover from './follow-cursor';

export const initSections = () => {
  const sectionElements = document.querySelectorAll('.sections__item');
  const bgSelector = '.sections__item-bg';

  if (sectionElements.length > 0) {
    sectionElements.forEach((element) => {
      const bg = element.querySelector('.sections__item-bg');

      if (bg) {
        element.addEventListener('mouseenter', () => {
          if (bg.dataset && bg.dataset.hover) {
            bg.style.backgroundColor = bg.dataset.hover;
          }
        });
        element.addEventListener('mouseleave', () => {
          bg.style.backgroundColor = '';
        });
      }

      const bgImg = element.querySelector('.sections__item-bg-img');
      if (bg && bgImg) {
        new sectionHover({
          selector: bgSelector,
          selectorInner: '.sections__item-bg-img',
        });
      }
    });
  }
};
