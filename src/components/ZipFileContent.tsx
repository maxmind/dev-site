import PropTypes from 'prop-types';
import * as React from 'react';

import {
  inlineCode as Code,
  p as P,
  table as Table,
  td as Td,
  th as Th,
  tr as Tr,
} from './Mdx';

interface IZipFileContent {
  isTableExcluded?: boolean;
  productName: string;
}

const ZipFileContent: React.FC<IZipFileContent> = (props) => {
  const { isTableExcluded, productName } = props;
  return (
    <>
      <P>
        The zip file itself is named &nbsp;
        <Code>
          {productName}
          -CSV_
          {'{YYYYMMDD}'}
          .zip
        </Code>
        . The downloaded zip file contains a single directory which in turn
        contains several files. That directory is named &nbsp;
        <Code>
          {productName}
          -CSV_
          {'{YYYYMMDD}'}
        </Code>
        .
      </P>
      { !isTableExcluded && (
        <>
          <P>
            The files in this zip archive are:
          </P>
          <Table>
            <tbody>
              <Tr>
                <Th>Filename</Th>
                <Th>Description</Th>
              </Tr>

              <Tr>
                <Td><Code>LICENSE.txt</Code></Td>
                <Td>End user license</Td>
              </Tr>

              <Tr>
                <Td><Code>COPYRIGHT.txt</Code></Td>
                <Td>Copyright statement</Td>
              </Tr>

              <Tr>
                <Td>
                  <Code>
                    {productName}
                    -Blocks-IPv4.csv
                  </Code>
                </Td>
                <Td>CSV file containing data on IPv4 addresses</Td>
              </Tr>

              <Tr>
                <Td>
                  <Code>
                    {productName}
                    -Blocks-IPv6.csv
                  </Code>
                </Td>
                <Td>CSV file containing data on IPv6 addresses</Td>
              </Tr>
            </tbody>
          </Table>
        </>
      )}
    </>
  );
};

ZipFileContent.propTypes = {
  isTableExcluded: PropTypes.bool,
  productName: PropTypes.string.isRequired,
};

export default ZipFileContent;
