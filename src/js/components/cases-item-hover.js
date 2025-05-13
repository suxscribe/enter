export const casesItemHover = () => {
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
};
