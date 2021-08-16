import { IThemeOptions } from '@theme/gatsby/gatsby-config';

import createReleaseNotesFeed from '../feeds/createReleaseNotesFeed';
import createServerIpAddressesFeed from '../feeds/createServerIpAddressesFeed';

const GATSBY_URL= process.env.GATSBY_URL || 'http://localhost:5000';
const PROJECT_ROOT = `${__dirname}/../../../../`;
const SITE_ROOT = `${__dirname}/../../`;

const themeOptions: IThemeOptions = {
  defaultLayouts: {
    home: require.resolve(`${SITE_ROOT}src/templates/Home`),
  },
  feeds: [
    createReleaseNotesFeed({
      description: 'Release notes for MaxMind\'s GeoIP2 product line',
      title: 'GeoIP2 Release Notes',
      url: '/geoip/release-notes',
    }),
    createReleaseNotesFeed({
      description: 'Release notes for MaxMind\'s minFraud product line',
      title: 'minFraud Release Notes',
      url: '/minfraud/release-notes',
    }),
    createServerIpAddressesFeed(),
  ],
  gtmTrackingId: 'UA-171943-3',
  icon: 'src/images/maxmind-icon.png',
  meta: {
    // eslint-disable-next-line max-len
    description: 'Develop applications using industry-leading IP intelligence and risk scoring.',
    title: 'MaxMind Developer Portal',
  },
  plugins: [],
  sitePath: SITE_ROOT,
  twitterUsername: '@maxmind',
  url: GATSBY_URL,
};

export default {
  plugins: [
    {
      resolve: require.resolve(
        `${PROJECT_ROOT}/packages/gatsby-plugin-maxmind-schema-toc`
      ),
    },
    {
      options: {
        typeName: 'Json',
      },
      resolve: 'gatsby-transformer-json',
    },
    {
      options: {
        name: 'maxmindServerIps',
        path: `${SITE_ROOT}/static/maxmind-server-ip-addresses.json`,
      },
      resolve: 'gatsby-source-filesystem',
    },
    {
      options: themeOptions,
      resolve: 'gatsby-theme-maxmind',
    },
  ],
};
