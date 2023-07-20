'use strict'
// 스크롤을 했을 때 Navbar 색상 변경 

const navbar = document.querySelector('#navbar');
const navbarHeight = navbar.getBoundingClientRect().height;

// 슬라이더
const sliderContainer = document.getElementById("slider");
const words = ["집 념 !", "성 장 !", "성 과 !", "가능성 !"];
let currentIndex = 0;

function slideWords() {
    sliderContainer.innerHTML = `<p>${words[currentIndex]}</p>`;
    currentIndex = (currentIndex + 1) % words.length;
    setTimeout(slideWords, 1500); 
}

slideWords();



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
    navbarMenu.classList.remove('open');
    scrollIntoView(link); 
    })

// Navbar Toggle button 반응형 화면 출력
const navbarToggleBtn = document.querySelector('.navbar__toggle-btn');
navbarToggleBtn.addEventListener('click',() => {
    navbarMenu.classList.toggle('open');
})


// Contact 버튼을 클릭 시 링크로 이동

const homeContactBtn = document.querySelector('.home__contact');
homeContactBtn.addEventListener('click', ()=> {
    scrollIntoView('#contact');
    
});

// Home 화면을 스크롤 했을 때 점점 투명해짐
/* 
const home = document.querySelector('.home__container');
const homeHeight = home.getBoundingClientRect().height;

document.addEventListener('scroll', () => {
    home.style.opacity = 1-window.scrollY / homeHeight; 
}) */

// 버튼 올리기 -스크롤시
const arrowUp = document.querySelector('.arrow-up')
document.addEventListener('scroll', ()=>{
    if(window.scrollY > homeHeight /2) {
        arrowUp.classList.add('visible');
    } else {
        arrowUp.classList.remove('visible');
    }
});

// arrow up - click
arrowUp.addEventListener('click', ()=> {
    scrollIntoView('#home')
})

// Projects 
const workBtnContainer = document.querySelector('.work__categories');
const projectContainer = document.querySelector('.work__projects');
const Projects = document.querySelectorAll('.project');

workBtnContainer.addEventListener('click', (e) => {
    const filter = e.target.dataset.filter || e.target.parentNode.dataset.filter;
    if(filter == null) {
        return;
    }
    // 클릭했을 때 카테고리 버튼 하나만 설정
    const active = document.querySelector('.category__btn.selected');
    active.classList.remove('selected');
    // e.target이 숫자를 눌렀을 때 span태그가 되어서 부모노드(버튼)로 지정
    const target = e.target.nodeName === 'BUTTON' ? e.target :
                    e.target.parentNode;
    target.classList.add('selected');

    projectContainer.classList.add('anim-out');
    setTimeout(()=>{
        Projects.forEach((project)=> {
            if(filter === '*' || filter === project.dataset.type) {
                project.classList.remove('invisible');
            } else {
                project.classList.add('invisible');
            }
        }); 

        projectContainer.classList.remove('anim-out');
    },300);
    
});


// 스크롤 함수설정
function scrollIntoView(selector) {
    const scrollTo = document.querySelector(selector);
    scrollTo.scrollIntoView({behavior: "smooth"});
    
} 


// 1. 모든 섹션 요소들을 가지고 온다
// 2. IntersetionObserver를 이용해서 모든 섹션을 관찰함
// 3. 보여지는 섹션에 해당하는 메뉴 아이템을 활성화 시킨다

const sectionId = ['#home', '#about',  '#work', '#contact'];


const sections = sectionId.map((id)=> document.querySelector(id));
const navItems = sectionId.map((id)=> document.querySelector(`[data-link="${id}"]`));


let selectedNavIndex = 0;
let selectedNavItem = navItems[0];
function selectNavItem(selected) {
    selectedNavItem.classList.remove('active');
    selectedNavItem = selected;
    selectedNavItem.classList.add('active');
    }

const observerOption = {
    root : null,
    rootMagin : '0px',
    thershold: 0.3,
}

const observerCallback = (entries, observer) => {
    entries.forEach(entry => {
        if(!entry.isIntersecting){
            const index = sectionId.indexOf(`#${entry.target.id}`);
            if(entry.boundingClientRect.y < 0) {
                selectedNavIndex = index +1;
            }else {
                selectedNavIndex = index -1;
            }
        }
    });
}
const observer = new IntersectionObserver(observerCallback, observerOption);
sections.forEach((section) => observer.observe(section));

window.addEventListener('wheel', () => {
    if (window.scrollY === 0) {
        selectedNavIndex = 0;
        } else if (
        window.scrollY + window.innerHeight ===
        document.body.clientHeight
        ) {
        selectedNavIndex = navItems.length - 1;
        }
        selectNavItem(navItems[selectedNavIndex]);
    });
