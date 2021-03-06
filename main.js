// Active scrolling
const links = document.querySelectorAll('.nav a');
window.addEventListener('scroll', (event) => {
  // Change top nav active link if scrolled on another section
  let fromTop = window.scrollY;
  links.forEach((link) => {
    let section = document.querySelector(link.hash);
    if (
      section.offsetTop <= fromTop &&
      section.offsetTop + section.offsetHeight > fromTop
    ) {
      link.classList.add('active-navlink');
    } else {
      link.classList.remove('active-navlink');
    }
  });
  // Change header background on scroll
  checkHeader();
});

// Change header background if not on top of homepage
const header = document.querySelector('header');
function checkHeader() {
  if (document.body.scrollTop > 80 || document.documentElement.scrollTop > 80) {
    header.classList.add('dark-back');
  } else {
    header.classList.remove('dark-back');
  }
}

// Show/hide nav on menu icon
const menuIcon = document.querySelector('.menu-icon');
const nav = document.querySelectorAll('.nav');
menuIcon.addEventListener('click', () => {
  nav.forEach((navbar) => {
    navbar.classList.toggle('show-nav');
    if (navbar.classList.contains('show-nav')) {
      header.classList.add('dark-back');
    } else {
      checkHeader();
    }
  });
});

// Hide nav when link is clicked
links.forEach((link) => {
  link.addEventListener('click', () => {
    nav.forEach((navbar) => {
      navbar.classList.remove('show-nav');
      checkHeader();
    });
  });
});

// Specialties slider
const slides = document.querySelectorAll('.slide');
const btns = document.querySelectorAll('.slider-btn');
let currentSlide = 0;
let margin = 0;
// Manual navigation
const showSlide = (currentSlide) => {
  for (let i = 0; i < slides.length; i++) {
    slides[i].style.left = `${i * 100 - currentSlide * 100}vw`;
  }
  btns.forEach((btn) => {
    btn.classList.remove('active-slider-btn');
  });
  btns[currentSlide].classList.add('active-slider-btn');
};
btns.forEach((btn, i) => {
  btn.addEventListener('click', () => {
    showSlide(i);
    currentSlide = i;
  });
});
// Autoplay
setInterval(() => {
  currentSlide++;
  if (currentSlide >= slides.length) {
    currentSlide = 0;
  }
  showSlide(currentSlide);
}, 10000);

// Menu filtering
const filterButtons = document.querySelectorAll('.filter');
const items = document.querySelectorAll('.item');
function filterSelection(filter) {
  // Change active button
  filterButtons.forEach((btn) => {
    if (btn.classList.contains('active-filter')) {
      btn.classList.remove('active-filter');
    }
    if (btn.classList.contains(filter)) {
      btn.classList.add('active-filter');
    }
  });
  // Filter items
  items.forEach((item) => {
    if (item.classList.contains('hidden')) {
      item.classList.remove('hidden');
    }
    if (!item.classList.contains(filter)) {
      item.classList.add('hidden');
    }
  });
  // Check if it's small screen device
  smallScreenFilters();
}
// Small screen menu
const smallScreenFilters = () => {
  if (
    filterButtons[0].offsetWidth > 150 ||
    filterButtons[0].offsetWidth === 0
  ) {
    filterButtons.forEach((btn) => {
      btn.classList.toggle('hidden');
      if (btn.classList.contains('active-filter')) {
        btn.classList.toggle('hidden');
      }
    });
  }
};
filterSelection('soup');

// Google Maps
function myMap() {
  // Sets coordinates, zoom level (0-20) and displays map in div with #map
  const coords = new google.maps.LatLng(51.5133109, -0.2127897);
  const mapDiv = document.querySelector('.map');
  const mapProperties = {
    center: coords,
    zoom: 12,
    // Set cantrols to SMALL
    zoomControl: true,
  };
  // Displays map in div with #map
  const map = new google.maps.Map(mapDiv, mapProperties);
  // Animated marker
  const marker = new google.maps.Marker({ position: coords });
  marker.setMap(map);
}
