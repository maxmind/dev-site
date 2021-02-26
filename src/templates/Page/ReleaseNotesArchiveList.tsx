import PropTypes from 'prop-types';
import React from 'react';

import TableOfContents from './TableOfContents';

type ProductSlug = 'geoip' | 'minfraud';

export interface IReleaseNotesArchiveList {
  type: ProductSlug;
}

const years: Record<ProductSlug, number[]> = {
  geoip: [
    2020,
    2019,
    2018,
    2017,
    2016,
    2015,
    2014,
    2013,
  ],
  minfraud: [
    2020,
    2019,
    2018,
    2017,
    2016,
    2015,
    2014,
    2013,
  ],
};

const generateItems = (type: ProductSlug) => {
  // eslint-disable-next-line security/detect-object-injection
  const items = years[type].map((year: number) => ({
    items: [],
    title: year.toString(),
    url: `/${type}/release-notes/${year}`,
  }));

  const now = new Date();
  let year = now.getUTCFullYear();

  /*
   * If we don't have an archive page for last year,
   * assume that "[type]/release-notes" is still displaying last year's data.
   * e.g. January doesn't have release notes.
   */
  // eslint-disable-next-line security/detect-object-injection
  if (!years[type].includes(year - 1)) {
    year = year - 1;
  }

  /*
   * Add the most current year to the archive list and set
   * "[type]/release-notes" as the url
   */
  // eslint-disable-next-line security/detect-object-injection
  if (!years[type].includes(year) && years[type].includes(year - 1)) {
    items.unshift({
      items: [],
      title: year.toString(),
      url: `/${type}/release-notes`,
    });
  }

  return items;
};


const ReleaseNotesArchiveList: React.FC<
  IReleaseNotesArchiveList & React.HTMLProps<HTMLElement>
> = (props) => {
  const { className, type } = props;

  return (
    <TableOfContents
      className={className}
      heading='Archive'
      items={generateItems(type)}
    />
  );
};

ReleaseNotesArchiveList.propTypes = {
  className: PropTypes.string,
  type: PropTypes.oneOf<ProductSlug>([
    'geoip',
    'minfraud',
  ]).isRequired,
};

export default ReleaseNotesArchiveList;
