const minfraudCategory = document.querySelector('[data-category-name="minfraud"]');
const geoipCategory = document.querySelector('[data-category-name="geoip"]');

if (window.location.pathname.startsWith('/geoip')) {
  geoipCategory.classList.remove('is-closed');
} else if (window.location.pathname.startsWith('/minfraud')) {
  minfraudCategory.classList.remove('is-closed');
}

const sidebarLinks = document.querySelectorAll('.sidebar__link');

sidebarLinks.forEach((link) => {
  const href = link.getAttribute('href');
  if (window.location.pathname.includes(href)) {
    link.classList.add('sidebar__link-active');
  }
})
