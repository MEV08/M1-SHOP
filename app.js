const nav = document.querySelector('#nav');
const burger = document.querySelector('#burger');
const sizesItem = document.querySelectorAll('.catalog-item__sizes-item');
const navLinks = document.querySelectorAll('.header-nav__list-link[data-scroll]');
const orderBtns = document.querySelectorAll('.catalog-item__btn');
const modal = document.querySelector('#modal');
const body = document.querySelector('body');
const close = document.querySelector('#close');
const mainLogo = document.querySelector('#mainLogo');
const introBtns = document.querySelectorAll('.intro-btn[data-go]');
const introCas = document.querySelector('#introCas');
const introEro = document.querySelector('#introEro');
const casual = document.querySelector('#casual');
const erotic = document.querySelector('#erotic');
const catalogItems = document.querySelectorAll('.catalog-item');
const getOrder = document.querySelector('#getOrder');

casual.closest('li').classList.add('active');
catalogItems.forEach(item => {
    if (item.classList.contains('casual')) {
        item.style.display = 'block';
    } else {
        item.style.display = 'none';
    }
})
function removeSize() {
    sizesItem.forEach(item => {
        item.classList.remove('active')
    })
}
function menuLinkClick(e) {
    const menuLink = e.target;
    if (menuLink.dataset.scroll && document.querySelector(menuLink.dataset.scroll)) {
        const scroll = document.querySelector(menuLink.dataset.scroll);
        console.log(scroll)
        const scrollToValue = scroll.getBoundingClientRect().top + scrollY - document.querySelector('.header').offsetHeight;
        console.log(scrollToValue)
        window.scrollTo({
            top: scrollToValue,
            behavior: 'smooth'
        });
        e.preventDefault();
        burger.classList.remove('active');
        nav.classList.toggle('show');
    }
}
// function introBtnClick(e) {
//     const introBtn = e.target;
    
// }
function openModal() {
    modal.classList.add('open');
    body.classList.add('no-scroll');
}
function closeModal() {
    modal.classList.remove('open');
    body.classList.remove('no-scroll');
}
function openErotic() {
    if (casual.closest('.catalog-nav__list-item').classList.contains('active')) {
        casual.closest('.catalog-nav__list-item').classList.remove('active');
        erotic.closest('.catalog-nav__list-item').classList.add('active');
        catalogItems.forEach(item => {
            if (item.classList.contains('casual')) {
                item.style.display = 'none';
            } else {
                item.style.display = 'block';
            }
        })
    }
}
function openCasual() {
    if (erotic.closest('.catalog-nav__list-item').classList.contains('active')) {
        erotic.closest('.catalog-nav__list-item').classList.remove('active');
        casual.closest('.catalog-nav__list-item').classList.add('active');
        catalogItems.forEach(item => {
            if (item.classList.contains('erotic')) {
                item.style.display = 'none';
            } else {
                item.style.display = 'block';
            }
        })
    }
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
introBtns.forEach(item => {
    item.addEventListener('click', (item) => {
        const link = item.target;
        const goTo = document.querySelector(link.dataset.go);
        const goToValue = goTo.getBoundingClientRect().top + scrollY - document.querySelector('header').offsetHeight;
        window.scrollTo({
            top: goToValue,
            behavior: 'smooth'
        });
    });
});
introCas.addEventListener('click', () => {
    openCasual();
})
introEro.addEventListener('click', () => {
    openErotic();
})
erotic.addEventListener('click', (e) => {
    e.preventDefault();
    openErotic();
});
casual.addEventListener('click', (e) => {
    e.preventDefault();
    openCasual();
});
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
modal.addEventListener('click', () => {
    let popup = modal.querySelector('.popup');
    popup.addEventListener('click', e => {
        e.stopPropagation();
    })
    closeModal();
});
getOrder.addEventListener('click', () => {
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