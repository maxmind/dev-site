import PropTypes from 'prop-types';
import * as React from 'react';

import { li as Li, p as P, table as Table, tbody as Tbody, td as Td, th as Th, thead as Thead, tr as Tr, ul as Ul } from './Mdx';

interface IDatabaseSizes {
    databaseChanges: {
      csvSizeRange: string;
      databaseName: string;
      ipv4Range: string;
      ipv6Range: string;
      mmdbSizeRange: string;
    }[];
    dateRange: string;
}

const DatabaseSizes: React.FC<IDatabaseSizes> = (props) => {
  const { databaseChanges , dateRange } = props;
  const databaseChangesItems = databaseChanges.map((databaseChange) => (
    <>
      <Tr>
        <Td>
          {databaseChange.databaseName}
        </Td>
        <Td>
          {databaseChange.csvSizeRange}
        </Td>
        <Td>
          {databaseChange.mmdbSizeRange}
        </Td>
        <Td>
          {databaseChange.ipv4Range}
        </Td>
        <Td>
          {databaseChange.ipv6Range}
        </Td>
      </Tr>
    </>
  ));
  return (
    <>
      <P>
        MaxMind databases can vary in size from release to release. If you are
        working with file size limitations that are concerning, you should build
        your integrations to fail gracefully in event of a significant size
        change.
      </P>

      <P>
        From
        {' '}
        {dateRange}
        , the database files varied in file size and number of networks as
        follows:
      </P>

      <Table>
        <Thead>
          <Tr>
            <Th>
              Database
            </Th>
            <Th>
              CSV File Size
            </Th>
            <Th>
              MMDB File Size
            </Th>
            <Th>
              IPv4 Networks
            </Th>
            <Th>
              IPv6 Networks
            </Th>
          </Tr>
        </Thead>
        <Tbody>
          {databaseChangesItems}
        </Tbody>
      </Table>

      <P>
        The listed file sizes are for unpacked databases. Databases are
        downloaded in a compressed format.
      </P>
    </>
  );
};

DatabaseSizes.propTypes = {
  databaseChanges: PropTypes.array.isRequired,
  dateRange: PropTypes.string.isRequired,
};

export default DatabaseSizes;
