---
draft: false
title: GeoIP Enterprise binary database fields
---

The GeoIP Enterprise binary database contains the following fields for each
network. The top-level record for each network is a map containing the keys
listed below. Each key maps to a map or an array of maps. If a key maps to an
undefined or empty value, it is not included in the record.

{{< rawhtml >}}

<div class="table">
  <table>
    <tbody>
      <tr>
        <th>Name</th>
        <th>Type</th>
        <th>Description</th>
      </tr>

      <tr>
        <td><a href="#city">city</a></td>
        <td>map</td>
        <td>
          A map containing details about the city associated with the IP
          address.
        </td>
      </tr>

      <tr>
        <td><a href="#continent">continent</a></td>
        <td>map</td>
        <td>
          A map containing details about the continent associated with the IP
          address.
        </td>
      </tr>

      <tr>
        <td><a href="#country">country</a></td>
        <td>map</td>
        <td>
          A map containing details about the country where MaxMind believes the
          IP address is located.
        </td>
      </tr>

      <tr>
        <td><a href="#location">location</a></td>
        <td>map</td>
        <td>
          A map containing details about the location associated with the IP
          address, including coordinates and time zone.
        </td>
      </tr>

      <tr>
        <td><a href="#postal">postal</a></td>
        <td>map</td>
        <td>
          A map containing details about the postal code associated with the IP
          address.
        </td>
      </tr>

      <tr>
        <td><a href="#registered_country">registered_country</a></td>
        <td>map</td>
        <td>
          A map containing details about the country where the ISP has
          registered the IP block. This may differ from the country where the IP
          is located.
        </td>
      </tr>

      <tr>
        <td><a href="#represented_country">represented_country</a></td>
        <td>map</td>
        <td>
          A map containing details about the country represented by users of the
          IP address, such as a military base or embassy.
        </td>
      </tr>

      <tr>
        <td><a href="#subdivisions">subdivisions</a></td>
        <td>array of maps</td>
        <td>
          An array of maps containing data for the subdivisions associated with
          the IP address, ordered from largest to smallest.
        </td>
      </tr>

      <tr>
        <td><a href="#traits">traits</a></td>
        <td>map</td>
        <td>A map containing general traits associated with the IP address.</td>
      </tr>
    </tbody>
  </table>
</div>
{{</ rawhtml >}}

## city

{{< rawhtml >}}

<div class="table">
  <table>
    <tbody>
      <tr>
        <th>Name</th>
        <th>Type</th>
        <th>Description</th>
      </tr>

      <tr>
        <td>confidence</td>
        <td>uint16</td>
        <td>
          A value from 0-100 indicating MaxMind's confidence that the city is
          correct.
          <br />
          <a
            href="https://support.maxmind.com/knowledge-base/articles/maxmind-ip-geolocation-data#confidence-factors"
            >Learn more about confidence factors on our Knowledge Base.</a
          >
        </td>
      </tr>

      <tr>
        <td>geoname_id</td>
        <td>uint32</td>
        <td>
          A unique identifier for the city as specified by
          <a href="https://www.geonames.org/">GeoNames</a>.
          <br />
          <a
            href="https://support.maxmind.com/knowledge-base/articles/maxmind-ip-geolocation-data#geonames-ids"
            >Learn more about GeoNames IDs on our Knowledge Base.</a
          >
        </td>
      </tr>

      <tr>
        <td>names</td>
        <td>map</td>
        <td>
          A map from locale codes (e.g., <code>en</code>, <code>de</code>,
          <code>ja</code>) to localized names.
          <br />
          <a
            href="https://support.maxmind.com/knowledge-base/articles/maxmind-ip-geolocation-data#names"
            >Learn more about localized geolocation names on our Knowledge
            Base.</a
          >
        </td>
      </tr>
    </tbody>
  </table>
</div>
{{</ rawhtml >}}

## continent

{{< rawhtml >}}

