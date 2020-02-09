const button = document.querySelector('.page-header__nav-burger');
const menuList = document.querySelector('.page-header__nav-list');
const activeClass = 'page-header__nav-list--open';

document.addEventListener('click', (e) => {
  if (e.target === button) menuList.classList.toggle(activeClass);
  else menuList.classList.remove(activeClass);
})
