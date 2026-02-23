/* -----------------------------------------
  Have focus outline only for keyboard users 
 ---------------------------------------- */

const handleFirstTab = (e) => {
  if(e.key === 'Tab') {
    document.body.classList.add('user-is-tabbing')

    window.removeEventListener('keydown', handleFirstTab)
    window.addEventListener('mousedown', handleMouseDownOnce)
  }

}

const handleMouseDownOnce = () => {
  document.body.classList.remove('user-is-tabbing')

  window.removeEventListener('mousedown', handleMouseDownOnce)
  window.addEventListener('keydown', handleFirstTab)
}

window.addEventListener('keydown', handleFirstTab)

const backToTopButton = document.querySelector(".back-to-top");
let isBackToTopRendered = false;

let alterStyles = (isBackToTopRendered) => {
  backToTopButton.style.visibility = isBackToTopRendered ? "visible" : "hidden";
  backToTopButton.style.opacity = isBackToTopRendered ? 1 : 0;
  backToTopButton.style.transform = isBackToTopRendered
    ? "scale(1)"
    : "scale(0)";
};

window.addEventListener("scroll", () => {
  if (window.scrollY > 700) {
    isBackToTopRendered = true;
    alterStyles(isBackToTopRendered);
  } else {
    isBackToTopRendered = false;
    alterStyles(isBackToTopRendered);
  }
});

let currentIndex = 0;
let currentGallery = [];

/* ---------- Create lightbox elements ---------- */

const lightbox = document.createElement('div');
lightbox.className = 'lightbox';

const img = document.createElement('img');
const caption = document.createElement('div');
caption.className = 'lightbox-caption';

const left = document.createElement('div');
left.className = 'lightbox-arrow left';
left.textContent = '‹';

const right = document.createElement('div');
right.className = 'lightbox-arrow right';
right.textContent = '›';

const close = document.createElement('div');
close.className = 'lightbox-close';
close.textContent = '×';

lightbox.append(img, caption, left, right, close);
document.body.appendChild(lightbox);


/* ---------- Functions ---------- */

function showImage(index) {
  currentIndex = (index + currentGallery.length) % currentGallery.length;

  const el = currentGallery[currentIndex];

  img.src = el.src;
  caption.textContent = el.alt; // caption from alt text
}

function openLightbox(gallery, index) {
  currentGallery = gallery;
  showImage(index);
  lightbox.classList.add('open');
}

function closeLightbox() {
  lightbox.classList.remove('open');
}


/* ---------- Thumbnail clicks ---------- */

document.querySelectorAll('.project-gallery').forEach(gallery => {
  const images = Array.from(gallery.querySelectorAll('.gallery-thumb'));

  images.forEach((thumb, i) => {
    thumb.addEventListener('click', () => openLightbox(images, i));
  });
});


/* ---------- Controls ---------- */

left.onclick = (e) => {
  e.stopPropagation();
  showImage(currentIndex - 1);
};

right.onclick = (e) => {
  e.stopPropagation();
  showImage(currentIndex + 1);
};

close.onclick = closeLightbox;

lightbox.onclick = (e) => {
  if (e.target === lightbox) closeLightbox();
};


/* ---------- Keyboard support ---------- */

document.addEventListener('keydown', (e) => {
  if (!lightbox.classList.contains('open')) return;

  if (e.key === 'ArrowRight') showImage(currentIndex + 1);
  if (e.key === 'ArrowLeft') showImage(currentIndex - 1);
  if (e.key === 'Escape') closeLightbox();
});

/* =====================================
   Fade-in sections
===================================== */

const faders = document.querySelectorAll('.fade-up');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    entry.target.classList.toggle('visible', entry.isIntersecting);
  });
}, {
  threshold: 0,                 // 👈 KEY FIX
  rootMargin: "0px 0px -20% 0px" // optional nicer timing
});

faders.forEach(el => observer.observe(el));



/* =====================================
   Sidebar show after header scroll
===================================== */

const hero = document.querySelector('.header');
const sidebar = document.getElementById('profileSidebar');

if (sidebar && hero) {
  function toggleSidebar() {
    const heroBottom = hero.getBoundingClientRect().bottom;

    // Show only after header fully leaves viewport
    if (heroBottom <= 0) {
      sidebar.classList.add('visible');
    } else {
      sidebar.classList.remove('visible');
    }
  }

  window.addEventListener('scroll', toggleSidebar);
  window.addEventListener('load', toggleSidebar);
}
