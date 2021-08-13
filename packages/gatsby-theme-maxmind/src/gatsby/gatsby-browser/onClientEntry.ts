import cssVars from 'css-vars-ponyfill';
import { GatsbyBrowser } from 'gatsby';

export const onClientEntry: GatsbyBrowser['onClientEntry'] = async () => {
  cssVars();

  if (!Element.prototype.matches) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    Element.prototype.matches = (Element as any).prototype.msMatchesSelector;
  }

  if (typeof CustomEvent !== 'function') {
    await require('custom-event-polyfill');
  }

  if (typeof fetch === 'undefined') {
    await require('whatwg-fetch');
  }

  if (typeof IntersectionObserver === 'undefined') {
    await require('intersection-observer');
  }

  if (typeof Promise.all === undefined || typeof Promise.race === 'undefined') {
    await require('promise-polyfill/src/polyfill');
  }

  if (typeof URLSearchParams === 'undefined') {
    await require('url-search-params-polyfill');
  }
};
