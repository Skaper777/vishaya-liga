if (document.querySelector('.feedbacks-slider')) {
  const feedbackSlider = new Swiper('.feedbacks-slider', {
    spaceBetween: 40,
    loop: true,
    navigation: {
      nextEl: '.feedbacks-slider__nav-right',
      prevEl: '.feedbacks-slider__nav-left'
    }
  });

  if (window.innerWidth > 992) {
    feedbackSlider.destroy();
  }
}


