import GithubSlugger from 'github-slugger';
import toHtml from 'hast-util-to-html';
import toHast from 'mdast-util-to-hast';
// eslint-disable-next-line import/no-unresolved
import type { Parent } from 'unist';

interface IFeed {
  description: string;
  title: string;
  url: string,
}

export default (feed: IFeed): any => ({
  description: `${feed.description}`,
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
      ).children.filter((child: any) =>
        child.name === 'ReleaseNote'
      );

      return releaseNotes.map((releaseNote: any) => {
        const dateAttribute = (releaseNote.attributes as any[]).find(
          (attribute: any) => attribute.name === 'date'
        );

        const titleAttribute = (releaseNote.attributes as any[]).find(
          (attribute: any) => attribute.name === 'title'
        );

        if (!dateAttribute?.value) {
          throw Error('`date` attribute value is missing');
        }

        if (!titleAttribute?.value) {
          throw Error('`title` attribute value is missing');
        }

        // Assume publish time is around noon office standard time
        const dateString = `${dateAttribute.value} 12:00:00 GMT -0400`;

        const url = [
          site.siteMetadata.siteUrl,
          node.fields.slug,
          `#${GithubSlugger.slug(titleAttribute.value)}`,
        ].join('');

        return {
          ...node.frontmatter,
          custom_elements: [
            {
              'content:encoded': (releaseNote.children as any[]).map(
                (child: any) => {
                  return toHtml(toHast(child) as any);
                }
              ).join(''),
            },
          ],
          date: new Date(dateString),
          guid: url,
          title: titleAttribute.value,
          url,
        };
      });
    });
  },
  title: feed.title,
});
