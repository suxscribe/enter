import Swiper, { Navigation, Pagination, EffectFade, Keyboard, Controller, Autoplay } from 'swiper';
import { variables, elements } from './variables';

Swiper.use([Navigation, Pagination, EffectFade, Keyboard, Controller, Autoplay]);

export let casesSlider = () => {
  if (document.querySelector('.case-slider__container')) {
    let autoplayTimeout;

    var swiperSection1 = new Swiper('.case-slider__container', {
      effect: 'fade',
      fadeEffect: {
        crossFade: true,
      },
      autoplay: {
        delay: 999999, // Very long delay - we'll control timing manually
        disableOnInteraction: false,
      },
      speed: variables.swiperSpeed,
      loop: true,
      centeredSlides: true,
      slidesPerView: 1,
      initialSlide: 0,
      grabCursor: false,
      allowTouchMove: true,
      pagination: {
        el: '.case-slider__pagination',
        clickable: true,
        renderBullet: (index, className) => {
          const previewUrl = document.querySelector(
            `.case-slider__item[data-swiper-slide-index="${index}"]`
          ).dataset.preview; // use in loop mode
          // const previewUrl = document.querySelectorAll(`.case-slider__item`)[index].dataset.preview; // use in no loop mode
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
            // Wait for video to end before advancing
            currentVideo.addEventListener('ended', () => {
              swiperSection1.slideNext();
            });
          } else {
            // No video, advance after 3 seconds
            autoplayTimeout = setTimeout(() => {
              swiperSection1.slideNext();
            }, 3000);
          }
        },
        slideChange: () => {
          const slider = document.querySelector('.case-slider__container');

          // Clear any existing timeouts
          if (autoplayTimeout) {
            clearTimeout(autoplayTimeout);
          }

          const currentVideo = document
            .querySelectorAll(`.case-slider__item`)
            [slider?.swiper?.activeIndex || 0].querySelector('video');

          if (currentVideo) {
            currentVideo.play();
            // Wait for video to end before advancing
            currentVideo.addEventListener('ended', () => {
              swiperSection1.slideNext();
            });
          } else {
            // No video, advance after 3 seconds
            autoplayTimeout = setTimeout(() => {
              swiperSection1.slideNext();
            }, 3000);
          }
        },
        slideChangeTransitionEnd: () => {
          const sliderVideos = document.querySelectorAll(
            '.case-slider__item:not(.swiper-slide-active) video'
          );

          // Remove ended event listeners from inactive videos
          sliderVideos.forEach((video) => {
            video.pause();
            video.currentTime = 0;
            // Clone and replace to remove event listeners
            const newVideo = video.cloneNode(true);
            video.parentNode?.replaceChild(newVideo, video);
          });
        },
      },
      keyboard: true,
    });
  }
};
