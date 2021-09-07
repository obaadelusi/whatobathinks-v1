const hamIcon = document.querySelector('#ham-icon');
const mobileMenu = document.querySelector('#mobile-menu');
const buttonClose = document.querySelector('#button-close');

hamIcon.addEventListener('click', () => {
   mobileMenu.classList.toggle('show-mobile-menu');
   //    document.body.style.overflow = 'hidden';
});

buttonClose.addEventListener('click', () => {
   mobileMenu.classList.remove('show-mobile-menu');
});
