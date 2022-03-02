import PropTypes from 'prop-types';
import * as React from 'react';

import { a as A, p as P } from './Mdx';

interface IDatabaseName {
  product: string;
}

const DatabaseChanges: React.FC<IDatabaseName> = (props) => {
  const { product } = props;
  return (
    <>
      <P>
        We may add new data fields to the
        {' '}
        {product}
        {' '}
        database at any time.
      </P>

      <P>
        New database fields are added as new columns to the right of existing
        {' '}
        columns in our CSV files, and as additional data in our MMDB files.
      </P>

      <P>
        Subscribe to our
        {' '}
        <A
          href="/geoip/release-notes"
          rel="nofollow noopener noreferrer"
        >
          GeoIP2 release notes
        </A>
        {' '}
        to be notified when new data is added to our databases.
      </P>
    </>
  );
};

DatabaseChanges.propTypes = {
  product: PropTypes.string.isRequired,
};

export default DatabaseChanges;
