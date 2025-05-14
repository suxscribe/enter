export const formFileInput = () => {
  const realFileBtn = document.getElementById('real-file');
  const customBtn = document.getElementById('custom-button');
  const customTxt = document.getElementById('custom-text');

  customBtn.addEventListener('click', function() {
    realFileBtn.click();
  });
  customTxt.addEventListener('click', function() {
    realFileBtn.click();
  });

  realFileBtn.addEventListener('change', function() {
    if (realFileBtn.value) {
      customTxt.innerHTML = realFileBtn.value.match(/[\/\\]([\w\d\s\.\-\(\)]+)$/)[1];
    } else {
      customTxt.innerHTML = 'No file chosen, yet.';
    }
  });
};

export const burgerToggle = () => {
  const burgerLink = document.querySelector('.header__burger-link');
  const burgerMenu = document.querySelector('.header__dropdown');

  const isVisible = (elem) =>
    !!elem && !!(elem.offsetWidth || elem.offsetHeight || elem.getClientRects().length); // source (2018-03-11): https://github.com/jquery/jquery/blob/master/src/css/hiddenVisibleSelectors.js

  // listen to burger button click event
  burgerLink?.addEventListener('click', (e) => {
    burgerLink.classList.toggle('active');
    burgerMenu?.classList.toggle('active');

    if (burgerMenu?.classList.contains('active')) {
      //   removeClickListener();
      document.addEventListener('click', outsideClickListener);
    }
  });

  // listen to click event outside of burger menu and burger button
  const outsideClickListener = (event) => {
    if (
      !burgerMenu?.contains(event.target) &&
      isVisible(burgerMenu) &&
      !burgerLink?.contains(event.target)
    ) {
      // or use: event.target.closest(selector) === null
      console.log('outside');

      burgerMenu?.classList.remove('active');
      burgerLink?.classList.remove('active');

      // remove this event listener in the end.
      removeClickListener();
    }
  };

  const removeClickListener = () => {
    document.removeEventListener('click', outsideClickListener);
  };
};
