import Swiper, {
  Navigation,
  Pagination,
  EffectFade,
  Keyboard,
  Controller,
  Autoplay,
} from 'swiper';
import { variables, elements } from './variables';

Swiper.use([
  Navigation,
  Pagination,
  EffectFade,
  Keyboard,
  Controller,
  Autoplay,
]);

export let casesSlider = () => {
  if (document.querySelector('.case-slider__container')) {
    var swiperSection1 = new Swiper('.case-slider__container', {
      effect: 'fade',
      fadeEffect: {
        crossFade: true,
      },
      // autoplay: {
      //   delay: 3000,
      //   disableOnInteraction: false,
      // },
      speed: variables.swiperSpeed,
      // loop: true,
      centeredSlides: true,
      slidesPerView: '1',
      initialSlide: 0,
      grabCursor: false,
      allowTouchMove: true,
      pagination: {
        el: '.case-slider__pagination',
        clickable: true,
        renderBullet: (index, className) => {
          // const previewUrl = document.querySelector(
          //   `.case-slider__item[data-swiper-slide-index="${index}"]`
          // ).dataset.preview; // use in loop mode
          const previewUrl = document.querySelectorAll(`.case-slider__item`)[
            index
          ].dataset.preview;
          return (
            '<span class="' +
            className +
            '" style="background-image: url( ' +
            previewUrl +
            ')"></span>'
          );
        },
      },
      on: {
        init: () => {
          const slider = document.querySelector('.case-slider__container');
          const currentVideo = document.querySelector(
            `.case-slider__item.swiper-slide-active video`
          );
          if (currentVideo) {
            currentVideo.play();
          }
        },
        slideChange: () => {
          const slider = document.querySelector('.case-slider__container');

          const sliderVideos = document.querySelectorAll(
            '.case-slider__item video'
          );
          sliderVideos.forEach((video) => {
            setTimeout(() => {
              video.pause();
              video.currentTime = 0;
            }, 500);
          });
          const currentVideo = document
            .querySelectorAll(`.case-slider__item`)
            [slider.swiper.activeIndex].querySelector(' video');

          if (currentVideo) {
            currentVideo.play();
          }
        },
      },
      keyboard: true,
    });

    // console.log(swiperSection1.slides);

    // document.querySelectorAll('.case-slider__item').forEach((slide, index) => {
    //   document.querySelectorAll(
    //     '.case-slider__pagination .swiper-pagination-bullet'
    //   )[index].style.backgroundImage = 'url("' + slide.dataset.preview + '")';
    // });
  }
};
