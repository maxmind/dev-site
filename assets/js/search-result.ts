import GoogleSearch from './GoogleSearch';

window.addEventListener('DOMContentLoaded', () => {
  const loading = <HTMLDivElement>document.querySelector('.loading');
  const resultsCount = <HTMLElement>(
    document.querySelector('.search-results__count')
  );
  const resultsHeading = <HTMLHeadingElement>(
    document.querySelector('.search-results__heading')
  );
  const resultsList = <HTMLDivElement>(
    document.querySelector('.search-results__list')
  );

  const searchProperty = window.location.search;
  const urlSearchParams = new URLSearchParams(searchProperty);
  const query = urlSearchParams.get('query') ?? '';
  const startIndex = urlSearchParams.get('start');

  const fetchResults = async () => {
    try {
      const results = await GoogleSearch(query, startIndex);
      loading.style.display = 'none';

      const searchNext = <HTMLLinkElement>(
        document.querySelector('.search__next')
      );
      const searchPrev = <HTMLLinkElement>(
        document.querySelector('.search__previous')
      );

      if (results.items) {
        resultsHeading.textContent = `Search results for ${query}`;
        resultsCount.textContent = `Displaying results
          ${results.queries.request[0].startIndex}
          -
          ${
            results.queries.request[0].startIndex +
            results.queries.request[0].count -
            1
          }
          of
          ${results.queries.request[0].totalResults}`;

        results.items?.map((result) => {
          const article = document.createElement('article');
          article.className = 'search__result-list-item';

          const a = document.createElement('a');
          a.className = 'search__result-title';
          a.href = `${result.link}`;
          a.textContent = `${result.title}`;

          const small = document.createElement('small');
          small.className = 'search__result-url';
          small.textContent = `${result.link}`;

          const p = document.createElement('p');
          p.className = 'search__result-description';
          p.textContent = `${result.snippet}`;

          resultsList.appendChild(article);
          article.appendChild(a);
          article.appendChild(small);
          article.appendChild(p);
        });

        if (results.queries.nextPage) {
          searchNext.style.display = 'block';

          const nextUrl = new URL(document.location.href);
          nextUrl.search = new URLSearchParams({
            query: query,
            start: results.queries.nextPage[0].startIndex.toString(),
          }).toString();
          searchNext.href = nextUrl.toString();
        }

        if (results.queries.previousPage) {
          searchPrev.style.display = 'block';

          const prevUrl = new URL(document.location.href);
          prevUrl.search = new URLSearchParams({
            query: query,
            start: results.queries.previousPage[0].startIndex.toString(),
          }).toString();
          searchPrev.href = prevUrl.toString();
        }
      } else {
        resultsHeading.textContent = `No results found for ${query}`;
      }
    } catch {
      loading.style.display = 'none';

      const p = document.createElement('p');
      p.textContent = 'Please try again.';

      resultsHeading.textContent = 'There was an issue performing the search.';
      resultsHeading.appendChild(p);
    }
  };

  if (searchProperty) {
    if (query.trim() === '') {
      loading.style.display = 'none';
      resultsHeading.textContent = 'Please enter a search query';
    } else {
      fetchResults();
    }
  }
});
