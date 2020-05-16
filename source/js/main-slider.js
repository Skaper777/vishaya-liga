if (document.querySelector('.main-window__slider')) {
  const mainSlider = new Swiper('.main-window__slider', {
    effect: 'fade',
    speed: 1100,
    autoplay: {
      delay: 2500,
      disableOnInteraction: false,
    }
  });
}


