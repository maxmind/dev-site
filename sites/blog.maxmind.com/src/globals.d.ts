declare module '*.scss' {
  const content: {[className: string]: string};
  export = content;
}

declare module '*.svg' {
  import * as React from 'react';
  export const ReactComponent: React.FC<React.SVGProps<SVGSVGElement>>;
  export default ReactComponent;
}

declare module '*.mdx';

declare type ProductFamily = 'geoip' | 'minfraud';
