import { GatsbySSR, RenderBodyArgs } from 'gatsby';
import * as React from 'react';

const OLARK_SITE_ID = '8022-431-10-3383';

export const onRenderBody: GatsbySSR['onRenderBody'] = (
  args: RenderBodyArgs
): any => {
  const { setPostBodyComponents } = args;

  return setPostBodyComponents([
    <script
      dangerouslySetInnerHTML={{
        __html: `(function(o,l,a,r,k,y){if(o.olark)return;
          r="script";y=l.createElement(r);r=l.getElementsByTagName(r)[0];
          y.async=1;y.src="//"+a;r.parentNode.insertBefore(y,r);
          y=o.olark=function(){k.s.push(arguments);k.t.push(+new Date)};
          y.extend=function(i,j){y("extend",i,j)};
          y.identify=function(i){y("identify",k.i=i)};
          y.configure=function(i,j){y("configure",i,j);k.c[i]=j};
          k=y._={s:[],t:[+new Date],c:{},l:a};
          })(window,document,"static.olark.com/jsclient/loader.js");
          olark.identify("${OLARK_SITE_ID}");`,
      }}
      key="olark"
    />,
  ]);
};
