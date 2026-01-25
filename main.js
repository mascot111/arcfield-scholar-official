// =========================================
//  1. NAV HIGHLIGHT (Intersection Observer)
// =========================================
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.ul-list li a');

const observerOptions = {
  root: null,
  rootMargin: '-50% 0px -50% 0px', // Highlights when section is in middle of screen
  threshold: 0
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      // Remove active class from all
      navLinks.forEach(link => link.parentElement.classList.remove('active'));
      
      // Add active class to current
      const id = entry.target.getAttribute('id');
      const activeLink = document.querySelector(`.ul-list li a[href="#${id}"]`);
      if (activeLink) {
        activeLink.parentElement.classList.add('active');
      }
    }
  });
}, observerOptions);

sections.forEach(section => {
  observer.observe(section);
});


// =========================================
//  2. SMOOTH CLICK HANDLER
// =========================================
navLinks.forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    const targetId = link.getAttribute('href').substring(1);
    const targetSection = document.getElementById(targetId);
    
    // Instant visual feedback
    navLinks.forEach(l => l.parentElement.classList.remove('active'));
    link.parentElement.classList.add('active');

    window.scrollTo({
      top: targetSection.offsetTop - 80, // Adjusts for header height
      behavior: 'smooth'
    });
  });
});


// =========================================
//  3. SCROLL REVEAL ANIMATION (Separated)
// =========================================
window.addEventListener('scroll', () => {
  const revealElements = document.querySelectorAll('.home-container, .about-container, .projects-container, .services-container, .contact-content');
  
  revealElements.forEach(el => {
    const windowHeight = window.innerHeight;
    const elementTop = el.getBoundingClientRect().top;
    const revealPoint = 150;

    if(elementTop < windowHeight - revealPoint){
      el.classList.add('active-reveal');
    }
  });
});


// =========================================
//  4. TYPING EFFECT
// =========================================
const typingElement = document.querySelector('.info-home h3'); 
const words = ["Educator in Training", "History Enthusiast", "Curriculum Designer", "Arts Advocate"];
let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingSpeed = 100;

function type() {
    if(!typingElement) return;
    const currentWord = words[wordIndex];
    let displayedText = currentWord.substring(0, charIndex);
    
    typingElement.innerHTML = displayedText + '<span class="cursor">|</span>';

    if (!isDeleting && charIndex < currentWord.length) {
        charIndex++;
        setTimeout(type, typingSpeed);
    } else if (isDeleting && charIndex > 0) {
        charIndex--;
        setTimeout(type, typingSpeed / 2);
    } else {
        isDeleting = !isDeleting;
        if (!isDeleting) {
            wordIndex = (wordIndex + 1) % words.length;
        }
        setTimeout(type, 1000);
    }
}
document.addEventListener('DOMContentLoaded', type);


// =========================================
//  5. LOADER ANIMATION
// =========================================
document.addEventListener("DOMContentLoaded", () => {
  const loadingText = document.getElementById("loading-text");
  const mainIcon = document.querySelector(".main-icon");
  const subIcons = document.querySelectorAll(".sub-icons i");
  const designerText = document.getElementById("designer-text");
  const mainPage = document.getElementById("main-page");
  const loadingScreen = document.getElementById("loading-screen");

  function showElement(element, delay=0){
    if(!element) return;
    setTimeout(() => {
      element.classList.remove("hidden");
      element.classList.add("fall");
    }, delay);
  }

  showElement(loadingText, 0);          
  showElement(mainIcon, 800);         
  subIcons.forEach((icon, idx) => {
    showElement(icon, 1600 + idx*400);  
  });
  showElement(designerText, 2800);    

  setTimeout(() => {
    if(loadingScreen) {
        loadingScreen.style.opacity = '0';
        setTimeout(() => loadingScreen.style.display='none', 500);
    }
    if(mainPage) mainPage.classList.add("visible");
  }, 4000);
});


// =========================================
//  6. SPOTLIGHT EFFECT
// =========================================
document.addEventListener("DOMContentLoaded", () => {
  const cards = document.querySelectorAll('.project-card, .service-card');

  cards.forEach(card => {
    card.addEventListener('mousemove', e => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);
    });
  });
});