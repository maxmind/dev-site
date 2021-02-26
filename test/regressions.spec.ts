import fetch from 'node-fetch';

describe('regression tests', () => {
  it('https://dev.maxmind.com/geoip/geoip2/release-notes/ regression test',
    async () => {
      const res =
        await fetch('https://dev.maxmind.com/geoip/geoip2/release-notes/');
      expect(await res.text()).toMatchSnapshot();
    });

  it('https://dev.maxmind.com/minfraud/ regression test', async () => {
    const res = await fetch('https://dev.maxmind.com/minfraud/');
    expect(await res.text()).toMatchSnapshot();
  });

  it('https://dev.maxmind.com/minfraud/release-notes/ regression test',
    async () => {
      const res =
        await fetch('https://dev.maxmind.com/minfraud/release-notes/');
      expect(await res.text()).toMatchSnapshot();
    });
});


