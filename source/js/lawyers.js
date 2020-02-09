const lawyersSlider = new Swiper('.lawyers__slider', {
  //spaceBetween: 40,
  slidesPerView: 1,
  loop: true,
  navigation: {
    nextEl: '.lawyers__nav-right',
    prevEl: '.lawyers__nav-left'
  }
});

if (window.innerWidth > 500) {
  lawyersSlider.destroy();
}
