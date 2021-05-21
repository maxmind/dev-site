import * as functions from 'firebase-functions';

import releaseNoteRedirects from './release-note-redirects';

const allowedHosts = [
  /^localhost:5000$/,
  /^mm-static-site-staging--pr-\d+-\w+\.web\.app$/,
  /^dev\.maxmind\.com$/,
];

const parseHost = (request: functions.Request) => {
  let host = request.headers['x-forwarded-host'];

  functions.logger.info('host-header', host);

  if (!host) {
    functions.logger.error('Host not found.', host);
    return undefined;
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
    return undefined;
  }

  return host;
};

export const feedRewrite = functions.https.onRequest((request, response) => {
  const protocol = request.protocol;
  const host = parseHost(request);

  if (!host) {
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

export const releaseNoteRedirect = functions.https.onRequest((request, response) => {
  const protocol = request.protocol;
  const host = parseHost(request);

  if (!host) {
    response.status(400).send();
    return;
  }

  const origin = `${protocol}://${host}`;
  const path = request.path;

  const redirect = releaseNoteRedirects.find(el => path.startsWith(el.source));

  if (redirect) {
    return response.redirect(`${origin}${redirect.destination}`, 302);
  }

  return response.redirect(origin, 302);
});
