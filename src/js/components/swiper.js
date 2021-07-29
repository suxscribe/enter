import Swiper, {
  Navigation,
  Pagination,
  EffectFade,
  Keyboard,
  Controller,
} from 'swiper';
import { variables, elements } from './variables';

export let casesSlider = () => {
  if (document.querySelector('.case-slider__container')) {
    var swiperSection1 = new Swiper('.case-slider__container', {
      effect: 'fade',
      fadeEffect: {
        crossFade: true,
      },
      speed: variables.swiperSpeed,
      loop: true,
      centeredSlides: true,
      slidesPerView: '1',
      initialSlide: 0,
      grabCursor: false,
      allowTouchMove: true,
      pagination: {
        el: '.case-slider__pagination',
        clickable: true,
      },
      keyboard: true,
    });
  }
};