<div class="table">
  <table>
    <tbody>
      <tr>
        <th>Name</th>
        <th>Type</th>
        <th>Description</th>
      </tr>

      <tr>
        <td>code</td>
        <td>string</td>
        <td>
          A two-character continent code like <code>NA</code> (North America) or
          <code>OC</code> (Oceania).
          <br />
          <a
            href="https://support.maxmind.com/knowledge-base/articles/maxmind-ip-geolocation-data#codes"
            >Learn more about continent codes on our Knowledge Base.</a
          >
        </td>
      </tr>

      <tr>
        <td>geoname_id</td>
        <td>uint32</td>
        <td>
          A unique identifier for the continent as specified by
          <a href="https://www.geonames.org/">GeoNames</a>.
          <br />
          <a
            href="https://support.maxmind.com/knowledge-base/articles/maxmind-ip-geolocation-data#geonames-ids"
            >Learn more about GeoNames IDs on our Knowledge Base.</a
          >
        </td>
      </tr>

      <tr>
        <td>names</td>
        <td>map</td>
        <td>
          A map from locale codes (e.g., <code>en</code>, <code>de</code>,
          <code>ja</code>) to localized names.
          <br />
          <a
            href="https://support.maxmind.com/knowledge-base/articles/maxmind-ip-geolocation-data#names"
            >Learn more about localized geolocation names on our Knowledge
            Base.</a
          >
        </td>
      </tr>
    </tbody>
  </table>
</div>
{{</ rawhtml >}}

## country

{{< rawhtml >}}

<div class="table">
  <table>
    <tbody>
      <tr>
        <th>Name</th>
        <th>Type</th>
        <th>Description</th>
      </tr>

      <tr>
        <td>confidence</td>
        <td>uint16</td>
        <td>
          A value from 0-100 indicating MaxMind's confidence that the country is
          correct.
          <br />
          <a
            href="https://support.maxmind.com/knowledge-base/articles/maxmind-ip-geolocation-data#confidence-factors"
            >Learn more about confidence factors on our Knowledge Base.</a
          >
        </td>
      </tr>

      <tr>
        <td>geoname_id</td>
        <td>uint32</td>
        <td>
          A unique identifier for the country as specified by
          <a href="https://www.geonames.org/">GeoNames</a>.
          <br />
          <a
            href="https://support.maxmind.com/knowledge-base/articles/maxmind-ip-geolocation-data#geonames-ids"
            >Learn more about GeoNames IDs on our Knowledge Base.</a
          >
        </td>
      </tr>

      <tr>
        <td>is_in_european_union</td>
        <td>boolean</td>
        <td>
          This is <code>true</code> if the country is a member state of the
          European Union. This key is only present when the value is
          <code>true</code>.
          <br />
          <a
            href="https://support.maxmind.com/knowledge-base/articles/maxmind-ip-geolocation-data#eu-flag"
            >Learn more about the EU flag on our Knowledge Base.</a
          >
        </td>
      </tr>

      <tr>
        <td>iso_code</td>
        <td>string</td>
        <td>
          The two-character
          <a href="https://en.wikipedia.org/wiki/ISO_3166-1">ISO 3166-1</a>
          alpha code for the country.
          <br />
          <a
            href="https://support.maxmind.com/knowledge-base/articles/maxmind-ip-geolocation-data#codes"
            >Learn more about country codes on our Knowledge Base.</a
          >
        </td>
      </tr>

      <tr>
        <td>names</td>
        <td>map</td>
        <td>
          A map from locale codes (e.g., <code>en</code>, <code>de</code>,
          <code>ja</code>) to localized names.
          <br />
          <a
            href="https://support.maxmind.com/knowledge-base/articles/maxmind-ip-geolocation-data#names"
            >Learn more about localized geolocation names on our Knowledge
            Base.</a
          >
        </td>
      </tr>
    </tbody>
  </table>
</div>
{{</ rawhtml >}}

## location

{{< rawhtml >}}

