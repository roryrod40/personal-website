"use strict";

/***************************/
/* Variables */
/***************************/

const nav = document.querySelector(".nav");
const navList = document.querySelector(".nav-list");
const header = document.querySelector(".header");
const allSections = document.querySelectorAll(".section");
const slides = document.querySelectorAll(".project-slide");
const btnLeft = document.querySelector(".project-slider-btn-left");
const btnRight = document.querySelector(".project-slider-btn-right");
const dotContainer = document.querySelector(".project-dots");
const slider = document.querySelector(".project-slider");
const btnNavEl = document.querySelector(".nav-mobile-btn");
const navFull = document.querySelector(".nav-full");
const allLinks = document.querySelectorAll("a:link");
const headerDescription = document.querySelector(".header-description");
const headingPrimary = document.querySelector(".heading-primary");

/***************************/
/* Page Navigation */
/***************************/
// navList.addEventListener("click", function (e) {
//   // e.preventDefault();
//   if (e.target.classList.contains("nav-link")) {
//     const id = e.target.getAttribute("href");
//     document.querySelector(id).scrollIntoView({ behavior: "smooth" });
//   }
// });

/***************************/
/* Sticky Navigation */
/***************************/
const navHeight = navFull.getBoundingClientRect().height;

const stickyNav = function (entries) {
  const [entry] = entries;

  if (!entry.isIntersecting) {
    navFull.classList.add("sticky-nav");
  } else navFull.classList.remove("sticky-nav");
};

const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  thresthold: 0,
  rootMargin: `-${navHeight}px`,
});

headerObserver.observe(header);

/***************************/
/* Reveal Sections */
/***************************/
const revealSection = function (entries, observer) {
  const [entry] = entries;

  if (!entry.isIntersecting) return;
  entry.target.classList.remove("section--hidden");
  observer.unobserve(entry.target);
};

const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15,
});

allSections.forEach(function (section) {
  sectionObserver.observe(section);
  section.classList.add("section--hidden");
});

/***************************/
/* Slider */
/***************************/
const createSlider = function () {
  let currSlide = 0;
  const maxSlide = slides.length;
  //functions
  const createDots = function () {
    slides.forEach(function (_, i) {
      dotContainer.insertAdjacentHTML(
        "beforeend",
        `<button class="project-dot" data-slide="${i}"></button>`
      );
    });
  };

  const activateDot = function (slide) {
    document
      .querySelectorAll(".project-dot")
      .forEach(dot => dot.classList.remove("project-dot-active"));

    document
      .querySelector(`.project-dot[data-slide="${slide}"]`)
      .classList.add("project-dot-active");
  };

  const goToSlide = function (slide) {
    slides.forEach(
      (s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`)
    );
  };

  //Next and prev slide
  const nextSlide = function () {
    if (currSlide === maxSlide - 1) {
      currSlide = 0;
    } else {
      currSlide++;
    }
    goToSlide(currSlide);
    activateDot(currSlide);
  };

  const prevSlide = function () {
    if (currSlide === 0) {
      currSlide = maxSlide - 1;
    } else {
      currSlide--;
    }
    goToSlide(currSlide);
    activateDot(currSlide);
  };

  const init = function () {
    goToSlide(0);
    createDots();
    activateDot(0);
  };
  init();

  // Event handlers
  btnRight.addEventListener("click", nextSlide);
  btnLeft.addEventListener("click", prevSlide);
  document.addEventListener("keydown", function (e) {
    if (e.key === "ArrowLeft") prevSlide();
    if (e.key === "ArrowRight") nextSlide();
  });

  dotContainer.addEventListener("click", function (e) {
    if (e.target.classList.contains("project-dot")) {
      const { slide } = e.target.dataset;
      goToSlide(slide);
      activateDot(slide);
    }
  });
};
createSlider();

/***************************/
/* Mobile Navigation */
/***************************/
const toggleSendBack = function (elements) {
  elements.forEach(
    el => (el.style.display = el.style.display === "none" ? "" : "none")
  );
};

btnNavEl.addEventListener("click", function () {
  header.classList.toggle("nav-open");
  toggleSendBack([headerDescription, headingPrimary]);
});

allLinks.forEach(function (link) {
  link.addEventListener("click", function (e) {
    if (
      link.classList.contains("nav-link") &&
      header.classList.contains("nav-open")
    ) {
      header.classList.remove("nav-open");
      toggleSendBack([headerDescription, headingPrimary]);
    }
  });
});
