import { gsap, Sine } from 'gsap/all';
import { isDesktop } from './is-desktop';

export default class sectionHover {
  constructor(_options) {
    this.mouse = { x: 0, y: 0 }; //Cursor position
    this.this = { x: 0, y: 0 }; //Cursor position
    this.ratio = 0.05; //delay follow cursor
    this.active = false;

    this.selector = _options.selector;
    this.selectorInner = _options.selectorInner;

    // document.addEventListener('mousemove', this.mouseMove);
    // gsap.ticker.add(this.updatePosition);

    this.mouseEnterListener();
    this.mouseLeaveListener();
    this.mouseMoveListener();
  }

  // const selectorInner = '.sections__item-bg-img';
  // const selector = '.sections__item-bg';

  // const ball = document.getElementById('ball');
  // gsap.set(ball, { xPercent: -50, yPercent: -50 }); //scale from middle ball

  mouseMove(e) {
    this.mouse.x = e.clientX;
    this.mouse.y = e.clientY;
  }

  updatePosition() {
    if (!this.active) {
      this.x += (this.mouse.x - this.x) * this.ratio;
      this.y += (this.mouse.y - this.y) * this.ratio;

      // gsap.set(ball, { x: pos.x, y: pos.y });
    }
  }

  mouseEnterListener() {
    document.querySelectorAll(this.selector).forEach((el) => {
      el.addEventListener('mouseenter', () => {
        // gsap.to(el, 0.3, { scale: 1.05 }); //scale trigger element
        // gsap.to(ball, 0.3, { scale: 3.3 }); //scale ball
        // gsap.to(ball, 0.3, { borderWidth: '.5px' });
        this.active = true;
        // console.log('enter');
      });
    });
  }

  mouseLeaveListener() {
    document.querySelectorAll(this.selector).forEach((el) => {
      el.addEventListener('mouseleave', () => {
        // gsap.to(el, 0.3, { scale: 1 });
        // gsap.to(ball, 0.3, { scale: 1 });
        let q = gsap.utils.selector(el);
        let inner = q(this.selectorInner);
        gsap.to(inner, 0.8, {
          x: 0,
          y: 0,
          ease: 'elastic.out( 1, 1)',
        });
        gsap.to(inner, 0.3, { scale: 1 });
        // gsap.to(ball, 0.3, { borderWidth: '1px' });
        this.active = false;
      });
    });
  }

  mouseMoveListener() {
    document.querySelectorAll(this.selector).forEach((el) => {
      el.addEventListener('mousemove', (e) => {
        this.callParallax(e, el);
        // parallaxCursor(e, el, 1); //magnetic ball following cursor = low number is more attractive
      });
    });
  }

  callParallax(e, parent) {
    if (isDesktop()) {
      this.parallaxIt(e, parent, 50); //magnetic area = higher number is more attractive
    }
  }

  parallaxIt(e, parent, movement) {
    const boundingRect = parent.getBoundingClientRect();

    let q = gsap.utils.selector(parent);
    let inner = q(this.selectorInner);

    let relX = e.clientX - boundingRect.left;
    let relY = e.clientY - boundingRect.top;

    gsap.to(inner, 0.3, { scale: 1.05 }); //scale trigger element

    gsap.to(inner, 0.6, {
      x:
        ((relX - boundingRect.width / 2) / boundingRect.width) * movement + '%',
      y:
        ((relY - boundingRect.height / 2) / boundingRect.height) * movement +
        '%',
      ease: 'power1.out',
    }); // duration must be the same as when removing translations
  }

  parallaxCursor(e, parent, movement) {
    let rect = parent.getBoundingClientRect();
    let relX = e.clientX - rect.left;
    let relY = e.clientY - rect.top;
    this.x = rect.left + rect.width / 2 + (relX - rect.width / 2) / movement;
    this.y = rect.top + rect.height / 2 + (relY - rect.height / 2) / movement;
    // gsap.to(ball, 0.3, { x: pos.x, y: pos.y });
  }

  // mouseEnterListener('.sections__item-bg');
  // mouseLeaveListener('.sections__item-bg', '.sections__item-bg-img');
  // mouseMoveListener('.sections__item-bg', '.sections__item-bg-img');

  // mouseEnterListener('.header');
  // mouseLeaveListener('.header', '.header__bg-ball img');
  // mouseMoveListener('.header', '.header__bg-ball img');
}