<div class="table">
  <table>
    <tbody>
      <tr>
        <th>Name</th>
        <th>Type</th>
        <th>Description</th>
      </tr>

      <tr>
        <td>accuracy_radius</td>
        <td>uint16</td>
        <td>
          The approximate accuracy radius in kilometers around the latitude and
          longitude for the IP address. This is the radius where we have a 67%
          confidence that the device using the IP address resides within the
          circle centered at the latitude and longitude with the provided
          radius.
          <br />
          <a
            href="https://support.maxmind.com/knowledge-base/articles/maxmind-ip-geolocation-data#geolocation-area"
            >Learn about the geolocation area on our Knowledge Base.</a
          >
        </td>
      </tr>

      <tr>
        <td>latitude</td>
        <td>double</td>
        <td>
          The approximate latitude of the location associated with the IP
          address. This value is not precise and should not be used to identify
          a particular address or household.
          <br />
          <a
            href="https://support.maxmind.com/knowledge-base/articles/maxmind-ip-geolocation-data#geolocation-area"
            >Learn about the geolocation area on our Knowledge Base.</a
          >
        </td>
      </tr>

      <tr>
        <td>longitude</td>
        <td>double</td>
        <td>
          The approximate longitude of the location associated with the IP
          address. This value is not precise and should not be used to identify
          a particular address or household.
          <br />
          <a
            href="https://support.maxmind.com/knowledge-base/articles/maxmind-ip-geolocation-data#geolocation-area"
            >Learn about the geolocation area on our Knowledge Base.</a
          >
        </td>
      </tr>

      <tr>
        <td>metro_code</td>
        <td>uint16</td>
        <td>
          <strong>Deprecated.</strong> Metro codes are no longer maintained.
        </td>
      </tr>

      <tr>
        <td>time_zone</td>
        <td>string</td>
        <td>
          The time zone associated with the location, as specified by the
          <a href="https://www.iana.org/time-zones">IANA Time Zone Database</a>
          (e.g., <code>America/New_York</code>).
          <br />
          <a
            href="https://support.maxmind.com/knowledge-base/articles/maxmind-ip-geolocation-data#time-zone"
            >Learn more about time zone data on our Knowledge Base.</a
          >
        </td>
      </tr>
    </tbody>
  </table>
</div>
{{</ rawhtml >}}

## postal

{{< rawhtml >}}

<div class="table">
  <table>
    <tbody>
      <tr>
        <th>Name</th>
        <th>Type</th>
        <th>Description</th>
      </tr>

      <tr>
        <td>code</td>
        <td>string</td>
        <td>
          The postal code of the location. Postal codes are not available for
          all countries. In some countries, this will only contain part of the
          postal code.
          <br />
          <a
            href="https://support.maxmind.com/knowledge-base/articles/maxmind-ip-geolocation-data#codes"
            >Learn more about postal code data on our Knowledge Base.</a
          >
        </td>
      </tr>

      <tr>
        <td>confidence</td>
        <td>uint16</td>
        <td>
          A value from 0-100 indicating MaxMind's confidence that the postal
          code is correct.
          <br />
          <a
            href="https://support.maxmind.com/knowledge-base/articles/maxmind-ip-geolocation-data#confidence-factors"
            >Learn more about confidence factors on our Knowledge Base.</a
          >
        </td>
      </tr>
    </tbody>
  </table>
</div>
{{</ rawhtml >}}

## registered_country

{{< rawhtml >}}

<div class="table">
  <table>
    <tbody>
      <tr>
        <th>Name</th>
        <th>Type</th>
        <th>Description</th>
      </tr>

      <tr>
        <td>geoname_id</td>
        <td>uint32</td>
        <td>
          A unique identifier for the registered country as specified by
          <a href="https://www.geonames.org/">GeoNames</a>.
          <br />
          <a
            href="https://support.maxmind.com/knowledge-base/articles/maxmind-ip-geolocation-data#geonames-ids"
            >Learn more about GeoNames IDs on our Knowledge Base.</a
          >
        </td>
      </tr>

      <tr>
        <td>is_in_european_union</td>
        <td>boolean</td>
        <td>
          This is <code>true</code> if the registered country is a member state
          of the European Union. This key is only present when the value is
          <code>true</code>.
          <br />
          <a
            href="https://support.maxmind.com/knowledge-base/articles/maxmind-ip-geolocation-data#eu-flag"
            >Learn more about the EU flag on our Knowledge Base.</a
          >
        </td>
      </tr>

      <tr>
        <td>iso_code</td>
        <td>string</td>
        <td>
          The two-character
          <a href="https://en.wikipedia.org/wiki/ISO_3166-1">ISO 3166-1</a>
          alpha code for the registered country.
        </td>
      </tr>

      <tr>
        <td>names</td>
        <td>map</td>
        <td>
          A map from locale codes (e.g., <code>en</code>, <code>de</code>,
          <code>ja</code>) to localized names.
          <br />
          <a
            href="https://support.maxmind.com/knowledge-base/articles/maxmind-ip-geolocation-data#names"
            >Learn more about localized geolocation names on our Knowledge
            Base.</a
          >
        </td>
      </tr>
    </tbody>
  </table>
</div>
{{</ rawhtml >}}

## represented_country

{{< rawhtml >}}

