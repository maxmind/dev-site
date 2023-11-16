import { matcherHint } from 'jest-matcher-utils';
// eslint-disable-next-line import/no-unresolved
import { LinkResult } from 'linkinator';

const BR = '\n';

const isError = (err: Error | unknown): err is Error =>
  err instanceof Error && 'message' in err && err.message !== undefined;

const toHaveNoBrokenLinks = (brokenLinks: LinkResult[]) => {
  const formatedViolations = brokenLinks.map((brokenLink) => {
    const reason = [
      undefined,
      0,
    ].includes(brokenLink.status)
      ? 'No response'
      : `HTTP status ${brokenLink.status}`;

    const failureDetails = brokenLink.failureDetails
      ?.map((err) => (isError(err) ? err.message : undefined))
      .filter((err) => err !== undefined);

    const list = `Reason: ${reason} ${BR}
        Page: ${brokenLink.parent} ${BR}
        Broken Link Url: ${brokenLink.url} ${BR}
        Failure details: ${failureDetails?.join(BR)} ${BR}`;

    return list;
  });

  const pass = brokenLinks.length === 0;

  const message = () => {
    if (pass) {
      return '';
    }

    return [
      matcherHint('.toHaveNoBrokenLinks'),
      `${BR}${formatedViolations.length} broken links:`,
      formatedViolations.join(BR),
    ].join(BR);
  };

  return {
    actual: brokenLinks,
    message,
    pass,
  };
};

expect.extend({
  toHaveNoBrokenLinks,
});
