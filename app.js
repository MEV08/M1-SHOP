const nav = document.querySelector('#nav');
const burger = document.querySelector('#burger');

burger.addEventListener('click', () => {
    nav.classList.toggle('show');
    burger.classList.contains('active') ? burger.classList.remove('active') : burger.classList.add('active');
})