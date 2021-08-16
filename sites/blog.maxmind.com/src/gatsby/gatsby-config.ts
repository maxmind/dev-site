import { IThemeOptions } from '@theme/gatsby/gatsby-config';

const GATSBY_URL= process.env.GATSBY_URL || 'http://localhost:5000';
const SITE_ROOT = `${__dirname}/../../`;

const themeOptions: IThemeOptions = {
  feeds: [],
  gtmTrackingId: '',
  icon: 'src/images/maxmind-icon.png',
  meta: {
    // eslint-disable-next-line max-len
    description: 'Develop applications using industry-leading IP intelligence and risk scoring.',
    title: 'MaxMind Blog',
  },
  plugins: [],
  sitePath: SITE_ROOT,
  twitterUsername: '@maxmind',
  url: GATSBY_URL,
};

export default {
  plugins: [
    {
      options: themeOptions,
      resolve: 'gatsby-theme-maxmind',
    },
  ],
};
