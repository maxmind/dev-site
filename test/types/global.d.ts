import type { ReactWrapper } from 'enzyme';
import { Browser, Page } from 'puppeteer';

declare global {
  type Pa11y = (
    component: ReactWrapper,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    options?: any,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ) => Promise<any>;

  namespace NodeJS {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    interface Global {
      pa11y: Pa11y;
    }
  }

  const browser: Browser;
  const pa11y: Pa11y;
  const page: Page;

  // eslint-disable-next-line @typescript-eslint/naming-convention
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    IntersectionObserver: any;
  }
  namespace jest {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    interface Matchers<R, T> {
      toHaveNoBrokenLinks(): R;
    }
  }
}
