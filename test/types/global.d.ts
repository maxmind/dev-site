import type { ReactWrapper } from 'enzyme';

declare global {
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
