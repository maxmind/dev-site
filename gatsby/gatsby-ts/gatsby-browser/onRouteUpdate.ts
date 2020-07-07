import { GatsbyBrowser } from 'gatsby';

export const onRouteUpdate: GatsbyBrowser['onRouteUpdate'] = (props) => {
  if (props.location.hash) {
    setTimeout(() => {
      document.querySelector(props.location.hash)?.scrollIntoView();
    }, 0);
  }
};
