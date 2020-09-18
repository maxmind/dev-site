import { GatsbyBrowser, RouteUpdateArgs } from 'gatsby';

const scrollIntoView = (props: RouteUpdateArgs) =>
  document
    .getElementById(props.location.hash.replace('#', ''))?.scrollIntoView();

export const onRouteUpdate: GatsbyBrowser['onRouteUpdate'] = (props) => {
  if (props.location.hash) {
    document.addEventListener('mm-react-code-mount', function handler(e) {
      e.currentTarget?.removeEventListener(e.type, handler);
      scrollIntoView(props);
    });

    scrollIntoView(props);
  }
};
