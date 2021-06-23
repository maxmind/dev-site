
import chalk from 'chalk';
import { matcherHint } from 'jest-matcher-utils';
import Table, { Header } from 'tty-table';

const BR = '\n';

const toHaveNoBrokenLinks = (brokenLinks: any[]): any => {
  const header: Header[] = [
    {
      align: 'left',
      // Required property for some reason...
      formatter: (value) => value,
      value: '',
      width: 'auto',
    },
    {
      align: 'left',
      // Required property for some reason...
      formatter: (value) => value,
      value: '',
      width: 75,
    },
  ];

  const formatedViolations = brokenLinks.map((brokenLink: any) => {
    const table = Table(header, [
      [
        'Reason',
        brokenLink.brokenReason,
      ],
      [
        'Page',
        brokenLink.base.original,
      ],
      [
        'Broken Link Url',
        brokenLink.url.original,
      ],
      [
        'Broken Link Text',
        brokenLink.html.text,
      ],
      [
        'Broken Link Selector',
        brokenLink.html.selector,
      ],
    ]);

    return chalk.gray(table.render());
  });

  const pass = brokenLinks.length === 0;

  const message = () => {
    if (pass) {
      return '';
    }

    return [
      matcherHint('.toHaveNoBrokenLinks'),
      chalk.gray(`${BR}${formatedViolations.length} broken links:`),
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
