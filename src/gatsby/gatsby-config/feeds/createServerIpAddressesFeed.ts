export default (): any => ({
  description: 'Feed of MaxMind server addresses.',
  generator: '',
  output: 'maxmind-server-ip-addresses.xml',
  query: `
    {
      allJson {
        nodes {
          IPv4
          IPv6
          lastUpdated
        }
      }
      site {
        siteMetadata {
          siteUrl
        }
      }
    }
  `,
  serialize: (args: any) => {
    const { query } = args;
    const { allJson } = query;
    const { siteUrl } = query.site.siteMetadata;

    const date = new Date(allJson.nodes[0].lastUpdated);

    return [
      {
        custom_elements: [
          {
            // eslint-disable-next-line security/detect-object-injection
            'content:encoded': [
              ...allJson.nodes[0].IPv4,
              '',
              ...allJson.nodes[0].IPv6,
            ].join('<br />'),
          },
        ],
        date,
        guid: `${siteUrl}/maxmind-server-ip-addresses?t=${date.getTime()}`,
        title: 'MaxMind Server IP Addresses',
        url: `${siteUrl}/maxmind-server-ip-addresses`,
      },
    ];
  },
  title: 'MaxMind Server IP Addresses',
});
