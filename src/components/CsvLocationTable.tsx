import PropTypes from 'prop-types';
import * as React from 'react';

import {
  a as A,
  inlineCode as Code,
  strong as Strong,
  table as Table,
  td as Td,
  th as Th,
  tr as Tr,
} from './Mdx';
import ServiceTag from './Schema/ServiceTag';

interface ICsvLocationTable {
  isEnterprise?: boolean;
}

const CsvLocationTable: React.FC<ICsvLocationTable> = (props) => {
  const { isEnterprise } = props;
  return (
    <Table>
      <tbody>
        <Tr>
          <Th>Name</Th>
          <Th>Type</Th>
          <Th>Description</Th>
          { !isEnterprise && (
            <Th>Included in...</Th>
          )}
        </Tr>
        <Tr>
          <Td>geoname_id</Td>
          <Td>integer</Td>
          <Td>
            A unique identifier for the a location as specified
            by
            {' '}
            <A
              href="https://www.geonames.org/"
              rel="nofollow noopener noreferrer"
              target="_blank"
            >
              GeoNames
            </A>
            . This ID can be
            used as a key for the Location file.
          </Td>
          { !isEnterprise && (
            <Td>
              <ServiceTag
                text="Country"
              />
              <ServiceTag
                text="City"
              />
            </Td>
          )}
        </Tr>
        <Tr>
          <Td>locale_code</Td>
          <Td>string</Td>
          <Td>
            The locale that the names in this row are in. This will always
            correspond to the locale name of the file.
          </Td>
          { !isEnterprise && (
            <Td>
              <ServiceTag
                text="Country"
              />
              <ServiceTag
                text="City"
              />
            </Td>
          )}
        </Tr>
        <Tr>
          <Td>continent_code</Td>
          <Td>string (2)</Td>
          <Td>
            <p>The continent code for this location. Possible codes are:</p>
            <ul>
              <li>
                <Strong>AF</Strong>
                {' '}
                - Africa
              </li>
              <li>
                <Strong>AN</Strong>
                {' '}
                - Antarctica
              </li>
              <li>
                <Strong>AS</Strong>
                {' '}
                - Asia
              </li>
              <li>
                <Strong>EU</Strong>
                {' '}
                - Europe
              </li>
              <li>
                <Strong>NA</Strong>
                {' '}
                - North America
              </li>
              <li>
                <Strong>OC</Strong>
                {' '}
                - Oceania
              </li>
              <li>
                <Strong>SA</Strong>
                {' '}
                - South America
              </li>
            </ul>
          </Td>
          { !isEnterprise && (
            <Td>
              <ServiceTag
                text="Country"
              />
              <ServiceTag
                text="City"
              />
            </Td>
          )}
        </Tr>
        <Tr>
          <Td>continent_name</Td>
          <Td>string</Td>
          <Td>
            The continent name for this location in the file&apos;s locale.
          </Td>
          { !isEnterprise && (
            <Td>
              <ServiceTag
                text="Country"
              />
              <ServiceTag
                text="City"
              />
            </Td>
          )}
        </Tr>
        <Tr>
          <Td>country_iso_code</Td>
          <Td>string (2)</Td>
          <Td>
            A two-character
            {' '}
            <A
              href="https://en.wikipedia.org/wiki/ISO_3166-1"
              rel="nofollow noopener noreferrer"
              target="_blank"
            >
              ISO
              3166-1
            </A>
            {' '}
            country code for the country associated with the location.
          </Td>
          { !isEnterprise && (
            <Td>
              <ServiceTag
                text="Country"
              />
              <ServiceTag
                text="City"
              />
            </Td>
          )}
        </Tr>
        <Tr>
          <Td>country_name</Td>
          <Td>string</Td>
          <Td>
            The country name for this location in the file&apos;s locale.
          </Td>
          { !isEnterprise && (
            <Td>
              <ServiceTag
                text="Country"
              />
              <ServiceTag
                text="City"
              />
            </Td>
          )}
        </Tr>
        <Tr>
          <Td>subdivision_1_iso_code</Td>
          <Td>string (1-3)</Td>
          <Td>
            A string of up to three characters containing the region-portion of
            the
            {' '}
            <A
              href="https://en.wikipedia.org/wiki/ISO_3166-2"
              rel="nofollow noopener noreferrer"
              target="_blank"
            >
              ISO 3166-2
            </A>
            {' '}
            code for the first level region associated with the IP address.
            Some countries have two levels of subdivisions, in which case this
            is the least specific. For example, in the United Kingdom this will
            be a country like &quot;England&quot;, not a county like
            &quot;Devon&quot;.
          </Td>
          { !isEnterprise && (
            <Td>
              <ServiceTag
                isDisabled
                text="Country"
              />
              <ServiceTag
                text="City"
              />
            </Td>
          )}
        </Tr>
        <Tr>
          <Td>subdivision_1_name</Td>
          <Td>string</Td>
          <Td>
            The subdivision name for this location in the file&apos;s locale.
            As with the subdivision code, this is the least specific
            subdivision for the location.
          </Td>
          { !isEnterprise && (
            <Td>
              <ServiceTag
                isDisabled
                text="Country"
              />
              <ServiceTag
                text="City"
              />
            </Td>
          )}
        </Tr>
        <Tr>
          <Td>subdivision_2_iso_code</Td>
          <Td>string (1-3)</Td>
          <Td>
            A string of up to three characters containing the region-portion of
            the
            {' '}
            <A
              href="https://en.wikipedia.org/wiki/ISO_3166-2"
              rel="nofollow noopener noreferrer"
              target="_blank"
            >
              ISO 3166-2
            </A>
            {' '}
            code for the second level region associated with the IP address.
            Some countries have two levels of subdivisions, in which case this
            is the most specific. For example, in the United Kingdom this will
            be a a county like &quot;Devon&quot;, not a country like
            &quot;England&quot;.
          </Td>
          { !isEnterprise && (
            <Td>
              <ServiceTag
                isDisabled
                text="Country"
              />
              <ServiceTag
                text="City"
              />
            </Td>
          )}
        </Tr>
        <Tr>
          <Td>subdivision_2_name</Td>
          <Td>string</Td>
          <Td>
            The subdivision name for this location in the file&apos;s locale.
            As with the subdivision code, this is the most specific subdivision
            for the location.
          </Td>
          { !isEnterprise && (
            <Td>
              <ServiceTag
                isDisabled
                text="Country"
              />
              <ServiceTag
                text="City"
              />
            </Td>
          )}
        </Tr>
        <Tr>
          <Td>city_name</Td>
          <Td>string</Td>
          <Td>
            The city name for this location in the file&apos;s locale.
          </Td>
          { !isEnterprise && (
            <Td>
              <ServiceTag
                isDisabled
                text="Country"
              />
              <ServiceTag
                text="City"
              />
            </Td>
          )}
        </Tr>
        <Tr>
          <Td>metro_code</Td>
          <Td>integer</Td>
          <Td>
            The metro code associated with the IP address. These are only
            available for networks in the US.
          </Td>
          { !isEnterprise && (
            <Td>
              <ServiceTag
                isDisabled
                text="Country"
              />
              <ServiceTag
                text="City"
              />
            </Td>
          )}
        </Tr>
        <Tr>
          <Td>time_zone</Td>
          <Td>string</Td>
          <Td>
            The time zone associated with location, as specified by
            the
            {' '}
            <A
              href="https://www.iana.org/time-zones"
              rel="nofollow noopener noreferrer"
              target="_blank"
            >
              IANA Time Zone
              Database
            </A>
            , e.g., “America/New_York”.
          </Td>
          { !isEnterprise && (
            <Td>
              <ServiceTag
                isDisabled
                text="Country"
              />
              <ServiceTag
                text="City"
              />
            </Td>
          )}
        </Tr>
        <Tr>
          <Td>is_in_european_union</Td>
          <Td>boolean</Td>
          <Td>
            This is
            {' '}
            <Code>1</Code>
            {' '}
            if the country associated with the location is a member
            state of the European Union. It is
            {' '}
            <Code>0</Code>
            {' '}
            otherwise.
          </Td>
          { !isEnterprise && (
            <Td>
              <ServiceTag
                isDisabled
                text="Country"
              />
              <ServiceTag
                text="City"
              />
            </Td>
          )}
        </Tr>
      </tbody>
    </Table>
  );
};

CsvLocationTable.propTypes = {
  isEnterprise: PropTypes.bool,
};

export default CsvLocationTable;
