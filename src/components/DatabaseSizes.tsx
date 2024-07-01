import PropTypes from 'prop-types';
import * as React from 'react';

import { li as Li, p as P, table as Table, tbody as Tbody, td as Td, th as Th, thead as Thead, tr as Tr, ul as Ul } from './Mdx';

interface IDatabaseSizes {
    databasechanges: {
      csvsizerange: string;
      databasename: string;
      ipv4range: string;
      ipv6range: string;
      mmdbsizerange: string;
    }[];
    daterange: string;
}

const DatabaseSizes: React.FC<IDatabaseSizes> = (props) => {
  const { databasechanges , daterange } = props;
  const databasechangesItems = databasechanges.map((databasechange) => (
    <>
      <Tr>
        <Td>
          {databasechange.databasename}
        </Td>
        <Td>
          {databasechange.csvsizerange}
        </Td>
        <Td>
          {databasechange.mmdbsizerange}
        </Td>
        <Td>
          {databasechange.ipv4range}
        </Td>
        <Td>
          {databasechange.ipv6range}
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
        {daterange}
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
          {databasechangesItems}
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
  databasechanges: PropTypes.array.isRequired,
  daterange: PropTypes.string.isRequired,
};

export default DatabaseSizes;
