// eslint-disable-next-line filenames/match-exported
import * as React from 'react';

import Pre from './Mdx/Pre';

const GeoIPCrontab: React.FC = () => {
  // Saturday, Sunday, Monday
  const firstDay = (Math.floor(Math.random() * 3) + 6) % 7;
  // Wednesday, Thursday
  const secondDay = Math.floor(Math.random() * 2) + 3;

  const minute = Math.floor(Math.random() * 60);
  const hour = Math.floor(Math.random() * 24);
  const cronExpression = `${minute} ${hour} * * ${firstDay},${secondDay}`;

  return (
    <Pre>
      <code
        className="language-bash"
      >
        {`
# top of crontab
MAILTO=your@email.com

${cronExpression} /usr/local/bin/geoipupdate
# end of crontab
        `}
      </code>
    </Pre>
  );
};

export default GeoIPCrontab;
