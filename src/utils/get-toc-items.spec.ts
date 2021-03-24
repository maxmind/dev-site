import generateTableOfContents, { createImportPathMap } from './get-toc-items';
import directSchemas from './get-toc-items--direct.fixture.json';
import indirectSchemas from './get-toc-items--indirect.fixture.json';

const minFraudImportPathMap = createImportPathMap(
  `${process.cwd()}/content/minfraud/api-documentation/_schemas`
);

describe('getTocItems()', () => {
  it('works with direct `Schema` component usage', async () => {
    const mdast = (
      directSchemas as any
    ).data.allMdx.nodes[0].customTableOfContents;

    const toc = generateTableOfContents(mdast, minFraudImportPathMap);

    const expected = {
      items: [
        {
          items: [
            {
              title: 'Level 1a - Link 1',
              url: '#schema--level-1a---link-1',
            },
            {
              items: [
                {
                  title: 'Level 2a - Link 1',
                  url: '#schema--level-2a---link-1',
                },
                {
                  title: 'Level 2a - Link 2',
                  url: '#schema--level-2a---link-2',
                },
              ],
              title: 'Level 2a',
              url: '#level-2a',
            },
            {
              items: [
                {
                  title: 'Level 2b - Link 1',
                  url: '#schema--level-2b---link-1',
                },
                {
                  title: 'Level 2b - Link 2',
                  url: '#schema--level-2b---link-2',
                },
              ],
              title: 'Level 2b',
              url: '#level-2b',
            },
          ],
          title: 'Level 1a',
          url: '#level-1a',
        },
        {
          items: [
            {
              title: 'Level 1b - Link 1',
              url: '#schema--level-1b---link-1',
            },
          ],
          title: 'Level 1b',
          url: '#level-1b',
        },
      ],
    };

    expect(toc).toEqual(expected);
  });

  it('works with indirect `Schema` component usage', async () => {
    const mdast = (indirectSchemas as any)
      .data.allMdx.nodes[0].customTableOfContents;

    const toc = generateTableOfContents(mdast, minFraudImportPathMap);

    const expected = {
      items: [
        {
          title: 'Authorization and Security',
          url: '#authorization-and-security',
        },
        {
          title: 'Service Endpoints',
          url: '#service-endpoints',
        },
        {
          title: 'Headers',
          url: '#headers',
        },
        {
          title: 'Bodies',
          url: '#bodies',
        },
        {
          items: [
            {
              title: 'Request',
              url: '#schema--request',
            },
            {
              title: 'Request › Device',
              url: '#schema--request--device',
            },
            {
              title: 'Request › Event',
              url: '#schema--request--event',
            },
            {
              title: 'Request › Account',
              url: '#schema--request--account',
            },
            {
              title: 'Request › Email',
              url: '#schema--request--email',
            },
            {
              title: 'Request › Billing',
              url: '#schema--request--billing',
            },
            {
              title: 'Request › Shipping',
              url: '#schema--request--shipping',
            },
            {
              title: 'Request › Payment',
              url: '#schema--request--payment',
            },
            {
              title: 'Request › Credit Card',
              url: '#schema--request--credit-card',
            },
            {
              title: 'Request › Order',
              url: '#schema--request--order',
            },
            {
              title: 'Request › Shopping Cart',
              url: '#schema--request--shopping-cart',
            },
            {
              title: 'Request › Shopping Cart › Item',
              url: '#schema--request--shopping-cart--item',
            },
            {
              title: 'Request › Custom Inputs',
              url: '#schema--request--custom-inputs',
            },
          ],
          title: 'Object Reference',
          url: '#object-reference',
        },
      ],
    };

    expect(toc).toEqual(expected);
  });
});
