---
draft: false
title: GeoIP City binary database fields
---

The GeoIP City binary database contains the following fields for each network.
The top-level record for each network is a map containing the keys listed below.
Each key maps to a map or an array of maps. If a key maps to an undefined or
empty value, it is not included in the record.

{{< rawhtml >}}

<div class="table">
  <table>
    <tbody>
      <tr>
        <th>Data field name</th>
        <th>Type</th>
        <th>Data field description</th>
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
        <td>geoname_id</td>
        <td>uint32</td>
        <td>
          <p>
            A unique identifier for the city as specified by
            <a href="https://www.geonames.org/">GeoNames</a>.
          </p>
          <p>
            <a
              href="https://support.maxmind.com/knowledge-base/articles/maxmind-ip-geolocation-data#geonames-ids"
              >Learn more about GeoNames IDs on our Knowledge Base.</a
            >
          </p>
        </td>
      </tr>

      <tr>
        <td>names</td>
        <td>map</td>
        <td>
          <p>
            A map from locale codes (e.g., <code>en</code>, <code>de</code>,
            <code>ja</code>) to localized names.
          </p>
          <p>
            <a
              href="https://support.maxmind.com/knowledge-base/articles/maxmind-ip-geolocation-data#names"
              >Learn more about localized geolocation names on our Knowledge
              Base.</a
            >
          </p>
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
          <p>
            A two-character continent code like <code>NA</code> (North America)
            or <code>OC</code> (Oceania).
          </p>
          <p>
            <a
              href="https://support.maxmind.com/knowledge-base/articles/maxmind-ip-geolocation-data#codes"
              >Learn more about continent codes on our Knowledge Base.</a
            >
          </p>
        </td>
      </tr>

      <tr>
        <td>geoname_id</td>
        <td>uint32</td>
        <td>
          <p>
            A unique identifier for the continent as specified by
            <a href="https://www.geonames.org/">GeoNames</a>.
          </p>
          <p>
            <a
              href="https://support.maxmind.com/knowledge-base/articles/maxmind-ip-geolocation-data#geonames-ids"
              >Learn more about GeoNames IDs on our Knowledge Base.</a
            >
          </p>
        </td>
      </tr>

      <tr>
        <td>names</td>
        <td>map</td>
        <td>
          <p>
            A map from locale codes (e.g., <code>en</code>, <code>de</code>,
            <code>ja</code>) to localized names.
          </p>
          <p>
            <a
              href="https://support.maxmind.com/knowledge-base/articles/maxmind-ip-geolocation-data#names"
              >Learn more about localized geolocation names on our Knowledge
              Base.</a
            >
          </p>
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
        <td>geoname_id</td>
        <td>uint32</td>
        <td>
          <p>
            A unique identifier for the country as specified by
            <a href="https://www.geonames.org/">GeoNames</a>.
          </p>
          <p>
            <a
              href="https://support.maxmind.com/knowledge-base/articles/maxmind-ip-geolocation-data#geonames-ids"
              >Learn more about GeoNames IDs on our Knowledge Base.</a
            >
          </p>
        </td>
      </tr>

      <tr>
        <td>is_in_european_union</td>
        <td>boolean</td>
        <td>
          <p>
            This is <code>true</code> if the country is a member state of the
            European Union. This key is only present when the value is
            <code>true</code>.
          </p>
          <p>
            <a
              href="https://support.maxmind.com/knowledge-base/articles/maxmind-ip-geolocation-data#eu-flag"
              >Learn more about the EU flag on our Knowledge Base.</a
            >
          </p>
        </td>
      </tr>

      <tr>
        <td>iso_code</td>
        <td>string</td>
        <td>
          <p>
            The two-character
            <a href="https://en.wikipedia.org/wiki/ISO_3166-1">ISO 3166-1</a>
            alpha code for the country.
          </p>
          <p>
            <a
              href="https://support.maxmind.com/knowledge-base/articles/maxmind-ip-geolocation-data#codes"
              >Learn more about country codes on our Knowledge Base.</a
            >
          </p>
        </td>
      </tr>

      <tr>
        <td>names</td>
        <td>map</td>
        <td>
          <p>
            A map from locale codes (e.g., <code>en</code>, <code>de</code>,
            <code>ja</code>) to localized names.
          </p>
          <p>
            <a
              href="https://support.maxmind.com/knowledge-base/articles/maxmind-ip-geolocation-data#names"
              >Learn more about localized geolocation names on our Knowledge
              Base.</a
            >
          </p>
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
          <p>
            The approximate accuracy radius in kilometers around the latitude
            and longitude for the IP address. This is the radius where we have a
            67% confidence that the device using the IP address resides within
            the circle centered at the latitude and longitude with the provided
            radius.
          </p>
          <p>
            <a
              href="https://support.maxmind.com/knowledge-base/articles/maxmind-ip-geolocation-data#geolocation-area"
              >Learn about the geolocation area on our Knowledge Base.</a
            >
          </p>
        </td>
      </tr>

      <tr>
        <td>latitude</td>
        <td>double</td>
        <td>
          <p>
            The approximate latitude of the location associated with the IP
            address. This value is not precise and should not be used to
            identify a particular address or household.
          </p>
          <p>
            <a
              href="https://support.maxmind.com/knowledge-base/articles/maxmind-ip-geolocation-data#geolocation-area"
              >Learn about the geolocation area on our Knowledge Base.</a
            >
          </p>
        </td>
      </tr>

      <tr>
        <td>longitude</td>
        <td>double</td>
        <td>
          <p>
            The approximate longitude of the location associated with the IP
            address. This value is not precise and should not be used to
            identify a particular address or household.
          </p>
          <p>
            <a
              href="https://support.maxmind.com/knowledge-base/articles/maxmind-ip-geolocation-data#geolocation-area"
              >Learn about the geolocation area on our Knowledge Base.</a
            >
          </p>
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
          <p>
            The time zone associated with the location, as specified by the
            <a href="https://www.iana.org/time-zones"
              >IANA Time Zone Database</a
            >
            (e.g., <code>America/New_York</code>).
          </p>
          <p>
            <a
              href="https://support.maxmind.com/knowledge-base/articles/maxmind-ip-geolocation-data#time-zone"
              >Learn more about time zone data on our Knowledge Base.</a
            >
          </p>
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
          <p>
            The postal code of the location. Postal codes are not available for
            all countries. In some countries, this will only contain part of the
            postal code.
          </p>
          <p>
            <a
              href="https://support.maxmind.com/knowledge-base/articles/maxmind-ip-geolocation-data#codes"
              >Learn more about postal code data on our Knowledge Base.</a
            >
          </p>
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
          <p>
            A unique identifier for the registered country as specified by
            <a href="https://www.geonames.org/">GeoNames</a>.
          </p>
          <p>
            <a
              href="https://support.maxmind.com/knowledge-base/articles/maxmind-ip-geolocation-data#geonames-ids"
              >Learn more about GeoNames IDs on our Knowledge Base.</a
            >
          </p>
        </td>
      </tr>

      <tr>
        <td>is_in_european_union</td>
        <td>boolean</td>
        <td>
          <p>
            This is <code>true</code> if the registered country is a member
            state of the European Union. This key is only present when the value
            is <code>true</code>.
          </p>
          <p>
            <a
              href="https://support.maxmind.com/knowledge-base/articles/maxmind-ip-geolocation-data#eu-flag"
              >Learn more about the EU flag on our Knowledge Base.</a
            >
          </p>
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
          <p>
            A map from locale codes (e.g., <code>en</code>, <code>de</code>,
            <code>ja</code>) to localized names.
          </p>
          <p>
            <a
              href="https://support.maxmind.com/knowledge-base/articles/maxmind-ip-geolocation-data#names"
              >Learn more about localized geolocation names on our Knowledge
              Base.</a
            >
          </p>
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
          <p>
            A unique identifier for the represented country as specified by
            <a href="https://www.geonames.org/">GeoNames</a>.
          </p>
          <p>
            <a
              href="https://support.maxmind.com/knowledge-base/articles/maxmind-ip-geolocation-data#geonames-ids"
              >Learn more about GeoNames IDs on our Knowledge Base.</a
            >
          </p>
        </td>
      </tr>

      <tr>
        <td>is_in_european_union</td>
        <td>boolean</td>
        <td>
          <p>
            This is <code>true</code> if the represented country is a member
            state of the European Union. This key is only present when the value
            is <code>true</code>.
          </p>
          <p>
            <a
              href="https://support.maxmind.com/knowledge-base/articles/maxmind-ip-geolocation-data#eu-flag"
              >Learn more about the EU flag on our Knowledge Base.</a
            >
          </p>
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
          <p>
            A map from locale codes (e.g., <code>en</code>, <code>de</code>,
            <code>ja</code>) to localized names.
          </p>
          <p>
            <a
              href="https://support.maxmind.com/knowledge-base/articles/maxmind-ip-geolocation-data#names"
              >Learn more about localized geolocation names on our Knowledge
              Base.</a
            >
          </p>
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
        <td>geoname_id</td>
        <td>uint32</td>
        <td>
          <p>
            A unique identifier for the subdivision as specified by
            <a href="https://www.geonames.org/">GeoNames</a>.
          </p>
          <p>
            <a
              href="https://support.maxmind.com/knowledge-base/articles/maxmind-ip-geolocation-data#geonames-ids"
              >Learn more about GeoNames IDs on our Knowledge Base.</a
            >
          </p>
        </td>
      </tr>

      <tr>
        <td>iso_code</td>
        <td>string</td>
        <td>
          <p>
            A string up to three characters long containing the subdivision
            portion of the
            <a href="https://en.wikipedia.org/wiki/ISO_3166-2"
              >ISO 3166-2 code</a
            >.
          </p>
          <p>
            <a
              href="https://support.maxmind.com/knowledge-base/articles/maxmind-ip-geolocation-data#codes"
              >Learn more about ISO code data on our Knowledge Base.</a
            >
          </p>
        </td>
      </tr>

      <tr>
        <td>names</td>
        <td>map</td>
        <td>
          <p>
            A map from locale codes (e.g., <code>en</code>, <code>de</code>,
            <code>ja</code>) to localized names.
          </p>
          <p>
            <a
              href="https://support.maxmind.com/knowledge-base/articles/maxmind-ip-geolocation-data#names"
              >Learn more about localized geolocation names on our Knowledge
              Base.</a
            >
          </p>
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
        <td>is_anycast</td>
        <td>boolean</td>
        <td>
          <p>
            This is <code>true</code> if the IP address belongs to an
            <a href="https://en.wikipedia.org/wiki/Anycast">anycast network</a>.
            This key is only present when the value is <code>true</code>.
          </p>
          <p>
            <a
              href="https://support.maxmind.com/knowledge-base/articles/maxmind-ip-network-data#anycast"
              >Learn more about anycast data on our Knowledge Base.</a
            >
          </p>
        </td>
      </tr>
    </tbody>
  </table>
</div>
{{</ rawhtml >}}
