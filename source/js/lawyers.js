if (document.querySelector('.lawyers__slider')) {
  const lawyersSlider = new Swiper('.lawyers__slider', {
    //spaceBetween: 40,
    slidesPerView: 1,
    navigation: {
      nextEl: '.lawyers__nav-right',
      prevEl: '.lawyers__nav-left'
    }
  });

  if (window.innerWidth > 500) {
    lawyersSlider.destroy();
  }
}


