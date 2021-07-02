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
        }
      }
      file {
        modifiedTime
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
    const { modifiedTime } = query.file;
    const { siteUrl } = query.site.siteMetadata;

    const date = new Date(modifiedTime);

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
        url: `${siteUrl}/maxmind-server-ip-addresses?lang=en`,
      },
    ];
  },
  title: 'MaxMind Server IP Addresses',
});
