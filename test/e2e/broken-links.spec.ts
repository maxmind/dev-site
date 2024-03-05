// eslint-disable-next-line import/no-unresolved
import { LinkChecker, LinkResult } from 'linkinator';

const targetUrl = process.env.E2E_TARGET_URL || 'http://localhost:5000';

const falsePositives = [
  'https://crates.io/crates/maxminddb',
  'http://js.maxmind.com/js/geoip.js',
  'http://js.maxmind.com/js/country.js',
  'https://minfraud.maxmind.com/app/bin_http',
  'https://nvlpubs.nist.gov/nistpubs/FIPS/NIST.FIPS.180-4.pdf',
  'https://www.linkedin.com/company/maxmind',
  'http://www.maxmind.com',
  'https://www.maxmind.com',
  'https://sandbox.maxmind.com',
  'https://support.maxmind.com',
  'https://www.nuget.org/packages/MaxMind.GeoIP2/',
  'https://www.nuget.org/packages/MaxMind.MinFraud',
  'https://www.rubydoc.info/gems/minfraud/',

  // Pages have <link> elements with rel="canonical" that point to their path
  // on dev.maxmind.com. This causes us to try to find the page on the prod
  // site. For new pages this is a problem since the page doesn't exist there
  // yet. We could potentially get the href in these elements to point to the
  // staging site URL, but it does not look trivial. As such, ignore these
  // links as a workaround. See #187152961.
  'https://dev.maxmind.com',
];


const getBrokenLinks = async () => {

  const brokenLinks: LinkResult[] = [];

  const checker = new LinkChecker();

  checker.on('link', (result) => {
    const broken = result.state === 'BROKEN';
    const statusCode = result.status ?? 0;
    const resolvedUrl = result.url;
    const { origin } = new URL(resolvedUrl);

    if (!broken) {
      return;
    }

    if (statusCode === 403 || statusCode === 429 || statusCode >= 500) {
      return;
    }

    if (statusCode === 401 && origin === 'https://www.maxmind.com') {
      return;
    }

    brokenLinks.push(result);
  });

  await checker.check({
    linksToSkip: falsePositives,
    path: targetUrl,
    recurse: true,
    timeout: 30 * 1000,
  });

  return brokenLinks;

};

test(
  'website has no broken links',
  async () => {
    expect(await getBrokenLinks()).toHaveNoBrokenLinks();
  },
  1000 * 60 * 5
);
