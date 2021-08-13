import PropTypes from 'prop-types';
import * as React from 'react';

import {
  a as A,
  inlineCode as Code,
  li as Li,
  strong as Strong,
  table as Table,
  td as Td,
  th as Th,
  tr as Tr,
  ul as Ul,
} from './Mdx';
import ServiceTag from './Schema/ServiceTag';

interface ICsvBlockTable {
  isEnterprise?: boolean;
}

const CsvBlockTable: React.FC<ICsvBlockTable> = (props) => {
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
          <Td>network</Td>
          <Td>IP network as a string</Td>
          <Td>
            This is the IPv4 or IPv6 network in CIDR format such as
            &quot;2.21.92.0/29&quot; or &quot;2001:4b0::/80&quot;. We offer a
            utility to convert this column to start/end IPs or start/end
            integers. See
            {' '}
            <A
              href="#conversion-utility"
            >
              the conversion utility
              section
            </A>
            {' '}
            for details.
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
          <Td>geoname_id</Td>
          <Td>integer</Td>
          <Td>
            A unique identifier for the network&apos;s location as specified
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
            used to look up the location information in the Location file.
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
          <Td>registered_country_geoname_id</Td>
          <Td>integer</Td>
          <Td>
            The registered country is the country in which the ISP has
            registered the network. This column contains a unique identifier
            for the network&apos;s registered country as specified
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
            used to look up the location information in the Location file.
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
          <Td>represented_country_geoname_id</Td>
          <Td>integer</Td>
          <Td>
            The represented country is the country which is represented by
            users of the IP address. For instance, the country represented by
            an overseas military base. This column contains a unique
            identifier for the network&apos;s registered country as specified
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
            used to look up the location information in the Location file.
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
          <Td>is_anonymous_proxy</Td>
          <Td>boolean</Td>
          <Td>
            <Strong>Deprecated.</Strong>
            {' '}
            Please see our
            {' '}
            <A
              href="https://www.maxmind.com/en/geoip2-anonymous-ip-database"
              rel="nofollow noopener noreferrer"
              target="_blank"
            >
              GeoIP2 Anonymous IP database
            </A>
            {' '}
            to determine whether the IP address is used by an anonymizing
            service.
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
          <Td>is_satellite_provider</Td>
          <Td>boolean</Td>
          <Td>
            <Strong>Deprecated.</Strong>
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
          <Td>postal_code</Td>
          <Td>string</Td>
          <Td>
            A postal code close to the user&apos;s location. For the following
            countries, we return partial postal codes with the number of
            characters indicated below:

            <Ul>
              <Li>United States: 5</Li>
              <Li>Canada: 3</Li>
              <Li>United Kingdom: 2-4</Li>
              <Li>Brazil: 5</Li>
              <Li>Ireland: 3</Li>
              <Li>
                Japan: 7 (specified for the first 6. The last digit defaults to
                1)
              </Li>
              <Li>Netherlands: 4</Li>
              <Li>
                Portugal: 7 (accurate for the first 4. The last 3 often defaults
                to
                {' '}
                <Code>-001</Code>
                )
              </Li>
              <Li>Singapore: 2</Li>
            </Ul>
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
          <Td>latitude*</Td>
          <Td>decimal</Td>
          <Td>
            The approximate
            {' '}
            <A
              href="https://en.wikipedia.org/wiki/World_Geodetic_System"
              rel="nofollow noopener noreferrer"
              target="_blank"
            >
              WGS84
            </A>
            {' '}
            latitude of the location associated with the network.
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
          <Td>longitude*</Td>
          <Td>decimal</Td>
          <Td>
            The approximate
            {' '}
            <A
              href="https://en.wikipedia.org/wiki/World_Geodetic_System"
              rel="nofollow noopener noreferrer"
              target="_blank"
            >
              WGS84
            </A>
            {' '}
            longitude of the location associated with the network.
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
          <Td>accuracy_radius</Td>
          <Td>integer</Td>
          <Td>
            The radius in kilometers around the specified location where the IP
            address is likely to be.
            {' '}
            <A
              // eslint-disable-next-line max-len
              href="https://support.maxmind.com/geoip-faq/specifications-and-implementation/how-accurate-is-geoip2/"
              rel="nofollow noopener noreferrer"
              target="_blank"
            >
              Learn more about accuracy on our Support Center.
            </A>
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
        { isEnterprise && (
          <>
            <Tr>
              <Td>isp_id</Td>
              <Td>integer</Td>
              <Td>
                A identifier for the ISP. This ID can be used to look up the
                location information in the ISP file.
              </Td>
            </Tr>
            <Tr>
              <Td>is_legitimate_proxy</Td>
              <Td>boolean</Td>
              <Td>
                A 1 if the network is a legitimate proxy. Otherwise, the value
                will not be set.
              </Td>
            </Tr>
            <Tr>
              <Td>domain</Td>
              <Td>string</Td>
              <Td>
                The domain associated with the network.
              </Td>
            </Tr>
            <Tr>
              <Td>country_confidence</Td>
              <Td>decimal (1-100)</Td>
              <Td>
                The confidence that the country was correctly geolocated.
              </Td>
            </Tr>
            <Tr>
              <Td>subdivision_confidence</Td>
              <Td>decimal (1-100)</Td>
              <Td>
                The confidence that the most specific subdivision was correctly
                geolocated.
              </Td>
            </Tr>
            <Tr>
              <Td>city_confidence</Td>
              <Td>decimal (1-100)</Td>
              <Td>
                The confidence that the city was correctly geolocated.
              </Td>
            </Tr>
            <Tr>
              <Td>postal_confidence</Td>
              <Td>decimal (1-100)</Td>
              <Td>
                The confidence that the postal code was correctly geolocated.
              </Td>
            </Tr>
          </>
        )}
      </tbody>
    </Table>
  );
};

CsvBlockTable.propTypes = {
  isEnterprise: PropTypes.bool,
};

export default CsvBlockTable;
