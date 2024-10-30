// Handle on load behaviour
document
  .querySelectorAll<HTMLAnchorElement>('.js-sidebar-parent')
  .forEach((sidebarParent) => {
    const child = sidebarParent.parentNode?.querySelector(
      '.js-sidebar-child-group'
    );
    const caret = sidebarParent
      .querySelector('.js-sidebar-toggle')
      ?.querySelector('.caret');

    const isExpanded = sidebarParent.classList.contains('is-active');

    sidebarParent.setAttribute('aria-expanded', isExpanded ? 'true' : 'false');
    child?.setAttribute('aria-hidden', isExpanded ? 'false' : 'true');
    child?.classList.toggle('hide', !isExpanded);
    caret?.classList.toggle('rotate', !isExpanded);
  });

// Handle toggle click behaviour
document.querySelectorAll('.js-sidebar-parent').forEach((toggle) => {
  toggle.addEventListener('click', (e) => {
    e.preventDefault();
    const child = toggle.parentNode?.querySelector('.js-sidebar-child-group');
    const caret = toggle.querySelector('.caret');

    // We aren't using the class here because expanded parents are not always active
    const isExpanded = toggle?.getAttribute('aria-expanded') === 'true';

    toggle?.setAttribute('aria-expanded', isExpanded ? 'false' : 'true');
    child?.setAttribute('aria-hidden', isExpanded ? 'true' : 'false');
    child?.classList.toggle('hide', isExpanded);
    caret?.classList.toggle('rotate', isExpanded);
  });
});

// Handle mobile menu toggle
const sidebarContainer = document.querySelector('.page__sidebar');
document
  .getElementById('sidebar-toggle')
  ?.addEventListener('click', function (e) {
    e.preventDefault();
    this.classList.toggle('is-active');
    sidebarContainer?.classList.toggle('show');
  });
