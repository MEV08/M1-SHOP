const nav = document.querySelector('#nav');
const burger = document.querySelector('#burger');
const sizesItem = document.querySelectorAll('.catalog-item__sizes-item');
const navLinks = document.querySelectorAll('.header-nav__list-link[data-scroll]');
const orderBtns = document.querySelectorAll('.catalog-item__btn');
const modal = document.querySelector('#modal');
const body = document.querySelector('body');
const close = document.querySelector('#close');
const mainLogo = document.querySelector('#mainLogo');


function removeSize() {
    sizesItem.forEach(item => {
        item.classList.remove('active')
    })
}
function menuLinkClick(e) {
    const menuLink = e.target;
    if (menuLink.dataset.scroll && document.querySelector(menuLink.dataset.scroll)) {
        const scroll = document.querySelector(menuLink.dataset.scroll);
        const scrollToValue = scroll.getBoundingClientRect().top + scrollY - document.querySelector('.header').offsetHeight;
        window.scrollTo({
            top: scrollToValue,
            behavior: 'smooth'
        });
        e.preventDefault();
        burger.classList.remove('active');
        nav.classList.toggle('show');
    }
}
function openModal() {
    modal.classList.add('open');
    body.classList.add('no-scroll');
}
function closeModal() {
    modal.classList.remove('open');
    body.classList.remove('no-scroll');
}
mainLogo.addEventListener('click', () => {
    if (nav.classList.contains('show')) {
        nav.classList.remove('show');
        burger.classList.remove('active');
    }
})
burger.addEventListener('click', () => {
    nav.classList.toggle('show');
    burger.classList.contains('active') ? burger.classList.remove('active') : burger.classList.add('active');
});
if (navLinks.length > 0) {
    navLinks.forEach(item => {
        item.addEventListener('click', menuLinkClick);
    });
};
sizesItem.forEach(item => {
    item.addEventListener('click', (e) => {
        e.preventDefault();
        removeSize();
        if (!item.classList.contains('absent')) item.classList.add('active');       
    });
});
orderBtns.forEach(item => {
    item.addEventListener('click', e => {
        openModal();
    })
});
close.addEventListener('click', () => {
    closeModal();
}); 
modal.addEventListener('click', event => {
    let popup = modal.querySelector('.popup');
    popup.addEventListener('click', e => {
        e.stopPropagation();
    })
    closeModal();
})

class Dropdown {
    constructor(selector, options) {
        this.$el = document.querySelector(selector);
        this.items = options.items;
        this.$el.querySelector('.popup-info__select').textContent = this.items[0].label;
        this.$el.addEventListener('click', event => {
            if (event.target.classList.contains('popup-info__select')) {
                if (this.$el.classList.contains('open')) {
                    this.close();
                } else { 
                    this.open();
                }
            } else if (event.target.classList.contains('popup-info__dropdown-item')) {
                this.select(event.target.dataset.id);
            }
        });
        const itemsHTML = this.items.map(i => {
            return `<li class="popup-info__dropdown-item" data-id="${i.id}">${i.label}</li>`
        }).join(' ');
        this.$el.querySelector('.popup-info__dropdown-menu').insertAdjacentHTML('afterbegin', itemsHTML);
    }
    select(id) {
        const item = this.items.find(i => i.id === id);
        this.$el.querySelector('.popup-info__select').textContent = item.label;
        this.close();
    }
    open() {
        this.$el.classList.add('open');
    }
    close() {
        this.$el.classList.remove('open');
    }
}

const dropdown = new Dropdown('#dropdown', {
    items: [
        {label: 'XS', id: 'xs'},
        {label: 'S', id: 's'},
        {label: 'M', id: 'm'},
        {label: 'L', id: 'l'},
        {label: 'XL', id: 'xl'},
        {label: 'XXL', id: 'xxl'}
    ]
})