<div class="table">
  <table>
    <tbody>
      <tr>
        <th>Name</th>
        <th>Type</th>
        <th>Description</th>
      </tr>

      <tr>
        <td>geoname_id</td>
        <td>uint32</td>
        <td>
          A unique identifier for the represented country as specified by
          <a href="https://www.geonames.org/">GeoNames</a>.
          <br />
          <a
            href="https://support.maxmind.com/knowledge-base/articles/maxmind-ip-geolocation-data#geonames-ids"
            >Learn more about GeoNames IDs on our Knowledge Base.</a
          >
        </td>
      </tr>

      <tr>
        <td>is_in_european_union</td>
        <td>boolean</td>
        <td>
          This is <code>true</code> if the represented country is a member state
          of the European Union. This key is only present when the value is
          <code>true</code>.
          <br />
          <a
            href="https://support.maxmind.com/knowledge-base/articles/maxmind-ip-geolocation-data#eu-flag"
            >Learn more about the EU flag on our Knowledge Base.</a
          >
        </td>
      </tr>

      <tr>
        <td>iso_code</td>
        <td>string</td>
        <td>
          The two-character
          <a href="https://en.wikipedia.org/wiki/ISO_3166-1">ISO 3166-1</a>
          alpha code for the represented country.
        </td>
      </tr>

      <tr>
        <td>names</td>
        <td>map</td>
        <td>
          A map from locale codes (e.g., <code>en</code>, <code>de</code>,
          <code>ja</code>) to localized names.
          <br />
          <a
            href="https://support.maxmind.com/knowledge-base/articles/maxmind-ip-geolocation-data#names"
            >Learn more about localized geolocation names on our Knowledge
            Base.</a
          >
        </td>
      </tr>

      <tr>
        <td>type</td>
        <td>string</td>
        <td>
          A string indicating the type of entity that is representing the
          country. Currently this is only <code>military</code> but may expand
          to include other types in the future.
        </td>
      </tr>
    </tbody>
  </table>
</div>
{{</ rawhtml >}}

## subdivisions

{{< rawhtml >}}

<div class="table">
  <table>
    <tbody>
      <tr>
        <th>Name</th>
        <th>Type</th>
        <th>Description</th>
      </tr>

      <tr>
        <td>confidence</td>
        <td>uint16</td>
        <td>
          A value from 0-100 indicating MaxMind's confidence that the
          subdivision is correct.
          <br />
          <a
            href="https://support.maxmind.com/knowledge-base/articles/maxmind-ip-geolocation-data#confidence-factors"
            >Learn more about confidence factors on our Knowledge Base.</a
          >
        </td>
      </tr>

      <tr>
        <td>geoname_id</td>
        <td>uint32</td>
        <td>
          A unique identifier for the subdivision as specified by
          <a href="https://www.geonames.org/">GeoNames</a>.
          <br />
          <a
            href="https://support.maxmind.com/knowledge-base/articles/maxmind-ip-geolocation-data#geonames-ids"
            >Learn more about GeoNames IDs on our Knowledge Base.</a
          >
        </td>
      </tr>

      <tr>
        <td>iso_code</td>
        <td>string</td>
        <td>
          A string up to three characters long containing the subdivision
          portion of the
          <a href="https://en.wikipedia.org/wiki/ISO_3166-2">ISO 3166-2 code</a
          >.
          <br />
          <a
            href="https://support.maxmind.com/knowledge-base/articles/maxmind-ip-geolocation-data#codes"
            >Learn more about ISO code data on our Knowledge Base.</a
          >
        </td>
      </tr>

      <tr>
        <td>names</td>
        <td>map</td>
        <td>
          A map from locale codes (e.g., <code>en</code>, <code>de</code>,
          <code>ja</code>) to localized names.
          <br />
          <a
            href="https://support.maxmind.com/knowledge-base/articles/maxmind-ip-geolocation-data#names"
            >Learn more about localized geolocation names on our Knowledge
            Base.</a
          >
        </td>
      </tr>
    </tbody>
  </table>
</div>
{{</ rawhtml >}}

## traits

{{< rawhtml >}}

