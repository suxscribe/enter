export const burgerToggle = () => {
  const burgerLink = document.querySelector('.header__burger-link');
  const burgerMenu = document.querySelector('.header__dropdown');

  const isVisible = (elem) =>
    !!elem && !!(elem.offsetWidth || elem.offsetHeight || elem.getClientRects().length);

  if (burgerLink) {
    burgerLink.addEventListener('click', (e) => {
      burgerLink.classList.toggle('active');
      if (burgerMenu) burgerMenu.classList.toggle('active');

      if (burgerMenu?.classList.contains('active')) {
        document.addEventListener('click', outsideClickListener);
      }
    });
  }

  const outsideClickListener = (event) => {
    if (
      burgerMenu &&
      event.target &&
      !burgerMenu.contains(event.target) &&
      isVisible(burgerMenu) &&
      burgerLink &&
      !burgerLink.contains(event.target)
    ) {
      if (burgerMenu) burgerMenu.classList.remove('active');
      if (burgerLink) burgerLink.classList.remove('active');
      removeClickListener();
    }
  };

  const removeClickListener = () => {
    document.removeEventListener('click', outsideClickListener);
  };
};
