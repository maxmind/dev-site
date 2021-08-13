import blc from 'broken-link-checker';

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
  'https://www.nuget.org/packages/MaxMind.GeoIP2/',
  'https://www.nuget.org/packages/MaxMind.MinFraud',
];

// eslint-disable-next-line compat/compat
const getBrokenLinks = (): Promise<any> => new Promise((resolve, reject) => {
  try {
    const brokenLinks: string[] = [];

    const checker = new blc.SiteChecker({
      excludedKeywords: [
        ...falsePositives,
      ],
      honorRobotExclusions: false,
    }, {
      end: () => {
        resolve(brokenLinks);
      },
      link: (result) => {
        const { broken, http, url } = result;
        const { statusCode } = http.response;
        const { resolved: resolvedUrl } = url;

        // eslint-disable-next-line compat/compat
        const { origin } = new URL(resolvedUrl);

        if (!broken) {
          return;
        }

        if (
          statusCode === 401
          && origin === 'https://www.maxmind.com'
        ) {
          return;
        }

        brokenLinks.push(result);
      },
    });

    checker.enqueue(targetUrl, []);
  } catch(err) {
    reject(err);
  }
});

test('website has no broken links', async () => {
  expect(await getBrokenLinks()).toHaveNoBrokenLinks();
}, 1000 * 60 * 5);
