window.addEventListener('DOMContentLoaded', () => {
  const $searchBtn = <HTMLButtonElement>(
    document.querySelector('.search__button')
  );
  const $searchBar = <HTMLElement>document.querySelector('.searchbar');
  const $searchBarInput = <HTMLInputElement>(
    document.querySelector('.searchbar .input')
  );

  $searchBtn.addEventListener('click', () => {
    $searchBar.classList.add('searchbar__open');
    $searchBarInput.focus();
  });

  const showSearchBar = () => {
    if ($searchBarInput === document.activeElement) {
      $searchBar.classList.add('searchbar__open');
      $searchBtn.style.display = 'none';
    } else {
      $searchBar.classList.remove('searchbar__open');
      $searchBtn.style.display = 'block';
    }
  };

  document.body.addEventListener('click', showSearchBar);
});
