const siteHeader = document.querySelector('.site-header');
const slides = document.querySelectorAll('.hero-slide');
const dots = document.querySelectorAll('.carousel-dots button');
const prevBtn = document.querySelector('.carousel-arrow.prev');
const nextBtn = document.querySelector('.carousel-arrow.next');
let currentSlide = 0;
let carouselTimer;

function updateHeaderState(){
  if (!siteHeader) return;
  siteHeader.classList.toggle('is-scrolled', window.scrollY > 20);
}
window.addEventListener('scroll', updateHeaderState);
updateHeaderState();

function showSlide(index){
  if (!slides.length) return;
  currentSlide = (index + slides.length) % slides.length;
  slides.forEach((slide, i) => slide.classList.toggle('is-active', i === currentSlide));
  dots.forEach((dot, i) => dot.classList.toggle('is-active', i === currentSlide));
}

function nextSlide(){
  showSlide(currentSlide + 1);
}

function startCarousel(){
  clearInterval(carouselTimer);
  carouselTimer = setInterval(nextSlide, 5200);
}

if (slides.length) {
  prevBtn?.addEventListener('click', () => {
    showSlide(currentSlide - 1);
    startCarousel();
  });

  nextBtn?.addEventListener('click', () => {
    nextSlide();
    startCarousel();
  });

  dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
      showSlide(index);
      startCarousel();
    });
  });

  startCarousel();
}

const navToggle = document.querySelector('.nav-toggle');
const mainNav = document.querySelector('.main-nav');

if (navToggle && mainNav) {
  navToggle.addEventListener('click', () => {
    const isOpen = mainNav.classList.toggle('is-open');
    navToggle.setAttribute('aria-expanded', String(isOpen));
  });
}

const timePoints = document.querySelectorAll('.time-point');
const dailyPhoto = document.getElementById('dailyPhoto');
let timeIndex = 0;
let timelineTimer;

function activateTimePoint(index){
  timePoints.forEach((point, i) => point.classList.toggle('is-active', i === index));

  const activePoint = timePoints[index];
  if (dailyPhoto && activePoint) {
    const image = activePoint.dataset.image;
    const alt = activePoint.dataset.alt || '';
    const title = activePoint.dataset.title || '';

    if (image) dailyPhoto.src = image;
    dailyPhoto.alt = alt;
    dailyPhoto.title = title;
    dailyPhoto.setAttribute('aria-label', alt);
  }
}

function startTimeline(){
  clearInterval(timelineTimer);
  timelineTimer = setInterval(() => {
    timeIndex = (timeIndex + 1) % timePoints.length;
    activateTimePoint(timeIndex);
  }, 3600);
}

if (timePoints.length) {
  timePoints.forEach((point, index) => {
    point.addEventListener('click', () => {
      timeIndex = index;
      activateTimePoint(timeIndex);
      startTimeline();
    });
  });

  activateTimePoint(timeIndex);
  startTimeline();
}
