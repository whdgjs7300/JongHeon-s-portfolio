'use strict'
// 스크롤을 했을 때 Navbar 색상 변경 

const navbar = document.querySelector('#navbar');
const navbarHeight = navbar.getBoundingClientRect().height;


document.addEventListener('scroll', () => {
    if(window.scrollY > navbarHeight) {
        navbar.classList.add('navbar--dark');
    } else {
        navbar.classList.remove('navbar--dark');
    }
});

// Navbar menu 클릭시 스크롤링 
const navbarMenu = document.querySelector('.navbar__menu');
navbarMenu.addEventListener("click", (e) => {
    const link = e.target.dataset.link;
    if (link == null) {
        return;
    }
    scrollIntoView(link);
})
// Contact 버튼을 클릭 시 링크로 이동

const homeContactBtn = document.querySelector('.home__contact');
homeContactBtn.addEventListener('click', ()=> {
    scrollIntoView('#contact')
});

// Home 화면을 스크롤 했을 때 점점 투명해짐
const home = document.querySelector('.home__container');
const homeHeight = home.getBoundingClientRect().height;

document.addEventListener('scroll', () => {
    home.style.opacity = 1-window.scrollY / homeHeight;
})




// 스크롤 함수설정
function scrollIntoView(selector) {
    const scrollTo = document.querySelector(selector);
    scrollTo.scrollIntoView({behavior: "smooth"});
} 


