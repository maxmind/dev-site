import PropTypes from 'prop-types';
import React from 'react';

import TableOfContents from './TableOfContents';

type ProductSlug = 'geoip' | 'minfraud';

export interface IReleaseNotesArchiveList {
  type: ProductSlug;
}

const years: {[index: string]: number[]} = {
  geoip: [],
  minfraud: [
    2020,
    2019,
    2018,
    2017,
    2016,
    2015,
  ],
};

const generateItems = (type: ProductSlug) =>
  // eslint-disable-next-line security/detect-object-injection
  years[type].map((year: number) => ({
    items: [],
    title: year.toString(),
    url: `/${type}/release-notes/${year}`,
  }));


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
