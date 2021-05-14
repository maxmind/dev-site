import * as functions from 'firebase-functions';

const allowedHosts = [
  /^localhost:5000$/,
  /^mm-static-site-staging--pr-\d+-\w+\.web\.app$/,
  /^dev\.maxmind\.com$/,
];

export const feedRewrite = functions.https.onRequest((request, response) => {
  let host = request.headers['x-forwarded-host'];
  const protocol = request.protocol;

  if (!host) {
    functions.logger.error('Host not found.', host);
    response.status(400).send();
    return;
  }

  // It is possible to have multiple forwarded hosts defined.
  // Firebase only sets one.
  if (Array.isArray(host)) {
    host = host[0];
  }

  let isValidHost = false;

  allowedHosts.map((hostRegex: RegExp) => {
    if (hostRegex.test(host as string)) {
      isValidHost = true;
    }
  });

  if (!isValidHost) {
    functions.logger.error('Host is invalid.', host);
    response.status(400).send();
    return;
  }

  const origin = `${protocol}://${host}`;
  const { post_type: postType, product } = request.query;

  if (postType === 'release_note' && product === 'geoip2') {
    return response.redirect(`${origin}/geoip/release-notes/rss.xml`);
  }

  if (postType === 'release_note' && product === 'minfraud') {
    return response.redirect(`${origin}/minfraud/release-notes/rss.xml`);
  }

  return response.redirect(origin);
});
