// Année automatique dans le footer
const yearSpan = document.getElementById("year");
if (yearSpan) {
  yearSpan.textContent = new Date().getFullYear();
}

// Menu burger amélioré
const navToggle = document.querySelector(".nav-toggle");
const nav = document.querySelector(".nav");

if (navToggle && nav) {
  navToggle.addEventListener("click", () => {
    nav.classList.toggle("open");
    navToggle.classList.toggle("active");
  });

  // Fermer le menu après un clic sur un lien
  document.querySelectorAll(".nav-link").forEach(link => {
    link.addEventListener("click", () => {
      nav.classList.remove("open");
      navToggle.classList.remove("active");
    });
  });
  
  // Fermer le menu si on clique en dehors
  document.addEventListener("click", (e) => {
    if (!nav.contains(e.target) && !navToggle.contains(e.target)) {
      nav.classList.remove("open");
      navToggle.classList.remove("active");
    }
  });
}

// Effet scrolled sur le header
const header = document.querySelector(".site-header");
if (header) {
  window.addEventListener("scroll", () => {
    if (window.scrollY > 20) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  });
}


// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener("click", function (e) {
    const href = this.getAttribute("href");
    if (!href || href === "#") return;
    const target = document.querySelector(href);
    if (!target) return;
    e.preventDefault();
    target.scrollIntoView({ behavior: "smooth", block: "start" });
  });
});

// Formulaire
const form = document.querySelector(".contact-form");
const statusEl = document.querySelector(".form-status");

if (form && statusEl) {
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    statusEl.textContent =
      "✅ Merci ! Votre demande a bien été envoyée. Nous vous recontactons rapidement.";
    statusEl.style.color = "#16a34a";
    form.reset();
    setTimeout(() => {
      statusEl.textContent = "";
    }, 5000);
  });
}

/* ========== CARROUSEL HERO AVEC BARRE DE PROGRESSION ========== */

const heroSlides = Array.from(document.querySelectorAll(".hero-bg-slide"));
const heroPrevBtn = document.querySelector(".hero-carousel-prev");
const heroNextBtn = document.querySelector(".hero-carousel-next");
const progressBar = document.querySelector(".hero-progress-bar");

if (heroSlides.length > 0) {
  let currentHeroIndex = 0;
  let progressInterval;
  let autoPlayInterval;
  const SLIDE_DURATION = 7000; // 7 secondes

  // Charger les images depuis photos/hero/
  // Supporte aussi d'autres formats : jpg, jpeg, png, webp
  heroSlides.forEach((slide, index) => {
    const imageNumber = index + 1;
    
    // Essayer plusieurs formats d'image
    const img = new Image();
    const formats = ['jpg', 'jpeg', 'png', 'webp'];
    let formatIndex = 0;
    
    function tryNextFormat() {
      if (formatIndex < formats.length) {
        img.src = `photos/hero/${imageNumber}.${formats[formatIndex]}`;
      }
    }
    
    img.onload = function() {
      slide.style.backgroundImage = `url('${img.src}')`;
      console.log(`✅ Image hero ${imageNumber} chargée: ${img.src}`);
    };
    
    img.onerror = function() {
      formatIndex++;
      if (formatIndex < formats.length) {
        tryNextFormat();
      } else {
        console.warn(`⚠️ Image hero ${imageNumber} introuvable dans photos/hero/`);
        // Appliquer un fond de secours
        slide.style.background = `linear-gradient(135deg, 
          ${index % 2 === 0 ? '#1e3a8a' : '#0f172a'} 0%, 
          ${index % 2 === 0 ? '#3b82f6' : '#1e40af'} 100%)`;
      }
    };
    
    tryNextFormat();
  });

  function updateHeroSlide() {
    heroSlides.forEach((slide, i) => {
      slide.classList.toggle("active", i === currentHeroIndex);
    });
    resetProgressBar();
  }

  function goToHeroSlide(index) {
    currentHeroIndex = (index + heroSlides.length) % heroSlides.length;
    updateHeroSlide();
  }

  function nextHeroSlide() {
    goToHeroSlide(currentHeroIndex + 1);
  }

  function prevHeroSlide() {
    goToHeroSlide(currentHeroIndex - 1);
  }

  // Barre de progression
  function resetProgressBar() {
    if (progressBar) {
      clearInterval(progressInterval);
      progressBar.style.width = "0%";
      
      let progress = 0;
      const incrementTime = 50;
      const incrementAmount = (100 / SLIDE_DURATION) * incrementTime;
      
      progressInterval = setInterval(() => {
        progress += incrementAmount;
        if (progress >= 100) {
          progress = 100;
          clearInterval(progressInterval);
        }
        progressBar.style.width = progress + "%";
      }, incrementTime);
    }
  }

  // Auto-play
  function startAutoPlay() {
    autoPlayInterval = setInterval(nextHeroSlide, SLIDE_DURATION);
  }

  function stopAutoPlay() {
    clearInterval(autoPlayInterval);
    clearInterval(progressInterval);
  }

  // Event listeners
  if (heroPrevBtn) heroPrevBtn.addEventListener("click", () => {
    stopAutoPlay();
    prevHeroSlide();
    startAutoPlay();
  });

  if (heroNextBtn) heroNextBtn.addEventListener("click", () => {
    stopAutoPlay();
    nextHeroSlide();
    startAutoPlay();
  });

  // Pause au survol
  const heroSection = document.querySelector(".hero");
  if (heroSection) {
    heroSection.addEventListener("mouseenter", stopAutoPlay);
    heroSection.addEventListener("mouseleave", () => {
      resetProgressBar();
      startAutoPlay();
    });
  }

  // Support clavier
  document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft") {
      stopAutoPlay();
      prevHeroSlide();
      startAutoPlay();
    }
    if (e.key === "ArrowRight") {
      stopAutoPlay();
      nextHeroSlide();
      startAutoPlay();
    }
  });

  // Démarrer
  updateHeroSlide();
  startAutoPlay();
}

