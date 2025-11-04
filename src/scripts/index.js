'use strict';

import Splide from '@splidejs/splide';

new Splide( '.splide',{
  autoplay: true,
  type: 'fade',
  arrows: false,
  interval: 6000,
  speed: 4000,
  rewind: true,
  pauseOnFocus: false,
  pauseOnHover: false,
}).on('active', (Slide) => {
  const targets = Slide.slide.querySelectorAll('.hero__picture, .hero__img');
  targets.forEach((el) => {
    el.classList.remove('zoomUp');
    void el.offsetWidth;
    el.classList.add('zoomUp');
  });
}).mount();