<div class="table">
  <table>
    <tbody>
      <tr>
        <th>Name</th>
        <th>Type</th>
        <th>Description</th>
      </tr>

      <tr>
        <td>autonomous_system_number</td>
        <td>uint32</td>
        <td>
          The
          <a href="https://en.wikipedia.org/wiki/Autonomous_system_(Internet)"
            >autonomous system</a
          >
          number associated with the IP address.
          <br />
          <a
            href="https://support.maxmind.com/knowledge-base/articles/maxmind-ip-network-data#autonomous-system-data"
            >Learn more about autonomous system data on our Knowledge Base.</a
          >
        </td>
      </tr>

      <tr>
        <td>autonomous_system_organization</td>
        <td>string</td>
        <td>
          The organization associated with the registered autonomous system
          number for the IP address.
          <br />
          <a
            href="https://support.maxmind.com/knowledge-base/articles/maxmind-ip-network-data#autonomous-system-data"
            >Learn more about autonomous system data on our Knowledge Base.</a
          >
        </td>
      </tr>

      <tr>
        <td>connection_type</td>
        <td>string</td>
        <td>
          One of the following values: <code>Cable/DSL</code>,
          <code>Cellular</code>, <code>Corporate</code>, or
          <code>Satellite</code>. Additional values may be added in the future.
          <br />
          <a
            href="https://support.maxmind.com/knowledge-base/articles/maxmind-ip-network-data#connection-type-data"
            >Learn more about connection type data on our Knowledge Base.</a
          >
        </td>
      </tr>

      <tr>
        <td>domain</td>
        <td>string</td>
        <td>
          The second-level domain associated with the IP address. This will be
          something like "example.com" or "example.co.uk", not
          "foo.example.com".
          <br />
          <a
            href="https://support.maxmind.com/knowledge-base/articles/maxmind-ip-network-data#domain-name-data"
            >Learn more about domain name data on our Knowledge Base.</a
          >
        </td>
      </tr>

      <tr>
        <td>is_anycast</td>
        <td>boolean</td>
        <td>
          This is <code>true</code> if the IP address belongs to an
          <a href="https://en.wikipedia.org/wiki/Anycast">anycast network</a>.
          This key is only present when the value is <code>true</code>.
          <br />
          <a
            href="https://support.maxmind.com/knowledge-base/articles/maxmind-ip-network-data#anycast"
            >Learn more about anycast data on our Knowledge Base.</a
          >
        </td>
      </tr>

      <tr>
        <td>isp</td>
        <td>string</td>
        <td>
          The name of the ISP associated with the IP address.
          <br />
          <a
            href="https://support.maxmind.com/knowledge-base/articles/maxmind-ip-network-data#isp-org-data"
            >Learn more about ISP data on our Knowledge Base.</a
          >
        </td>
      </tr>

      <tr>
        <td>mobile_country_code</td>
        <td>string</td>
        <td>
          The
          <a href="https://en.wikipedia.org/wiki/Mobile_country_code"
            >mobile country code (MCC)</a
          >
          associated with the IP address and ISP.
          <br />
          <a
            href="https://support.maxmind.com/knowledge-base/articles/maxmind-ip-network-data#mobile-codes"
            >Learn more about mobile country codes on our Knowledge Base.</a
          >
        </td>
      </tr>

      <tr>
        <td>mobile_network_code</td>
        <td>string</td>
        <td>
          The
          <a href="https://en.wikipedia.org/wiki/Mobile_country_code"
            >mobile network code (MNC)</a
          >
          associated with the IP address and ISP.
          <br />
          <a
            href="https://support.maxmind.com/knowledge-base/articles/maxmind-ip-network-data#mobile-codes"
            >Learn more about mobile network codes on our Knowledge Base.</a
          >
        </td>
      </tr>

      <tr>
        <td>organization</td>
        <td>string</td>
        <td>
          The name of the organization associated with the IP address.
          <br />
          <a
            href="https://support.maxmind.com/knowledge-base/articles/maxmind-ip-network-data#isp-org-data"
            >Learn more about organization data on our Knowledge Base.</a
          >
        </td>
      </tr>

      <tr>
        <td>user_type</td>
        <td>string</td>
        <td>
          The user type associated with the IP address. This can be one of the
          following values: <code>business</code>, <code>cafe</code>,
          <code>cellular</code>, <code>college</code>,
          <code>consumer_privacy_network</code>,
          <code>content_delivery_network</code>, <code>government</code>,
          <code>hosting</code>, <code>library</code>, <code>military</code>,
          <code>residential</code>, <code>router</code>, <code>school</code>,
          <code>search_engine_spider</code>, or <code>traveler</code>.
          <br />
          <a
            href="https://support.maxmind.com/knowledge-base/articles/maxmind-user-context-data#user-types"
            >Learn more about user type data on our Knowledge Base.</a
          >
        </td>
      </tr>
    </tbody>
  </table>
</div>
{{</ rawhtml >}}