/* ========== CHARGEMENT DES RÉALISATIONS ========== */

const realisationItems = Array.from(document.querySelectorAll(".realisation-item"));

if (realisationItems.length > 0) {
  realisationItems.forEach((item, index) => {
    const imageNumber = index + 1;
    
    // Essayer plusieurs formats d'image
    const img = new Image();
    const formats = ['jpg', 'jpeg', 'png', 'webp'];
    let formatIndex = 0;
    
    function tryNextFormat() {
      if (formatIndex < formats.length) {
        img.src = `photos/realisations/${imageNumber}.${formats[formatIndex]}`;
      }
    }
    
    img.onload = function() {
      item.style.backgroundImage = `url('${img.src}')`;
      console.log(`✅ Réalisation ${imageNumber} chargée: ${img.src}`);
    };
    
    img.onerror = function() {
      formatIndex++;
      if (formatIndex < formats.length) {
        tryNextFormat();
      } else {
        console.warn(`⚠️ Réalisation ${imageNumber} introuvable dans photos/realisations/`);
      }
    };
    
    tryNextFormat();
  });
}

/* ========== LIGHTBOX POUR RÉALISATIONS ========== */

const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const lightboxCounter = document.getElementById('lightbox-counter');
const lightboxClose = document.querySelector('.lightbox-close');
const lightboxPrev = document.querySelector('.lightbox-prev');
const lightboxNext = document.querySelector('.lightbox-next');

// Utiliser un délai pour s'assurer que les images sont chargées
setTimeout(() => {
  const realisationCards = document.querySelectorAll('.realisation-item');
  
  if (lightbox && realisationCards.length > 0) {
    let currentImageIndex = 0;
    const images = [];

    // Récupérer toutes les images de fond des réalisations
    realisationCards.forEach((item, index) => {
      const bgImage = window.getComputedStyle(item).backgroundImage;
      const imageUrl = bgImage.slice(5, -2);
      
      if (imageUrl && imageUrl !== 'none') {
        images.push(imageUrl);
        
        // Ajouter un événement de clic sur chaque réalisation
        item.addEventListener('click', () => {
          currentImageIndex = index;
          openLightbox(imageUrl);
        });
      }
    });

    function openLightbox(imageSrc) {
      lightboxImg.src = imageSrc;
      lightbox.classList.add('active');
      document.body.style.overflow = 'hidden';
      updateCounter();
    }

    function closeLightbox() {
      lightbox.classList.remove('active');
      document.body.style.overflow = '';
    }

    function showNextImage() {
      currentImageIndex = (currentImageIndex + 1) % images.length;
      lightboxImg.src = images[currentImageIndex];
      updateCounter();
    }

    function showPrevImage() {
      currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
      lightboxImg.src = images[currentImageIndex];
      updateCounter();
    }

    function updateCounter() {
      lightboxCounter.textContent = `${currentImageIndex + 1} / ${images.length}`;
    }

    // Event listeners
    if (lightboxClose) {
      lightboxClose.addEventListener('click', closeLightbox);
    }

    if (lightboxNext) {
      lightboxNext.addEventListener('click', showNextImage);
    }

    if (lightboxPrev) {
      lightboxPrev.addEventListener('click', showPrevImage);
    }

    // Fermer avec la touche Échap
    document.addEventListener('keydown', (e) => {
      if (!lightbox.classList.contains('active')) return;
      
      if (e.key === 'Escape') {
        closeLightbox();
      } else if (e.key === 'ArrowRight') {
        showNextImage();
      } else if (e.key === 'ArrowLeft') {
        showPrevImage();
      }
    });

    // Fermer en cliquant sur le fond noir
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) {
        closeLightbox();
      }
    });
  }
}, 500); // Délai pour laisser les images se charger
