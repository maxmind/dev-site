import { getNextPage, getPreviousPage } from './pagination';

jest.mock('../../content/navigation', () => ([
  {
    to: 'foo',
  },
  {
    items: [
      {
        to: 'bar-item-foo',
      },
      {
        to: 'bar-item-bar',
      },
    ],
    to: 'bar',
  },
  {
    url: '#',
  },
  {
    items: [
      {
        to: 'baz-item-foo',
      },
      {
        to: 'baz-item-bar',
      },
    ],
    secondaryItems: [
      {
        to: 'baz-secondary-foo',
      },
      {
        to: 'baz-secondary-bar',
      },
    ],
    to: 'baz',
  },
]));

describe('pagination', () => {
  describe('getPreviousPage()', () => {
    it('returns previous page', () => {
      expect(getPreviousPage('bar')).toHaveProperty('to', 'foo');
    });

    it('returns previous page when current url ends with a slash', () => {
      expect(getPreviousPage('bar/')).toHaveProperty('to', 'foo');
    });

    it('returns nothing if previous page does not exist', () => {
      expect(getPreviousPage('foo')).toBeUndefined;
    });

    it('skips non-internal nodes', () => {
      expect(getPreviousPage('baz')).toHaveProperty('to', 'bar-item-bar');
    });

    it('considers `items` child pages', () => {
      expect(getPreviousPage('baz')).toHaveProperty('to', 'bar-item-bar');
    });

    it('considers `secondaryItems` child pages', () => {
      expect(getPreviousPage('baz-secondary-bar'))
        .toHaveProperty('to', 'baz-secondary-foo');
    });
  });

  describe('getNextPage()', () => {
    it('returns next page', () => {
      expect(getNextPage('foo')).toHaveProperty('to', 'bar');
    });

    it('returns nothing if next page does not exist', () => {
      expect(getNextPage('baz-secondary-bar')).toBeUndefined();
    });

    it('skips non-internal nodes', () => {
      expect(getNextPage('bar-item-bar')).toHaveProperty('to', 'baz');
    });

    it('considers `items` child pages', () => {
      expect(getNextPage('bar')).toHaveProperty('to', 'bar-item-foo');
    });

    it('considers `secondaryItems` child pages', () => {
      expect(getNextPage('baz-item-bar'))
        .toHaveProperty('to', 'baz-secondary-foo');
    });
  });
});
