import { gsap, Sine } from 'gsap/all';

export const sectionHover = () => {
  let mouse = { x: 0, y: 0 }; //Cursor position
  let pos = { x: 0, y: 0 }; //Cursor position
  let ratio = 0.05; //delay follow cursor
  let active = false;
  // let ball = document.getElementById('ball');

  // gsap.set(ball, { xPercent: -50, yPercent: -50 }); //scale from middle ball

  document.addEventListener('mousemove', mouseMove);

  function mouseMove(e) {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  }

  gsap.ticker.add(updatePosition);

  function updatePosition() {
    if (!active) {
      pos.x += (mouse.x - pos.x) * ratio;
      pos.y += (mouse.y - pos.y) * ratio;

      // gsap.set(ball, { x: pos.x, y: pos.y });
    }
  }

  document.querySelectorAll('.sections__item-bg').forEach((el) => {
    el.addEventListener('mouseenter', () => {
      // gsap.to(el, 0.3, { scale: 1.05 }); //scale trigger element
      // gsap.to(ball, 0.3, { scale: 3.3 }); //scale ball
      // gsap.to(ball, 0.3, { borderWidth: '.5px' });
      active = true;
    });
  });
  // $('.sections__item-bg').mouseenter(function(e) {
  //   gsap.to(this, 0.3, { scale: 1.05 }); //scale trigger element
  //   gsap.to(ball, 0.3, { scale: 3.3 }); //scale ball
  //   gsap.to(ball, 0.3, { borderWidth: '.5px' });
  //   active = true;
  // });

  document.querySelectorAll('.sections__item-bg').forEach((el) => {
    el.addEventListener('mouseleave', () => {
      // gsap.to(el, 0.3, { scale: 1 });
      // gsap.to(ball, 0.3, { scale: 1 });
      gsap.to(el.querySelector('.sections__item-bg-img'), 0.6, { x: 0, y: 0 });
      gsap.to(el.querySelector('.sections__item-bg-img'), 0.3, { scale: 1 });
      // gsap.to(ball, 0.3, { borderWidth: '1px' });
      active = false;
    });
  });
  // $('.sections__item-bg').mouseleave(function(e) {
  //   gsap.to(this, 0.3, { scale: 1 });
  //   gsap.to(ball, 0.3, { scale: 1 });
  //   gsap.to(this.querySelector('.sections__item-bg-img'), 0.3, { x: 0, y: 0 });
  //   gsap.to(ball, 0.3, { borderWidth: '1px' });
  //   active = false;
  // });

  document.querySelectorAll('.sections__item-bg').forEach((el) => {
    el.addEventListener('mousemove', (e) => {
      parallaxCursor(e, el, 1); //magnetic ball = low number is more attractive
      callParallax(e, el);
    });
  });

  // $('.sections__item-bg').mousemove(function(e) {
  //   parallaxCursor(e, this, 1); //magnetic ball = low number is more attractive
  //   callParallax(e, this);
  // });

  function callParallax(e, parent) {
    parallaxIt(e, parent, parent.querySelector('.sections__item-bg-img'), 85); //magnetic area = higher number is more attractive
  }

  function parallaxIt(e, parent, target, movement) {
    let boundingRect = parent.getBoundingClientRect();
    let relX = e.clientX - boundingRect.left;
    let relY = e.clientY - boundingRect.top;

    gsap.to(target, 0.3, { scale: 1.05 }); //scale trigger element

    gsap.to(target, 0.6, {
      x: ((relX - boundingRect.width / 2) / boundingRect.width) * movement,
      y: ((relY - boundingRect.height / 2) / boundingRect.height) * movement,
      ease: 'power1.out',
    }); // duration must be the same as when removing translations
  }

  function parallaxCursor(e, parent, movement) {
    let rect = parent.getBoundingClientRect();
    let relX = e.clientX - rect.left;
    let relY = e.clientY - rect.top;
    pos.x = rect.left + rect.width / 2 + (relX - rect.width / 2) / movement;
    pos.y = rect.top + rect.height / 2 + (relY - rect.height / 2) / movement;
    // gsap.to(ball, 0.3, { x: pos.x, y: pos.y });
  }
};
