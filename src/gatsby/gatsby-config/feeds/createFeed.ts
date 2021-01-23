import toHtml from 'hast-util-to-html';
import toHast from 'mdast-util-to-hast';
// eslint-disable-next-line import/no-unresolved
import type { Node, Parent } from 'unist';

interface IFeed {
  title: string;
  url: string,
}

export default (feed: IFeed): any => ({
  generator: '',
  output: `${feed.url}/rss.xml`,
  query: `
    {
      allMdx(
        filter: {
          fields: {
            slug: {
              eq: "${feed.url}"
            }
          }
        }
      ) {
        nodes {
          frontmatter {
            title
            description
            keywords
            draft
          }
          fields {
            slug
          }
          mdxAST
        }
      }
    }
  `,
  serialize: (args: any) => {
    const { query } = args;
    const { site, allMdx } = query;

    return allMdx.nodes.flatMap((node: any) => {
      const releaseNotes = (
        node.mdxAST as Parent
      ).children.filter((child: Node) =>
        child.name === 'ReleaseNote'
      );

      return releaseNotes.map((releaseNote: Node) => {
        const dateAttribute = (releaseNote.attributes as Node[]).find(
          (attribute: Node) => attribute.name === 'date'
        );

        if (!dateAttribute?.value) {
          throw Error('`date` attribute value is missing');
        }

        const url = [
          site.siteMetadata.siteUrl,
          node.fields.slug,
          `#${dateAttribute.value}`,
        ].join('');

        return {
          ...node.frontmatter,
          custom_elements: [
            {
              'content:encoded': (releaseNote.children as Node[]).map(
                (child: Node) => toHtml(toHast(child))
              ).join(''),
            },
          ],
          date: new Date(dateAttribute.value as string),
          guid: url,
          url,
        };
      });
    });
  },
  title: feed.title,
});
