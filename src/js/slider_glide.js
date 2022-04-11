import Glide from '@glidejs/glide';

export const config = {
  type: 'carousel',
  perView: 10,
  autoplay: 2500,
  gap: 15,
  touchRatio: 0.1,
  keyboard: true,
  hoverpause: true,
  animationDuration: 1000,
  animationTimingFunc: 'ease-out',
  peek: { before: 50, after: 50 },
  breakpoints: {
    2000: {
      perView: 10,
    },
    1600: {
      perView: 8,
    },
    1280: {
      perView: 7,
    },
    1023: {
      perView: 5,
    },
    500: {
      perView: 2,
    },
  },
};

export let glide = new Glide('.glide', config);
