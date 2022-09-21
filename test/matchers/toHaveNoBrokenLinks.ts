import { matcherHint } from 'jest-matcher-utils';

const BR = '\n';

const toHaveNoBrokenLinks = (brokenLinks: any[]): any => {

  const formatedViolations = brokenLinks.map((brokenLink: any) => {
    const list =
        `Reason: ${brokenLink.brokenReason} ${BR}
        Page: ${brokenLink.base.original} ${BR}
        Broken Link Url: ${brokenLink.url.original} ${BR}
        Broken Link Text: ${brokenLink.html.text} ${BR}
        Broken Link Selector: ${brokenLink.html.selector} ${BR}`

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
  } as any;
};

expect.extend({
  toHaveNoBrokenLinks,
});
