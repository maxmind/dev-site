import PropTypes from 'prop-types';
import React from 'react';

import TableOfContents from './TableOfContents';

type ProductSlug = 'geoip' | 'minfraud';

export interface IReleaseNotesArchiveList {
  type: ProductSlug;
}

const years: Record<ProductSlug, number[]> = {
  geoip: [
    2023,
    2022,
    2021,
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
    2023,
    2022,
    2021,
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
