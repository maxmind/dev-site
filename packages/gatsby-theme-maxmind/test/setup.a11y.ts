import 'jest-pa11y/build/extendExpect';
import '../src/styles/global.scss';

import { ReactWrapper } from 'enzyme';
import fs from 'fs';
import Slugger from 'github-slugger';
import fetchMock from 'jest-fetch-mock';
import { configurePa11y } from 'jest-pa11y';
import { recorders } from 'jest-style-transformer-utils';
import { dirname } from 'path';

const ROOT_ELEMENT = 'jest-pa11y-container';

const slugger = new Slugger();

interface IIssue {
  [key: string]: string;
  selector: string;
}

fetchMock.enableMocks();

const _pa11y = configurePa11y({
  rootElement: `#${ROOT_ELEMENT}`,
});

global.pa11y = (
  component: ReactWrapper,
  options = {},
): Promise<unknown> => _pa11y(
  `
    <style>${recorders.styles.get()}</style>
    <div id="${ROOT_ELEMENT}">${component.html()}</div>
  `,
  options,
).then(async results => {
  if (results.issues) {
    const $component = await page.$(`#${ROOT_ELEMENT}`);

    if ($component) {
      const { currentTestName, testPath } = expect.getState();
      const screenshotPath = `${dirname(testPath)}/__a11y__`;
      const fileName = slugger.slug(currentTestName);

      results.issues.forEach(async (issue: IIssue, index: number) => {
        const styles = `
          ${issue.selector} {
            border: 2px solid red;
            position: relative;
          }

          ${issue.selector}:after {
            background: red;
            content: '${index + 1}';
            color: white;
            display: block;
            font-size: 12px;
            left: 0;
            padding: 2px 5px;
            position: absolute;
            top: 0;
            transform: translate(-2px, -2px);
          }
        `;

        page.addStyleTag({
          content: styles,
        });
      });

      // eslint-disable-next-line security/detect-non-literal-fs-filename
      fs.rmdirSync(screenshotPath, {
        recursive: true,
      });

      // eslint-disable-next-line security/detect-non-literal-fs-filename
      fs.mkdirSync(screenshotPath);

      await $component.screenshot({
        path: `${screenshotPath}/${fileName}.png`,
      });
    }

    results.issues.map((issue: IIssue) => ({
      ...issue,
      selector: issue.selector.replace(`#${ROOT_ELEMENT} > `, ''),
    }));
  }

  return results;
});
