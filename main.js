'use strict'
// 스크롤을 했을 때 Navbar 색상 변경 

const navbar = document.querySelector('#navbar');
const navbarHeight = navbar.getBoundingClientRect().height;


document.addEventListener('scroll', () => {
    console.log(window.scrollY);
    if(window.scrollY > navbarHeight) {
        navbar.classList.add('navbar--dark');
    } else {
        navbar.classList.remove('navbar--dark');
    }
});

// 핸들 스크롤링 
const navbarMenu = document.querySelector('.navbar__menu');
navbarMenu.addEventListener("click", (e) => {
    const target = e.target;
    const link = target.dataset.link;
    if (link == null) {
        return;
    }
    
    const scrollTo = document.querySelector(link);
    scrollTo.scrollIntoView({behavior: "smooth"});
})