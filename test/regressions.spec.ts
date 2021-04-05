import fetch from 'node-fetch';

const urls = [
  'https://dev.maxmind.com/geoip/geoip2/release-notes/',
  'https://dev.maxmind.com/geoip/geoip2/web-services/',
  'https://dev.maxmind.com/minfraud/',
  'https://dev.maxmind.com/minfraud/release-notes/',
];

describe('regression tests', () => {
  it.each(urls)('%s regression test', async (url) => {
    const res = await fetch(url);
    expect(await res.text()).toMatchSnapshot();
  });
});
